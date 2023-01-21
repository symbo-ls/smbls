'use strict'

import * as esbuild from 'esbuild'
import { loadModule } from './require.js'
import { program } from './program.js'
//import { convert } from 'domql-to-mitosis'
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
      const srcParent = path.dirname()
      const destParent = path.dirname()
      const tmpDirPath = path.join(destParent, TMP_DIR_NAME)

      await fs.mkdir(tmpDirPath, async () => {
        const origFiles = await fs.promises.readdir(src)
        console.log(origFiles)
        
        await esbuild.build({
          entryPoints: origFiles.map(file => path.join(srcParent, file)),
          bundle: true,
          outdir: tmpDirPath
        })
  
      //   const files = await fs.promises.readdir(tmpDirPath)
      //   for (const file of files) {
      //     let filePath = path.join(tmpDirPath, file)
  
      //     if ((await fs.promises.stat(filePath)).isDirectory()) {
      //       console.log(`importing ${filePath}`)
      //       const domqlObj = await import(`${filePath}/index.js`)
      //       console.log(domqlObj)
      //     }
      //   }
      })
    })
