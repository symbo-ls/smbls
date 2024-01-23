'use strict'

import { program } from './program.js'
import { initRepo } from './init-helpers/init-repo.js'

program
  .command('init')
  .description('Initialize within the project')
  .argument('[dest]', 'Project directory. By default, it is "."')
  .option('--domql', 'Use Domql in the project', true)
  .option('--react', 'Use React in the project (default)')
  .option('--angular', 'Use Angular in the project')
  .option('--vue2', 'Use Vue2 in the project')
  .option('--vue3', 'Use Vue3 in the project')
  .action(async (dest, options) => {
    if (!dest) dest = '.'

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

    // Leave the rest to init
    return await initRepo(dest, framework)
  })
