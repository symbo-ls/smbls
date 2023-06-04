'use strict'

import chalk from 'chalk'
import fs from 'fs'
import { execSync } from 'child_process'
import { program } from './program.js'

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
  .option('--domql', 'Use DOMQL in the project', true)
  .option('--react', 'Use React in the project (default)')
  .option('--angular', 'Use Angular in the project')
  .option('--vue2', 'Use Vue2 in the project')
  .option('--vue3', 'Use Vue3 in the project')
  .action(async (dest, options) => {
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

    if (folderExists(dest)) {
      console.error(`Folder ${dest} already exists!`)
      return
    }

    console.log(`Cloning ${cloneUrl} into '${dest}'...`)
    execSync(`git clone ${cloneUrl} ${dest}`)

    process.chdir(dest)
    console.log('Installing Dependencies...')
    console.log()
    execSync('npm i')
    console.log()
    console.log(chalk.green.bold(dest), 'successfuly created!')
    console.log(`Done! run \`${chalk.bold('npm start')}\` to start the development server.`)
  })
