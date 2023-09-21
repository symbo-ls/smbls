#!/usr/bin/env node

import chalk from 'chalk'
import { program } from './program.js'
import { loadModule } from './require.js'
import { updateDynamycFile } from '@symbo.ls/socket'

import * as socketClient from '@symbo.ls/socket/client.js'

const SOCKET_API_URL = 'https://api.symbols.app/'
const SOCKET_API_URL_LOCAL = 'https://localhost:13335/'

const RC_PATH = process.cwd() + '/symbols.json'
let rc = {}
try {
  rc = loadModule(RC_PATH) // eslint-disable-line
} catch (e) { console.error('Please include symbols.json to your root of respository') }

program
  .command('sync')
  .description('Sync with Symbols')
  .option('-l, --live', 'Bypass the local build')
  .option('-d, --dev', 'Bypass the local build')
  .option('--key', 'Bypass the local build')
  .action(async (options) => {
    if (!rc) {
      console.error('symbols.json not found in the root of the repository')
      return
    }
    rc.then(data => {
      const opts = { ...data, ...options }
      const key = data.key || options.key
      socketClient.connect(key, {
        source: 'cli',
        socketUrl: options.dev ? SOCKET_API_URL_LOCAL : SOCKET_API_URL,
        onConnect: (id, socket) => {
          console.log(key)
          console.log(id)
        },
        onChange: (event, data) => {
          if (event === 'clients') {
            console.log(
              chalk.green.bold('Active clients:'),
              Object.keys(data)
            )
            return
          }

          console.log(data)
          data = JSON.parse(data)
          const d = {}
          const {
            PROJECT_DESIGN_SYSTEM,
            PROJECT_STATE,
            PROJECT_COMPONENTS,
            PROJECT_SNIPPETS,
            PROJECT_PAGES,
            DATA
          } = data
          if (PROJECT_DESIGN_SYSTEM) d.designSystem = PROJECT_DESIGN_SYSTEM
          if (PROJECT_STATE) d.state = PROJECT_STATE
          if (PROJECT_COMPONENTS) d.components = PROJECT_COMPONENTS
          if (DATA && DATA.components) d.components = DATA.components
          if (PROJECT_SNIPPETS) d.snippets = PROJECT_SNIPPETS
          if (PROJECT_PAGES) d.pages = PROJECT_PAGES
          if (Object.keys(d).length) updateDynamycFile(d)
        },
        onError: (err, socket) => {
          console.log(err)
        },
        ...opts
      })
    })
  })
