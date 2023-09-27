'use strict'

import fs from 'fs'
import chalk from 'chalk'
import path from 'path'
import { convert, generateImports, dedupMitosisImports } from 'kalduna'
import { parse } from 'globusa'
import * as esbuild from 'esbuild'

// Set up jsdom
import { JSDOM } from 'jsdom'
const jsdom = new JSDOM('<html><head></head><body></body></html>')
global.window = jsdom.window
global.document = window.document

export const TMP_DIR_NAME = '.smbls_convert_tmp'
const TMP_DIR_PACKAGE_JSON_STR = JSON.stringify({
  name: 'smbls_convert_tmp',
  version: '1.0.0',
  // "main": "index.js",
  license: 'ISC'
})

export const INTERNAL_UIKIT_CONF = {
  excludedComponents: [
    // We have our own implementations of these components
    'Svg',
    'Box',
    'Icon',
    'IconText',
    'Tooltip',

    // These are not domql objects
    'keySetters',
    'getSystemTheme',
    'splitTransition',
    'transformDuration',
    'transformShadow',
    'transformTransition',

    // FIXME: Temporary list of components we want to skip
    'DatePicker',
    'DatePickerDay',
    'DatePickerTwoColumns',
    'DatePickerGrid',
    'DatePickerGridContainer',

    // Not a domql object (headless-datepicker)
    'calendar'
  ],

  // Can be strings or regex patterns
  excludedDirectories: [
    // TODO: Review these ignores with @nikoloza
    /Threejs$/,
    /Editorjs$/,
    /User$/
  ]
}

