#!/usr/bin/env node

import { sync } from '@symbo.ls/sync/server'
import { program } from './program.js'

program
  .command('clean')
  .description('Clean Symbols temp files')
  .action(async () => {
    sync()
  })
