#!/usr/bin/env node

import { updateDynamycFile } from '@symbo.ls/socket'
import * as socketClient from '@symbo.ls/socket/client.js'
import { program } from './program.js'
import { loadModule } from './require.js'

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
    if (!rc) {
      console.error('symbols.json not found in the root of the repository')
      return
    }
    rc.then(data => {
      const opts = { ...data, ...options }
      const key = data.key || options.key
      console.log(data.key)
      socketClient.connect(key, {
        source: 'cli',
        onConnect: (id, socket) => {
          console.log(key)
          console.log(id)
        },
        onChange: (event, data) => {
          data = JSON.parse(data)
          console.log('change')
          console.log(event)
          console.log(data)
          const d = {}
          const {
            PROJECT_DESIGN_SYSTEM,
            PROJECT_STATE,
            PROJECT_COMPONENTS,
            PROJECT_SNIPPETS,
            PROJECT_PAGES
          } = data
          if (PROJECT_DESIGN_SYSTEM) d.designSystem = PROJECT_DESIGN_SYSTEM
          if (PROJECT_STATE) d.designSystem = PROJECT_STATE
          if (PROJECT_COMPONENTS) d.designSystem = PROJECT_COMPONENTS
          if (PROJECT_SNIPPETS) d.designSystem = PROJECT_SNIPPETS
          if (PROJECT_PAGES) d.designSystem = PROJECT_PAGES
          if (Object.keys(d).length) updateDynamycFile(d)
        },
        onError: (err, socket) => {
          console.log(err)
        },
        ...opts
      })
    })
  })
