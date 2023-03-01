#!/usr/bin/env node

import * as asd from '@symbo.ls/socket/client.js'
import { program } from './program.js'
import { loadModule } from './require.js'

console.log(asd)

const RC_PATH = process.cwd() + '/symbols.json'
let rc = {}
try {
  rc = loadModule(RC_PATH) // eslint-disable-line
} catch (e) { console.error('Please include symbols.json to your root of respository') }

program
  .command('sync')
  .description('Sync with Symbols')
  .option('-l, --live', 'Bypass the local build')
  .option('--key', 'Bypass the local build')
  .action(async (options) => {
    rc.then(data => {
      const opts = { ...data, ...options }
      const key = rc.key || options.key
      console.log(opts)
      asd.connect(key, {
        socketUrl: 'socket.symbols.app',
        onConnect: (id, socket) => {
          console.log(id)
        }
      })
    })
  })
