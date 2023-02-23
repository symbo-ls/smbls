'use strict'

import * as esbuild from 'esbuild'
import { program } from './program.js'
import { convert } from 'domql-to-mitosis'
import fs from 'fs'
import path from 'path'

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
      // Resolve source & destination directories
      const srcPath = path.resolve(src || './src')
      const destPath = path.resolve(dest || './dist')
      const tmpDirPath = path.resolve(path.dirname(destPath), TMP_DIR_NAME)

      // Make tmp directory
      try {
        await fs.promises.mkdir(tmpDirPath)
      } catch (err) {
        if (err.code !== 'EEXIST')
          return 1;
      }

      const origFiles = await fs.promises.readdir(srcPath)
      console.log(origFiles)

      // Bundle components
      await esbuild.build({
        entryPoints: origFiles.filter(f => f !== "Atoms").map(file => path.join(srcPath, file, '/index.js')),
        bundle: true,
        target: 'node12',
        format: 'cjs',
        // Doing this prevents esbuild from including all the external deps we don't need
        external: ['*'],
        outdir: tmpDirPath
      })
      console.log("built")

      // Convert components
      const files = await fs.promises.readdir(tmpDirPath)
      console.log(files)
      for (const file of files) {
        if (file === 'Atoms') continue

        let filePath = path.join(tmpDirPath, file)

        if ((await fs.promises.stat(filePath)).isDirectory()) {
          console.log(`importing ${filePath}`)
          const domqlModule = (await import(`${filePath}/index.js`)).default
          console.log(domqlModule)
          for (const key in domqlModule) {
            const component = domqlModule[key]
            console.group(key)
            console.log('========================', key)
            convert(component, 'react')
            console.groupEnd(key)
          }
        }
      }
    })
