'use strict'

import { execSync } from 'child_process'
import { program } from './program.js'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DESIGN_SYSTEM_FILE_PATH = path.join(
  __dirname, 'create', 'DesignSystem.js')
const REPO_URLS = {
  domql: 'https://github.com/symbo-ls/create-domql-app.git',
  react: 'https://github.com/symbo-ls/create-react-app.git',
  angular: 'https://github.com/symbo-ls/create-angular-app.git',
  vue2: 'https://github.com/symbo-ls/create-vue2-app.git',
  vue3: 'https://github.com/symbo-ls/create-vue3-app.git',
}

program
  .command('create')
  .description('Create a new project that uses Symbols')
  .argument('dest', 'Project directory name')
  .option('--domql', 'Use Domql in the project (default)')
  .option('--react', 'Use React in the project (default)')
  .option('--angular', 'Use Angular in the project')
  .option('--vue2', 'Use Vue2 in the project')
  .option('--vue3', 'Use Vue3 in the project')
  .action(async (dest, options) => {
    // Determine repo to clone
    let cloneUrl = REPO_URLS.react
    if (options.domql) {
      cloneUrl = REPO_URLS.domql
    } else if (options.angular) {
      cloneUrl = REPO_URLS.angular
    } else if (options.vue2) {
      cloneUrl = REPO_URLS.vue2
    } else if (options.vue3) {
      cloneUrl = REPO_URLS.vue3
    }

    // Clone
    console.log(`Cloning ${cloneUrl} into ${dest}...`)
    execSync(`git clone ${cloneUrl} ${dest}`)

    // Install
    const cwd = process.cwd()
    console.log('Installing NPM dependencies...')
    process.chdir(dest)
    execSync(`npm install`)
    process.chdir(cwd)

    // Copy design system file
    const filePath = path.join(dest, 'DesignSystem.js')
    console.log(`Writing DesignSystem.js to ${filePath}`)
    await fs.promises.copyFile(DESIGN_SYSTEM_FILE_PATH, filePath)

    console.log('Done!')
  })
