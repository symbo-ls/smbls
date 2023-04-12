'use strict'

import * as esbuild from 'esbuild'
import { loadModule } from './require.js'
import { program } from './program.js'
import { convert } from 'domql-to-mitosis'
import fs from 'fs'
import path from 'path'
import { JSDOM } from 'jsdom'

const jsdom = new JSDOM(`<html><head></head><body></body></html>`)
global.window = jsdom.window
global.document = window.document


const EXCLUDED_FROM_INTERNAL_UIKIT = ['Svg']
const TMP_DIR_NAME = ".smbls_convert_tmp"

async function mkdirp(dir) {
  try {
    return await fs.promises.mkdir(dir)
  } catch (err) {
    if (err.code !== 'EEXIST') {
      throw err
    }
  }
  return null
}

program
  .command('convert')
  .description('Recursively convert and copy all DomQL components under a directory')
  .argument('[src]', 'Source directory. By default, it is "src/"')
  .argument('[dest]', 'Destination directory. By default, it becomes the name of the desired format')
  .option('--react', 'Convert all DomQL components to React')
  .option('--angular', 'Convert all DomQL components to Angular')
  .option('--vue2', 'Convert all DomQL components to Vue2')
  .option('--vue3', 'Convert all DomQL components to Vue3')
  .option('--internal-uikit', '(For internal use only). Excludes particular components from the conversion')
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

    // Resolve source & destination directories
    const srcPath = path.resolve(src || './src')
    const destPath = path.resolve(dest || desiredFormat)
    const tmpDirPath = path.resolve(path.dirname(destPath), TMP_DIR_NAME)

    if (!fs.existsSync(srcPath)) {
      console.erorr(`Source directory '${srcPath}' does not exist`)
      return;
    }

    // TODO: convert single file
    //if (!isDirectory(srcPath)) {
    //}

    // Make tmp and dist directories
    await mkdirp(tmpDirPath)
    await mkdirp(destPath)

    const origFiles = await fs.promises.readdir(srcPath)

    // Bundle components
    await esbuild.build({
      entryPoints: origFiles.map(file => path.join(srcPath, file, './index.js')),
      bundle: true,

      // None of this worked
      minify: false,
      mangleProps: /.*/,
      reserveProps: /.*/,
      keepNames: true,

      sourcemap: true,
      target: 'node12',
      format: 'cjs',
      outdir: tmpDirPath
    })

    // Convert components
    const componentDirs = await fs.promises.readdir(tmpDirPath)
    for (const componentDir of componentDirs) {
      let importDir = path.join(tmpDirPath, componentDir)
      if ((await fs.promises.stat(importDir)).isDirectory()) {
        // Import the module
        const importPath = `${importDir}/index.js`
        console.log(`importing ${componentDir}/`)
        const domqlModule = (await import(importPath)).default

        // Create directory for component in dest dir
        const destComponentDirPath = `${destPath}/${componentDir}`
        await mkdirp(destComponentDirPath)

        // Convert & append each exported domql object
        console.log(`Converting modules in ${componentDir}:`)
        console.group()
        const uniqueImports = []
        let fileContents = ""
        let first = true
        let removeUseContextImport = false
        const exportCount = Object.keys(domqlModule).length
        for (const key in domqlModule) {
          if (key !== 'Img') continue
          if (options.internalUikit &&
              EXCLUDED_FROM_INTERNAL_UIKIT.includes(key)) {
            console.log(`Skipping ${key} component due to exclusion`)
            continue
          }

          console.log(key)
          console.group()
          const component = domqlModule[key]
          component.__name = key
          console.log('input domql obj:')
          console.log(component)
          const out = convert(component, desiredFormat, {
            verbose: true,
            exportDefault: exportCount === 1,
            returnMitosisIR: true,
            importsToRemove: uniqueImports,
            removeReactImport: !first,
            removeUseContextImport: removeUseContextImport,
          })

          fileContents = fileContents + out.str + '\n'
          uniqueImports.push(...out.mitosisIR.imports)
          first = false
          if (out.mitosisIR._useContext)
            removeUseContextImport = true
          console.groupEnd()
        }

        console.groupEnd()

        // Write file
        if (fileContents.length > 0) {
          const fh = await fs.promises
                .open(`${destComponentDirPath}/index.js`, 'w')
          await fh.writeFile(fileContents, 'utf8')
          await fh.close()
        }
      }
    }
  })
