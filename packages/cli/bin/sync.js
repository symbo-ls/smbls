#!/usr/bin/env node

import chalk from 'chalk'
import { program } from './program.js'
import { loadModule } from './require.js'
import { updateDynamycFile } from '@symbo.ls/socket'
import * as utils from '@domql/utils'

import * as socketClient from '@symbo.ls/socket/client.js'
import { fetchFromCli } from './fetch.js'
import { convertFromCli } from './convert.js'

const { debounce } = utils.default || utils

const SOCKET_API_URL_LOCAL = 'http://localhost:13335/'
const SOCKET_API_URL = 'https://api.symbols.app/'

const debugMsg = chalk.dim(
  'Use --verbose to debug the error or open the issue at https://github.com/symbo-ls/smbls'
)

const RC_PATH = process.cwd() + '/symbols.json'
let rc = {}
try {
  rc = loadModule(RC_PATH) // eslint-disable-line
} catch (e) {
  console.error('Please include symbols.json to your root of respository')
}

program
  .command('sync')
  .description('Realtime sync with Symbols')
  .option('-d, --dev', 'Running from local server')
  .option('-v, --verbose', 'Verbose errors and warnings')
  .option(
    '-k, --key',
    'Bypass the symbols.json key, overriding the key manually'
  )
  .option('-f, --fetch', 'Verbose errors and warnings', true)
  .option('--convert', 'Verbose errors and warnings', true)
  .option('--update', 'overriding changes from platform', true)
  .option('--verbose-code', 'Verbose errors and warnings')
  .action(async opts => {
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
      const { framework, distDir, prettify, verboseCode } = options
      const key = options.key || opts.key
      const socketUrl = dev ? SOCKET_API_URL_LOCAL : SOCKET_API_URL

      console.log('Connecting to:', chalk.bold(socketUrl))
      console.log()

      socketClient.connect(key, {
        source: 'cli',
        socketUrl,
        onConnect: (id, socket) => {
          console.log(
            'Connected to',
            chalk.green(key),
            'from',
            chalk.bold('Symbols'),
            'socket server'
          )
          console.log('Socket id:', id)
          console.log(chalk.dim('\nListening to updates...\n'))
        },
        onChange: debounce(async (event, data) => {
          if (event === 'clients') {
            console.log(
              'Active clients:',
              chalk.green.bold(Object.keys(data).join(', '))
            )
            return
          }

          const parseData = JSON.parse(data)
          const d = parseData && parseData.DATA

          if (!d) return

          if (Object.keys(d).length) {
            console.log(chalk.dim('\n----------------\n'))
            console.log(chalk.dim('Received update:'))
            console.log(Object.keys(d).join(', '))
            if (verboseCode)
              console.log(chalk.dim(JSON.stringify(d, null, prettify ?? 2)))

            if (distDir) {
              if (fetchOpt) {
                await fetchFromCli(options)
                console.log(chalk.dim('\n----------------\n'))
                return
              }
            } else {
              updateDynamycFile(d, { framework, ...options })
            }
          }

          if (d.components && convertOpt && framework) {
            convertFromCli(d.components, {
              ...options,
              framework
            })
          }
        }, 1500),
        onError: (err, socket) => {
          console.log(chalk.bold.green('Error during connection'))
          if (verbose) console.error(err)
          else console.log(debugMsg)
        },
        ...options
      })
    })
  })
