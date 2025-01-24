'use strict'

import chalk from 'chalk'
import fs from 'fs'
import path from 'path'
import { exec, execSync } from 'child_process'
import { program } from './program.js'
import { addToJson } from './init-helpers/addToJson.js'

function folderExists (path) {
  try {
    fs.accessSync(path, fs.constants.F_OK)
    return true // The folder exists
  } catch (err) {
    return false // The folder does not exist
  }
}

const REPO_URLS = {
  domql: 'https://github.com/symbo-ls/starter-kit',
  react: 'https://github.com/symbo-ls/create-react-app.git',
  angular: 'https://github.com/symbo-ls/create-angular-app.git',
  vue2: 'https://github.com/symbo-ls/create-vue2-app.git',
  vue3: 'https://github.com/symbo-ls/create-vue3-app.git'
}

program
  .command('create')
  .description('Create and initialize a new project')
  .argument('dest', 'Project directory')
  .option('--verbose', 'Verbose output')
  .option('--remote', 'Fetch from platform', true)
  .option('--domql', 'Use DOMQL in the project', true)
  .option('--react', 'Use React in the project (default)')
  .option('--angular', 'Use Angular in the project')
  .option('--vue2', 'Use Vue2 in the project')
  .option('--vue3', 'Use Vue3 in the project')
  .option('--package-manager <manager>', 'Choose the package manager (e.g., npm, yarn)', 'npm')
  .option('--clean-from-git', 'remove starter-kit git repository', true)
  .action(async (dest = 'symbols-starter-kit', options) => {
    // Determine framework
    let framework = 'domql'
    if (options.react) {
      framework = 'react'
    } else if (options.angular) {
      framework = 'angular'
    } else if (options.vue2) {
      framework = 'vue2'
    } else if (options.vue3) {
      framework = 'vue3'
    }
    const cloneUrl = REPO_URLS[framework]
    const packageManager = options.packageManager || 'npm'

    if (folderExists(dest)) {
      console.error(`Folder ${dest} already exists!`)
      return
    }

    console.log(`Cloning ${cloneUrl} into '${dest}'...`)
    execSync(`git clone ${options.remote ? ' -b feature/remote' : ''} ${cloneUrl} ${dest}`)

    process.chdir(dest)

    const SYMBOLS_FILE_PATH = path.join(process.cwd(), 'symbols.json')
    addToJson(SYMBOLS_FILE_PATH, 'key', `${dest}.symbo.ls`)
    addToJson(SYMBOLS_FILE_PATH, 'packageManager', `${packageManager}`)

    console.log(`Installing dependencies using ${packageManager}...`)

    const exc = exec(packageManager === 'yarn' ? 'yarn' : 'npm i')

    if (options.verbose) {
      exc.stdout.on('data', (data) => {
        console.log(data)
      })
      exc.stderr.on('data', (data) => {
        console.error(data)
      })
    } else {
      console.log(chalk.dim('Use --verbose to print the output'))
    }

    console.log()

    exc.on('close', (code) => {
      console.log()
      console.log(chalk.green.bold(dest), 'successfuly created!')
      console.log(`Done! run \`${chalk.bold('cd ' + dest + '; ' + packageManager + ' start')}\` to start the development server.`)
    })

    if (options.cleanFromGit) {
      fs.rmSync('.git', {
        recursive: true,
        force: true
      })
    }
  })