function generatePackageJsonFile (
  sourcePackageJsonPath,
  destPath,
  globusaStruct,
  desiredFormat,
  options
) {
  // Extract package name from source package.json
  const str = fs.readFileSync(sourcePackageJsonPath, { encoding: 'utf8' })
  let packageStruct
  try {
    packageStruct = JSON.parse(str)
  } catch (error) {
    console.error(`Error when parsing ${sourcePackageJsonPath}`)
    return
  }
  const split = packageStruct.name.split('/')
  const packageName = split[split.length - 1]

  // Generate list of dependencies
  const deps = {
    'css-in-props': 'latest',
    [`@emotion/${desiredFormat}`]: '^11.11.0',
    '@emotion/css': '^11.11.0',
    '@symbo.ls/create': 'latest',
    '@symbo.ls/react': 'latest'
  }
  globusaStruct.imports
    .filter(imp => imp.path.match(/^@symbo\.ls\//))
    .filter(imp => imp.path !== packageName)
    .forEach(imp => { deps[imp.path] = 'latest' })

  // Generate final package.json string
  const genStr = JSON.stringify({
    name: `@symbo.ls/${desiredFormat}-${packageName}`,
    version: packageStruct.version ?? '1.0.0',
    license: packageStruct.license ?? 'UNLICENSED',
    dependencies: deps,
    peerDependencies: {
      react: '^18.2.0',
      'react-dom': '^18.2.0'
    },
    main: 'index.js',
    source: 'index.js'
  }, undefined, 2)

  fs.writeFileSync(destPath, genStr)
}

function isDirectory (dir) {
  const stat = fs.statSync(dir, { throwIfNoEntry: false })
  if (!stat) return false

  return stat.isDirectory()
}

// Essentially does 'mkdir -P'
function mkdirp (dir) {
  try {
    return fs.mkdirSync(dir, { recursive: true })
  } catch (err) {
    if (err.code !== 'EEXIST') {
      throw err
    }
  }
  return null
}

// Returns a string
export function convertDomqlModule (domqlModule, globusaStruct, desiredFormat, options = {}) {
  let convertedStr = ''
  const whitelist = (options.only ? options.only.split(',') : null)

  console.group()
  const exports = Object.keys(domqlModule)
    .filter(exportName => {
      if (!whitelist) return true
      if (!whitelist.includes(exportName)) {
        console.log(`Skipping ${exportName} component due to whitelist exclusion`)
        return false
      }
      return true
    })
    .filter(exportName => {
      if (!options.internalUikit) return true
      if (INTERNAL_UIKIT_CONF.excludedComponents.includes(exportName)) {
        console.log(`Skipping ${exportName} component due to internal uikit exclusion`)
        return false
      }
      return true
    })

  const uniqueImports = []
  let globalSymbolTable = {}
  for (const idx in exports) {
    const exportName = exports[idx]

    const dobj = domqlModule[exportName]

    // Set component name (if not present)
    if (!dobj.__name) {
      dobj.__name = exportName
    }

    console.group()
    console.log(dobj.__name) // NOTE: Don't remove this

    // NOTE: Don't use '===' here!
    const isFirst = (idx == 0) // eslint-disable-line
    const isLast = (idx == (exports.length - 1)) // eslint-disable-line

    const kaldunaOpts = {
      verbose: false,
      returnMitosisIR: true,
      globalSymbolTable,
      exportDefault: false,
      importsToRemove: uniqueImports,

      /* NOTE: The option below prevents a name collision bug. For example:
         export const A = { ... }
         export const B = { extends: A }

         Normally, converting component B will generate an import for A like:
         'import { A } from @symbo.ls/react'
         But, in this case, because A is in local scope as one of the exports,
         the component import will be ignored, preventing the collision.
      */
      componentImportsToIgnore: exports
    }

    let out = null
    if (isFirst) {
      out = convert(dobj, desiredFormat, {
        ...kaldunaOpts,
        removeReactImport: false
        // NOTE(nikaoto): Commented these out because we're using deps now, so
        // all the imports and decls are going to be redundant
        // importsToInclude: globusaStruct.imports,
        // declarationsToInclude: globusaStruct.declarations,
      })
    } else {
      out = convert(dobj, desiredFormat, {
        ...kaldunaOpts,
        removeReactImport: true
      })
    }

    convertedStr = convertedStr + out.str
    if (!isLast) {
      convertedStr += '\n'
    }
    uniqueImports.push(...out.mitosisIR.imports)
    globalSymbolTable = out.mitosisIR._globalSymbolTable
    console.groupEnd()
  }
  console.groupEnd()

  return convertedStr
}

// Takes a source file, then bundles, parses and converts it and writes the
// result to the destination. The tmpDirPath is used as a working directory for
// temporary files.
// Returns globusaStruct for later usage.
export async function convertFile (
  srcPath,
  tmpDirPath,
  destPath,
  desiredFormat,
  options
) {
  // Parse with globusa
  console.log(`Parsing components in ${srcPath}`)
  const fileContent = await fs.promises.readFile(srcPath, 'utf8')
  const globusaStruct = parse(fileContent)

  const fileName = path.basename(srcPath)
  const bundledFilePath = path.resolve(tmpDirPath, fileName)

  // Bundle with esbuild
  await esbuild.build({
    entryPoints: [srcPath],
    bundle: true,
    sourcemap: true,
    keepNames: false,
    target: 'node12',
    format: 'cjs',
    outdir: tmpDirPath
  })

  // Import the bundled module to obtain exported domql objects
  console.log(`Importing ${bundledFilePath}`)
  const mod = (await import(bundledFilePath))
  const domqlModule = mod.default

  // Convert it/them with kalduna
  console.log(`Converting components in ${bundledFilePath}:`)
  const convertedModuleStr = convertDomqlModule(
    domqlModule,
    globusaStruct,
    desiredFormat,
    options
  )

  // Create dest dir
  mkdirp(path.dirname(destPath))

  // Write file
  if (convertedModuleStr && convertedModuleStr.length > 0) {
    const fh = await fs.promises.open(destPath, 'w')
    await fh.writeFile(convertedModuleStr, 'utf8')
    await fh.close()
  }

  return globusaStruct
}

// Aborts copying if destination exists
function recursiveCopy (src, dst, exclude) {
  if (exclude && exclude.includes(src)) { return }

  if (!fs.existsSync(src)) {
    console.error(`Error (recursiveCopy): Source file '${src}' does not exist.`)
    return
  }

  if (fs.existsSync(dst)) {
    console.error(`Error (recursiveCopy): Destination file '${dst}' exists.`)
    return
  }

  if (!isDirectory(src)) {
    fs.copyFileSync(src, dst)
    return
  }

  mkdirp(dst)
  const files = fs.readdirSync(src)
  for (const f of files) {
    if (exclude && exclude.includes(f)) { continue }

    recursiveCopy(path.join(src, f), path.join(dst, f), exclude)
  }
}

function mergeDirectories (mrg, dst, desiredFormat, { globusaMerge, exclude }) {
  // Source doesn't exist, skip
  if (!fs.existsSync(mrg)) {
    console.error(`Error: Source merge directory '${mrg}' does not exist.`)
    return
  }

  // Direct copy, no merging needed
  if (!fs.existsSync(dst)) {
    recursiveCopy(mrg, dst, exclude)
    return
  }

  const isMrgDir = isDirectory(mrg)
  const isDstDir = isDirectory(dst)

  if (!isMrgDir && !isDstDir) {
    return
  }

  if (!isMrgDir && isDstDir) {
    console.error(`mergeDirectories('${mrg}', '${dst}') skipped. ` +
                  'Merge source (mrg) is a regular file and the ' +
                  'destination (dst) is a directory.')
    return
  }

  if (isMrgDir && !isDstDir) {
    console.error(`mergeDirectories('${mrg}', '${dst}') skipped. ` +
                  'Merge source (mrg) is a directory and the ' +
                  'destination (dst) is a regular file.')
    return
  }

  const mrgFiles = fs.readdirSync(mrg).filter(f => !exclude.includes(f))
  const dstFiles = fs.readdirSync(dst)

  // Make a map of dstFiles for quick access
  const dstFilesMap = {}
  for (const f of dstFiles) {
    dstFilesMap[f] = true
  }

  // Do a direct directory merge (without globusa)
  const directMrgFiles = mrgFiles.filter(f => !globusaMerge.includes(f))
  for (const f of directMrgFiles) {
    if (!dstFilesMap[f]) {
      recursiveCopy(path.resolve(mrg, f), path.resolve(dst, f), exclude)
    } else {
      mergeDirectories(path.resolve(mrg, f), path.resolve(dst, f),
                       desiredFormat, { globusaMerge, exclude })
    }
  }

  // Do a smart file merge (with globusa)
  const globusaMrgFiles = mrgFiles.filter(f => globusaMerge.includes(f))
  for (const f of globusaMrgFiles) {
    if (!dstFilesMap[f]) {
      // Nothing to merge. Do a direct copy
      const p = path.resolve(mrg, f)
      if (isDirectory(p)) {
        console.error('Error: Globusa merge can only be done on files, ' +
                      `but '${p}' is a directory`)
      } else {
        fs.copyFileSync(p, path.resolve(dst, f))
      }
    } else {
      // Concatenate the files
      const mrgTxt = fs.readFileSync(path.resolve(mrg, f), { encoding: 'utf8' })
      const dstTxt = fs.readFileSync(path.resolve(dst, f), { encoding: 'utf8' })

      const mg = parse(mrgTxt)
      const dg = parse(dstTxt)

      const uniq = dedupMitosisImports([...mg.imports, ...dg.imports])
      const importsTxt = generateImports(uniq, desiredFormat)

      const outTxt = importsTxt + '\n\n' +
            mg.linesExcludingImports.join('\n') + '\n' +
            dg.linesExcludingImports.join('\n')

      fs.writeFileSync(path.resolve(dst, f), outTxt, { encoding: 'utf8' })
    }
  }
}

export function convertFromCli (data, opts) {
  const { framework, verbose, verboseCode } = opts
  console.log(chalk.dim('\n----------------\n'))
  console.log('Converting components to', chalk.bold(framework))
  const convertedStrings = convertDomqlModule(data, null, framework)
  if (verboseCode) console.log(convertedStrings)
  console.log(chalk.bold.green('\nSuccessfully converted'))
  return verbose
}

export async function CLIconvert (src, dest, options) {
  if (!convert) {
    throw new Error(
      'convert() from `kalduna` is not defined. Try to install ' +
        '`kalduna` and run this command again.')
  }

  if (!parse) {
    throw new Error(
      'parse() from `globusa` is not defined. Try to install ' +
        '`globusa` and run this command again.')
  }

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
    console.error(`Source directory/file ('${srcPath}') does not exist`)
    process.exit(1)
  }

  // Resolve & create tmp dir
  const tmpDirPath = options.tmpDir ??
        path.resolve(path.dirname(srcPath), TMP_DIR_NAME)
  mkdirp(tmpDirPath)

  // Put a package.json file so that when we import() the modules from the
  // directory, node doesn't recognize them as ES modules (in case the parent
  // directory of the tmp dir has "type": "module" in its package.json
  const pj = await fs.promises.open(
    path.resolve(tmpDirPath, 'package.json'), 'w')
  await pj.writeFile(TMP_DIR_PACKAGE_JSON_STR, 'utf8')
  await pj.close()

  // Convert single file. Output will also be a single file.
  if (!isDirectory(srcPath)) {
    // Determine destFilePath and create it if needed
    let destFilePath
    if (dest) {
      // dest is given.
      if (!fs.existsSync(dest)) {
        // dest doesn't exist. That's the output file we'll create.
        destFilePath = path.resolve(dest)
      } else if (isDirectory(dest)) {
        // dest exists and is a directory. Create our output file inside it.
        destFilePath = path.join(path.resolve(dest), path.basename(srcPath))
      } else {
        // dest exists and is not a directory. Overwrite the file.
        destFilePath = path.resolve(dest)
      }
    } else {
      // dest not given. Use default (desiredFormat as directory).
      const destDir = path.resolve(desiredFormat)
      mkdirp(destDir)
      destFilePath = path.join(destDir, path.basename(srcPath))
    }

    await convertFile(
      srcPath,
      tmpDirPath,
      destFilePath,
      desiredFormat,
      options
    )

    process.exit(0)
  }

  // We're converting multiple files (in a directory).
  // Determine destDirPath & create it if needed
  if (!dest) dest = path.resolve(desiredFormat)
  let destDirPath
  if (!fs.existsSync(dest)) {
    // dest doesn't exist. Create it.
    destDirPath = path.resolve(dest)
    mkdirp(destDirPath)
  } else if (isDirectory(dest)) {
    // dest exists and is a directory.
    destDirPath = path.resolve(dest)
  } else {
    // dest exists and is not a directory.
    console.error(
      `The destination ('${path.resolve(dest)}') must be a directory when ` +
        `the source ('${srcPath}') is a directory`)
    process.exit(1)
  }

  // Resolve merge dir
  let mergeDirPath = null
  if (options.merge && options.internalUikit) {
    mergeDirPath = path.resolve(options.merge)
    if (!fs.existsSync(mergeDirPath)) {
      console.error(`Merge directory '${mergeDirPath}' does not exist`)
      process.exit(1)
    }
  }

  const dontConvert = ['index.js', 'package.json', 'node_modules', 'dist']
  const sourceDirNames = (await fs.promises.readdir(srcPath))
        .filter(dir => !dontConvert.includes(dir))

  const dirs = []

  // Core convert loop
  for (const dir of sourceDirNames) {
    // Ignored directories
    if (options.internalUikit) {
      let skip = false
      for (const pat of INTERNAL_UIKIT_CONF.excludedDirectories) { if (dir.match(pat)) { skip = true; break } }
      if (skip) continue
    }

    const dirPath = path.join(srcPath, dir)
    if (!isDirectory(dirPath)) {
      console.log(`Skipping ${dirPath} because it is not a directory`)
      continue
    }
    const indexFilePath = path.join(dirPath, 'index.js')
    const pjFilePath = path.join(dirPath, 'package.json')

    const globusaStruct = await convertFile(
      indexFilePath, // src
      path.join(tmpDirPath, dir), // tmp
      path.join(destDirPath, dir, 'index.js'), // dst
      desiredFormat,
      options
    )

    if (options.internalUikit && fs.existsSync(pjFilePath)) {
      generatePackageJsonFile(
        pjFilePath, // src
        path.join(destDirPath, dir, 'package.json'), // dst
        globusaStruct,
        desiredFormat,
        options
      )
    }

    dirs.push(dir)
  }

  // Generate top index.js file
  if (dirs.length > 0) {
    const fileContent = dirs.map(d => `export * from './${d}'`).join('\n')
    const fh = await fs.promises.open(path.join(destDirPath, 'index.js'), 'w')
    await fh.writeFile(fileContent, 'utf8')
    await fh.close()
  }

  if (mergeDirPath) {
    console.log(`Merging '${mergeDirPath}' and ${destDirPath}...`)
    mergeDirectories(mergeDirPath, destDirPath, desiredFormat, {
      globusaMerge: ['index.js', 'index.jsx'],
      exclude: ['dist', 'node_modules']
    })
  }

  process.exit(0)
}
