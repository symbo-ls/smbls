#!/usr/bin/env node

import fs from 'fs'
import chalk from 'chalk'
import { loadModule } from './require.js'
import { exec } from 'child_process'
import { program } from './program.js'
import * as fetch from '@symbo.ls/fetch'

import * as utils from '@domql/utils'
const { isObjectLike } = utils.default

const { fetchRemote } = fetch.default

const PACKAGE_PATH = process.cwd() + '/package.json'
const RC_PATH = process.cwd() + '/symbols.json'
const LOCAL_CONFIG_PATH = process.cwd() + '/node_modules/@symbo.ls/init/dynamic.json'
const DEFAULT_REMOTE_REPOSITORY = 'https://github.com/symbo-ls/default-config/'
const DEFAULT_REMOTE_CONFIG_PATH = 'https://api.symbols.app/' // eslint-disable-line

const API_URL_LOCAL = 'http://localhost:13335/'
const API_URL = 'https://api.symbols.app/'

const pkg = loadModule(PACKAGE_PATH)
const rcFile = loadModule(RC_PATH) // eslint-disable-line
const localConfig = loadModule(LOCAL_CONFIG_PATH) // eslint-disable-line

const debugMsg = chalk.dim('Use --verbose to debug the error or open the issue at https://github.com/symbo-ls/smbls')

let rc = {}
try {
  rc = loadModule(RC_PATH) // eslint-disable-line
} catch (e) { console.error('Please include symbols.json to your root of respository') }

program
  .version(pkg.version ?? 'unknown')

program
  .command('install')
  .description('Install Symbols')
  .option('-d, --dev', 'Bypass the local build')
  .option('--framework', 'Which Symbols to install (domql, react)')
  .action(async (options) => {
    const { framework } = options
    if (!rcFile || !localConfig) {
      console.error('symbols.json not found in the root of the repository')
      return
    }

    // const packageName = `@symbo.ls/${mode || 'uikit'}`
    const packageName = 'smbls'
    console.log('Adding', chalk.green.bold(packageName))

    if (framework === 'domql' || rcFile.framework === 'domql') {
      exec('yarn add domql@^1.15.26 --force', (error, stdout, stderr) => {
        if (error) {
          console.log(`error: ${error.message}`)
          return
        }
        if (stderr) {
          console.log(`stderr: ${stderr}`)
          // return;
        }
      })
    }

    exec(`yarn add ${packageName}@^0.15.22 --force`, (error, stdout, stderr) => {
      if (error) {
        console.log(`error: ${error.message}`)
        return
      }
      if (stderr) {
        console.log(`stderr: ${stderr}`)
        // return;
      }
      console.log('')
      console.log(`stdout: ${stdout}`)
      console.log('\n')
      console.log(chalk.green.bold(packageName), 'successfuly added!')
      console.log('')
      console.log(
        chalk.dim('Now you can import components like:'),
        'import { Button } from \'smbls'
      )
    })
  })

program
  .command('fetch [destination]')
  .description('Fetch symbols')
  .option('-d, --dev', 'Bypass the local build')
  .option('-v, --verbose', 'Bypass the local build')
  .parse(process.argv)
  .action(async (param, opts) => {
    rc.then(async data => {
      const key = data.key
      const { dev, verbose } = opts

      const endpoint = dev ? API_URL_LOCAL : API_URL

      console.log('Fetching from:', chalk.bold(endpoint))
      console.log('')

      const body = await fetchRemote(key, {
        endpoint,
        onError: (e) => {
          console.log(chalk.red('Failed to fetch:'), key)
          if (verbose) console.error(e)
          else console.log(debugMsg)
        }
      })
      if (!body) return

      const { version, ...config } = body

      if (key) {
        console.log(chalk.bold('Symbols'), 'data fetched for', chalk.green(body.name))
      } else {
        console.log(
          chalk.bold('Symbols'),
          'config fetched from',
          chalk.bold('default-config from:'),
          chalk.dim.underline(DEFAULT_REMOTE_REPOSITORY)
        )
      }
      console.log('')

      for (const t in config) {
        const type = config[t]
        const arr = []
        if (isObjectLike(type)) {
          for (const v in type) arr.push(v)
          if (arr.length) {
            console.log(chalk.dim(t + ':'))
            console.log(chalk.bold(arr.join(', ')))
          } else {
            console.log(chalk.dim(t + ':'), chalk.dim('- empty -'))
          }
        } else console.log(chalk.dim(t + ':'), chalk.bold(type))
      }

      if (body.designsystem) {
        body.designSystem = body.designsystem
        delete body.designsystem
      }

      const bodyString = JSON.stringify(body)

      try {
        fs.writeFileSync(LOCAL_CONFIG_PATH, bodyString)
        if (verbose) {
          console.log('')
          console.log(chalk.dim('dynamic.json has been updated:'))
          console.log(chalk.dim.underline(LOCAL_CONFIG_PATH))
        }

        console.log('')
        console.log(chalk.bold.green('Successfully wrote file'))
      } catch (e) {
        console.log('')
        console.log(chalk.bold.green('Error writing file'))
        if (verbose) console.error(e)
        else console.log(debugMsg)
      }
    })
  })
