'use strict'

import { program } from './program.js'
import { initRepo } from './init-helpers/init-repo.js'

program
  .command('init')
  .description('Initialize within the project')
  .argument('[dest]', 'Project directory. By default, it is "."')
  .option('--domql', 'Use DOMQL template (default)', true)
  .action(async (dest, options) => {
    if (!dest) dest = '.'

    if (options.domql === false) {
      console.error('Only DOMQL templates are supported right now.')
      process.exit(1)
    }

    // Leave the rest to init
    return await initRepo(dest, 'domql')
  })
