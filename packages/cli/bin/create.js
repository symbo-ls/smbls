'use strict'

import { execSync } from 'child_process'
import { program } from './program.js'
import { initRepo } from './init-helpers/init-repo.js'

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
  .option('--domql', 'Use DOMQL in the project')
  .option('--react', 'Use React in the project (default)', true)
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

    // Clone
    console.log(`Cloning ${cloneUrl} into '${dest}'...`)
    execSync(`git clone ${cloneUrl} ${dest}`)

    // Leave the rest to init
    return await initRepo(dest, framework)
  })
