'use strict'

import * as esbuild from 'esbuild'
import { program } from './program.js'
import { convert } from 'domql-to-mitosis'
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
  'transformTransition'
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

function convertDomqlModule (domqlModule, desiredFormat, options) {
  let convertedStr = ''
  const whitelist = (options.only ? options.only.split(',') : null)

  console.group()
  const uniqueImports = []
  let first = true
  let removeUseContextImport = false
  const exportCount = Object.keys(domqlModule).length
  for (const key in domqlModule) {
    // Skip if not found in whitelist
    if (whitelist && !whitelist.includes(key))
      continue

    // Skip some components if converting smbls uikit
    if (options.internalUikit &&
        EXCLUDED_FROM_INTERNAL_UIKIT.includes(key)) {
      console.log(`Skipping ${key} component due to exclusion`)
      continue
    }

    console.log(key)
    try {
    // import('domql-to-mitosis').then(({ convert }) => {
      if (convert) {
        console.group()
        const component = domqlModule[key]
        component.__name = key

        const out = convert(component, desiredFormat, {
          verbose: false,
          exportDefault: exportCount === 1,
          returnMitosisIR: true,
          importsToRemove: uniqueImports,
          removeReactImport: !first,
          removeUseContextImport
        })

        convertedStr = convertedStr + out.str + '\n'
        uniqueImports.push(...out.mitosisIR.imports)
        first = false
        if (out.mitosisIR._useContext) { removeUseContextImport = true }
        console.groupEnd()
      } else {
        throw new Error('Convert from `domql-to-mitosis` is not defined. Try to install `domql-to-mitosis` and run this command again.')
      }
    // })
    } catch (err) {
      throw new Error('`domql-to-mitosis` is not found.')
    }
  }
  console.groupEnd()

  return convertedStr
}

program
  .command('convert')
  .description('Recursively convert and copy all DomQL components under a directory')
  .argument('[src]', 'Source directory/file. By default, it is "src/"')
  .argument('[dest]', 'Destination directory/file. Will be overwritten. By default, it becomes the name of the desired format')
  .option('--react', 'Convert all DomQL components to React')
  .option('--angular', 'Convert all DomQL components to Angular')
  .option('--vue2', 'Convert all DomQL components to Vue2')
  .option('--vue3', 'Convert all DomQL components to Vue3')
  .option('--internal-uikit', '(For internal use only). Excludes particular components from the conversion')
  .option('--tmp-dir', `Use this directory for storing intermediate & build files instead of the default (dest/${TMP_DIR_NAME})`)
  .option('--only', `Only convert these components, comma separated for multiple (for example: --only=Flex,Img)`)
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
    const pj = await fs.promises.open(path.resolve(tmpDirPath, 'package.json'), 'w')
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

      const bundledFilePath = path.join(tmpDirPath, path.basename(srcPath))
      console.log(`ESbuild ${srcPath} -> ${bundledFilePath}`)

      // Bundle the component
      await esbuild.build({
        entryPoints: [srcPath],
        bundle: true,
        sourcemap: true,
        target: 'node12',
        format: 'cjs',
        outfile: bundledFilePath
      })

      // Import the module
      const domqlModule = await importDomqlModule(bundledFilePath, options)

      // Convert & append each exported domql object
      console.log(`Converting modules in ${bundledFilePath}:`)
      const convertedModuleStr = convertDomqlModule(
        domqlModule,
        desiredFormat,
        options
      )

      // Write file
      if (convertedModuleStr.length > 0) {
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
      console.error(`The destination ('${path.resolve(dest)}') must be a directory when the source ('${srcPath}') is a directory`)
      return 1
    }

    const origFiles = (await fs.promises.readdir(srcPath))
      .filter(file => !IGNORED_FILES.includes(file))

    // Bundle components
    await esbuild.build({
      entryPoints: origFiles.map(file => path.join(srcPath, file, './index.js')),
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
          options
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
