#!/usr/bin/env node

import { sync } from '@symbo.ls/socket'
import { program } from './program.js'
import { loadSymbolsConfig } from '../helpers/symbolsConfig.js'

program
  .command('socket-server')
  .description('Realtime sync with Symbols')
  .option('-l, --live', 'Bypass the local build')
  .action(async (options) => {
    const symbolsConfig = await loadSymbolsConfig()
    if (symbolsConfig) {
      const opts = { ...symbolsConfig, ...options }
      sync(null, opts)
    }
  })
