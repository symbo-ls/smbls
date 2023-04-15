#!/usr/bin/env node

import { program } from './program.js'

program
  .command('link-all')
  .description('Symlink all smbls dependencies')
  .action(async (options) => {
    //
  })
