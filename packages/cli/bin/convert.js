'use strict'

import * as esbuild from 'esbuild'
import { program } from './program.js'
import { convert } from 'kalduna'
import { parse } from 'globusa'
import fs from 'fs'
import path from 'path'
import { JSDOM } from 'jsdom'

const l = (n) => console.log(`mark${n}`) // eslint-disable-line no-unused-vars

const jsdom = new JSDOM('<html><head></head><body></body></html>')
global.window = jsdom.window
global.document = window.document

const IGNORED_FILES = ['index.js', 'package.json', 'node_modules', 'dist']
const EXCLUDED_FROM_INTERNAL_UIKIT = [
  'Svg',
  'keySetters',
  'getSystemTheme',
  'splitTransition',
  'transformDuration',
  'transformShadow',
  'transformTransition',
  'DatePickerDay',
  'DatePickerGrid',
]
const TMP_DIR_NAME = '.smbls_convert_tmp'
const TMP_DIR_PACKAGE_JSON_STR = JSON.stringify({
  name: 'smbls_convert_tmp',
  version: '1.0.0',
  // "main": "index.js",
  license: 'ISC'
})

function isDirectory (dir) { // eslint-disable-line no-unused-vars
  if (!fs.existsSync(dir)) return false

  const stat = fs.statSync(dir)
  if (!stat) return false

  return stat.isDirectory()
}

// Essentially does 'mkdir -P'
async function mkdirp (dir) {
  try {
    return await fs.promises.mkdir(dir)
  } catch (err) {
    if (err.code !== 'EEXIST') {
      throw err
    }
  }
  return null
}

async function importDomqlModule (modulePath) {
  console.log(`importing ${modulePath}`)
  return (await import(modulePath)).default
}

// options is a list of the CLI arguments along with the following fields;
// {
//   imports: [],
//   declarations: [],
// }
function convertDomqlModule (domqlModule, desiredFormat, options) {
  let convertedStr = ''
  const whitelist = (options.only ? options.only.split(',') : null)

  console.group()
  const uniqueImports = []
  const first = true
  let currentExportIdx = 0
  const exportCount = Object.keys(domqlModule).length
  for (const key in domqlModule) {
    // Skip if not found in whitelist
    if (whitelist && !whitelist.includes(key)) { continue }

    // Skip some components if converting smbls uikit
    if (options.internalUikit &&
        EXCLUDED_FROM_INTERNAL_UIKIT.includes(key)) {
      console.log(`Skipping ${key} component due to exclusion`)
      continue
    }

    if (convert) {
      console.group()
      const component = domqlModule[key]
      if (!component.__name) component.__name = key
      console.log(key) // NOTE: @nikoloza don't remove this (again)

      const isSingleComponent = exportCount === 1
      const isFirst = currentExportIdx === 0
      const isLast = currentExportIdx === exportCount - 1

      const out = convert(component, desiredFormat, {
        verbose: false,
        exportDefault: isSingleComponent,
        returnMitosisIR: true,
        importsToRemove: uniqueImports,
        removeReactImport: !isFirst,
        importsToInclude: options.importsToInclude ?? null,
        declarationsToInclude: options.declarationsToInclude ?? null,
      })

      convertedStr = convertedStr + out.str
      if (options.trailingNewLine && !isLast) {
        convertedStr += '\n'
      }

      uniqueImports.push(...out.mitosisIR.imports)
      console.groupEnd()
      currentExportIdx++
    } else {
      throw new Error(
        'Convert from `domql-to-mitosis` is not defined. Try to install' +
        '`domql-to-mitosis` and run this command again.')
    }
  }
  console.groupEnd()

  return convertedStr
}

// Takes globusaStruct (direct output from globusa) and calls Kalduna as many
// times as needed to return a single string of code for the 'desiredFormat' framework
function convertDomqlComponents(globusaStruct, desiredFormat, options) {
  if (!convert) {
    throw new Error(
      'Convert from `kalduna` is not defined. Try to install' +
        '`kalduna` and run this command again.')
  }

  const { imports: globusaImports,
          declarations: globusaDecls,
          domqlComponents } = globusaStruct
  let convertedStr = ''
  const whitelist = (options.only ? options.only.split(',') : null)

  console.group()
  const uniqueImports = []
  const first = true
  for (let idx = 0; idx < domqlComponents.length; idx++) {
    const compo = domqlComponents[idx]

    // Skip if not found in whitelist
    if (whitelist && !whitelist.includes(compo.name)) { continue }

    // Skip some components if converting smbls uikit
    if (options.internalUikit &&
        EXCLUDED_FROM_INTERNAL_UIKIT.includes(compo.name)) {
      console.log(`Skipping ${compo.name} component due to exclusion`)
      continue
    }

    console.group()

    // Get domql object from code string
    const dobj = eval(`(${compo.code})`)

    // Set component name (if not present)
    if (compo.name && !dobj.__name) {
      dobj.__name = compo.name
    }

    console.log(dobj.__name) // NOTE: @nikoloza don't remove this

    const isSingleComponent = domqlComponents.length === 1
    const isFirst = idx === 0
    const isLast = idx === domqlComponents.length - 1

    const out = convert(dobj, desiredFormat, {
      verbose: false,
      exportDefault: isSingleComponent,
      returnMitosisIR: true,
      importsToRemove: uniqueImports, 
      removeReactImport: !isFirst,
      importsToInclude: globusaImports,
      declarationsToInclude: globusaDecls,
    })

    convertedStr = convertedStr + out.str
    if (options.trailingNewLine && !isLast) {
      convertedStr += '\n'
    }

    uniqueImports.push(...out.mitosisIR.imports)
    console.groupEnd()
  }
  console.groupEnd()

  return convertedStr
}

