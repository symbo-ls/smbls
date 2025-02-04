#!/usr/bin/env node

import { sync } from '@symbo.ls/socket'
import { program } from './program.js'
import { loadModule } from './require.js'

const RC_PATH = process.cwd() + '/symbols.json'
let rc = {}

try {
  rc = await loadModule(RC_PATH, { json: true, silent: true })
} catch (e) {
  console.error('Please include symbols.json to your root of respository')
}

program
  .command('socket-server')
  .description('Realtime sync with Symbols')
  .option('-l, --live', 'Bypass the local build')
  .action(async (options) => {
    if (rc) {
      const opts = { ...rc, ...options }
      sync(null, opts)
    }
  })
