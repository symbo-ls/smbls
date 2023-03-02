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

const TMP_DIR_NAME = ".smbls_convert_tmp"

program
  .command('convert')
  .description('Recursively convert and copy all DomQL components under a directory')
  .argument('[src]', 'Source directory. By default, it is "."', '.')
  .argument('[dest]', 'Destination directory. By default, it becomes the name of the desired format')
  .option('--react', 'Convert all DomQL components to React')
  .option('--angular', 'Convert all DomQL components to Angular')
  .option('--vue2', 'Convert all DomQL components to Vue2')
  .option('--vue3', 'Convert all DomQL components to Vue3')
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
    const destPath = path.resolve(dest || './dist')
    const tmpDirPath = path.resolve(path.dirname(destPath), TMP_DIR_NAME)

    // Make tmp directory
    try {
      await fs.promises.mkdir(tmpDirPath)
    } catch (err) {
      if (err.code !== 'EEXIST') {
        console.log(err)
        return 1;
      }
    }

    const origFiles = await fs.promises.readdir(srcPath)

    // Bundle components
    await esbuild.build({
      entryPoints: origFiles.map(file => path.join(srcPath, file, '/index.js')),
      bundle: true,
      sourcemap: true,
      target: 'node12',
      format: 'cjs',
      outdir: tmpDirPath
    })

    // Convert components
    const files = await fs.promises.readdir(tmpDirPath)
    for (const file of files) {
      if (file === 'Atoms') continue

      let filePath = path.join(tmpDirPath, file)

      if ((await fs.promises.stat(filePath)).isDirectory()) {
        const importPath = `${filePath}/index.js`
        console.log(`importing ${importPath}`)
        const domqlModule = (await import(importPath)).default
        console.log(domqlModule)
        for (const key in domqlModule) {
          const component = domqlModule[key]
          const gen = convert(component, desiredFormat, {
            verbose: false,
            exportDefault: domqlModule.length === 1
          })
          //console.log(gen)
        }
      }
    }
  })