program
  .command('convert')
  .description('Convert and copy all DomQL components under a directory')
  .argument('[src]', 'Source directory/file. By default, it is "src/"')
  .argument('[dest]',
            'Destination directory/file. Will be overwritten. By ' +
            'default, it becomes the name of the desired format')
  .option('--react', 'Convert all DomQL components to React')
  .option('--angular', 'Convert all DomQL components to Angular')
  .option('--vue2', 'Convert all DomQL components to Vue2')
  .option('--vue3', 'Convert all DomQL components to Vue3')
  .option('-t, --tmp-dir <path>',
          'Use this directory for storing intermediate & build files instead of ' +
          `the default (dest/${TMP_DIR_NAME})`)
  .option('-o, --only <components>',
          'Only convert these components; comma separated ' + 
          '(for example: --only=Flex,Img)')
  .option('--internal-uikit',
          '(For internal use only). ' + 
          'Excludes particular components from the conversion')
  .action(async (src, dest, options) => {
    // Desired format
    let desiredFormat = 'react'
    if (options.angular) {
      desiredFormat = 'angular'
    } else if (options.vue2) {
      desiredFormat = 'vue2'
    } else if (options.vue3) {
      desiredFormat = 'vue3'
    }

    // Resolve source file/dir
    const srcPath = path.resolve(src || './src')
    if (!fs.existsSync(srcPath)) {
      console.erorr(`Source directory/file ('${srcPath}') does not exist`)
      return 1
    }
    const srcIsDir = fs.statSync(srcPath).isDirectory()

    // Resolve & create tmp dir
    const tmpDirPath = options.tmpDir ??
          path.resolve(path.dirname(srcPath), TMP_DIR_NAME)
    await mkdirp(tmpDirPath)

    // Put a package.json file so that when we import() the modules from the
    // directory, node doesn't recognize them as ES modules (in case the parent
    // directory of the tmp dir has "type": "module" in its package.json
    const pj = await fs.promises.open(
      path.resolve(tmpDirPath, 'package.json'), 'w')
    await pj.writeFile(TMP_DIR_PACKAGE_JSON_STR, 'utf8')
    await pj.close()

    // Convert single file. Output will also be a single file.
    if (!srcIsDir) {
      // Determine destFilePath and create it if needed
      let destFilePath
      if (dest) {
        // dest is given.
        if (!fs.existsSync(dest)) {
          // dest doesn't exist. That's the output file we'll create.
          destFilePath = path.resolve(dest)
        } else if (fs.statSync(dest).isDirectory()) {
          // dest exists and is a directory. Create our output file inside it.
          destFilePath = path.join(path.resolve(dest), path.basename(srcPath))
        } else {
          // dest exists and is not a directory. Overwrite the file.
          destFilePath = path.resolve(dest)
        }
      } else {
        // dest not given. Use default (desiredFormat as directory).
        const destDir = path.resolve(desiredFormat)
        await mkdirp(destDir)
        destFilePath = path.join(destDir, path.basename(srcPath))
      }

      console.log(`Not using ESbuild`)

      // Parse with globusa
      console.log(`Parsing components in ${srcPath}`)
      const fileContent = await fs.promises.readFile(srcPath, 'utf8')
      const globusaStruct = parse(fileContent)

      console.log(`Converting components in ${srcPath}:`)
      const convertedModuleStr = convertDomqlComponents(
        globusaStruct, desiredFormat, options)

      // Write file
      if (convertedModuleStr && convertedModuleStr.length > 0) {
        const fh = await fs.promises.open(destFilePath, 'w')
        await fh.writeFile(convertedModuleStr, 'utf8')
        await fh.close()
      }

      return 0
    }

    // We're converting multiple files (in a directory)
    // Determine destDirPath & create it if needed
    if (!dest) dest = path.resolve(desiredFormat)
    let destDirPath
    if (!fs.existsSync(dest)) {
      // dest doesn't exist. Create it.
      destDirPath = path.resolve(dest)
      await mkdirp(destDirPath)
    } else if (fs.statSync(dest).isDirectory()) {
      // dest exists and is a directory.
      destDirPath = path.resolve(dest)
    } else {
      // dest exists and is not a directory.
      console.error(
        `The destination ('${path.resolve(dest)}') must be a directory when` +
          `the source ('${srcPath}') is a directory`)
      return 1
    }

    const origFiles = (await fs.promises.readdir(srcPath))
      .filter(file => !IGNORED_FILES.includes(file))

    // Bundle components
    await esbuild.build({
      entryPoints: origFiles.map(file =>
        path.join(srcPath, file,'./index.js')),
      bundle: true,
      sourcemap: true,
      target: 'node12',
      format: 'cjs',
      outdir: tmpDirPath
    })

    // Convert components
    const componentDirs = await fs.promises.readdir(tmpDirPath)
    for (const componentDir of componentDirs) {
      const importDir = path.join(tmpDirPath, componentDir)
      if ((await fs.promises.stat(importDir)).isDirectory()) {
        // Import the module
        const importPath = `${importDir}/index.js`
        const domqlModule = await importDomqlModule(importPath)

        // Create directory for component in dest dir
        const destComponentDirPath = `${destDirPath}/${componentDir}`
        await mkdirp(destComponentDirPath)

        // Convert & append each exported domql object
        const convertedStr = convertDomqlModule(
          domqlModule,
          desiredFormat,
          { ...options, trailingNewLine: true }
        )

        // Write file
        if (convertedStr.length > 0) {
          const fh = await fs.promises
            .open(`${destComponentDirPath}/index.js`, 'w')
          await fh.writeFile(convertedStr, 'utf8')
          await fh.close()
        }
      }
    }
  })
