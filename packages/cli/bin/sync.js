#!/usr/bin/env node

import chalk from 'chalk'
import { program } from './program.js'
import { loadModule } from './require.js'
import { updateDynamycFile } from '@symbo.ls/socket'

import * as socketClient from '@symbo.ls/socket/client.js'
import { fetchFromCli } from './fetch.js'
import * as smblsconvert from '@symbo.ls/convert'

const { convertFromCli } = smblsconvert.default

const SOCKET_API_URL_LOCAL = 'http://localhost:13336/'
const SOCKET_API_URL = 'https://socket.symbols.app/'

const debugMsg = chalk.dim('Use --verbose to debug the error or open the issue at https://github.com/symbo-ls/smbls')

const RC_PATH = process.cwd() + '/symbols.json'
let rc = {}
try {
  rc = loadModule(RC_PATH) // eslint-disable-line
} catch (e) { console.error('Please include symbols.json to your root of respository') }

program
  .command('sync')
  .description('Sync with Symbols')
  .option('-d, --dev', 'Running from local server')
  .option('-v, --verbose', 'Verbose errors and warnings')
  .option('-k, --key', 'Bypass the symbols.json key, overriding the key manually')
  .option('-f, --fetch', 'Verbose errors and warnings', true)
  .option('--convert', 'Verbose errors and warnings', true)
  .option('--verbose-code', 'Verbose errors and warnings')
  .action(async (opts) => {
    const { dev, verbose, fetch: fetchOpt, convert: convertOpt } = opts

    if (fetchOpt) {
      await fetchFromCli(opts)
      console.log(chalk.dim('\n----------------\n'))
    }

    if (!rc) {
      console.error('symbols.json not found in the root of the repository')
      return
    }

    // if (rc) return false /// /////////////////////

    await rc.then(symbolsrc => {
      const options = { ...symbolsrc, ...opts }
      const { framework } = symbolsrc
      const key = symbolsrc.key || opts.key
      const socketUrl = dev ? SOCKET_API_URL_LOCAL : SOCKET_API_URL

      console.log('Connecting to:', chalk.bold(socketUrl))
      console.log()

      socketClient.connect(key, {
        source: 'cli',
        socketUrl,
        onConnect: (id, socket) => {
          console.log('Connected to', chalk.green(key), 'from', chalk.bold('Symbols'), 'socket server')
          console.log('Socket id:', id)
          console.log(chalk.dim('\nListening to updates...\n'))
        },
        onChange: (event, data) => {
          if (event === 'clients') {
            console.log(
              'Active clients:',
              chalk.green.bold(Object.keys(data).join(', '))
            )
            return
          }

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

          if (Object.keys(d).length) {
            updateDynamycFile(d, { framework, ...options })
          }

          if (d.components && convertOpt && framework) {
            convertFromCli(d.components, {
              ...options, framework
            })
          }
        },
        onError: (err, socket) => {
          console.log(chalk.bold.green('Error during connection'))
          if (verbose) console.error(err)
          else console.log(debugMsg)
        },
        ...options
      })
    })
  })
