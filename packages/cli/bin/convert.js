'use strict'

import { program } from './program.js'
import { convert } from 'kalduna'
import { parse } from 'globusa'
import fs from 'fs'
import path from 'path'

import * as esbuild from 'esbuild'

// Set up jsdom
import { JSDOM } from 'jsdom'
const jsdom = new JSDOM('<html><head></head><body></body></html>')
global.window = jsdom.window
global.document = window.document

const INTERNAL_UIKIT_CONF = {
  excludedComponents: [
    // We have our own React Svg implementation
    'Svg',

    // We have our own React Box implementation
    'Box',

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
const TMP_DIR_NAME = '.smbls_convert_tmp'
const TMP_DIR_PACKAGE_JSON_STR = JSON.stringify({
  name: 'smbls_convert_tmp',
  version: '1.0.0',
  // "main": "index.js",
  license: 'ISC'
})

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

// Returns a string
function convertDomqlModule (domqlModule, globusaStruct, desiredFormat, options) {
  let convertedStr = ''
  const whitelist = (options.only ? options.only.split(',') : null)

  console.group()
  const exports = Object.keys(domqlModule)
    .filter(exportName => {
      if (!whitelist) return true
      if (whitelist.includes(exportName)) {
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

  const isSingleComponent = (exports.length === 1)
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
    console.log(dobj.__name) // NOTE(Nikaoto): @nikoloza, don't remove this

    // NOTE: Don't use '===' here!
    const isFirst = (idx == 0) // eslint-disable-line
    const isLast = (idx == (exports.length - 1)) // eslint-disable-line

    const kaldunaOpts = {
      verbose: false,
      returnMitosisIR: true,
      globalSymbolTable,
      exportDefault: isSingleComponent,
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
async function convertFile (srcPath, tmpDirPath, destPath,
  desiredFormat, options) {
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
  await mkdirp(path.dirname(destPath))

  // Write file
  if (convertedModuleStr && convertedModuleStr.length > 0) {
    const fh = await fs.promises.open(destPath, 'w')
    await fh.writeFile(convertedModuleStr, 'utf8')
    await fh.close()
  }

  return globusaStruct
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
      console.erorr(`Source directory/file ('${srcPath}') does not exist`)
      return 1
    }

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
        await mkdirp(destDir)
        destFilePath = path.join(destDir, path.basename(srcPath))
      }

      await convertFile(
        srcPath,
        tmpDirPath,
        destFilePath,
        desiredFormat,
        options
      )

      return 0
    }

    // We're converting multiple files (in a directory).
    // Determine destDirPath & create it if needed
    if (!dest) dest = path.resolve(desiredFormat)
    let destDirPath
    if (!fs.existsSync(dest)) {
      // dest doesn't exist. Create it.
      destDirPath = path.resolve(dest)
      await mkdirp(destDirPath)
    } else if (isDirectory(dest)) {
      // dest exists and is a directory.
      destDirPath = path.resolve(dest)
    } else {
      // dest exists and is not a directory.
      console.error(
        `The destination ('${path.resolve(dest)}') must be a directory when ` +
          `the source ('${srcPath}') is a directory`)
      return 1
    }

    const ignoredFiles = ['index.js', 'package.json', 'node_modules', 'dist']
    const sourceDirNames = (await fs.promises.readdir(srcPath))
      .filter(dir => !ignoredFiles.includes(dir))

    const dirs = []

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

      if (fs.existsSync(pjFilePath)) {
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
      // const importLines = dirs.map(d => `import ${d} from './${d}'`).join('\n') + '\n'
      // const exportLines = 'export {\n' + dirs.map(d => `  ${d}`).join(',\n') + '\n}\n'
      // const fileContent = importLines + '\n' + exportLines
      const fileContent = dirs.map(d => `export * from './${d}'`).join('\n')

      const fh = await fs.promises.open(path.join(destDirPath, 'index.js'), 'w')
      await fh.writeFile(fileContent, 'utf8')
      await fh.close()
    }
  })
