#!/usr/bin/env node

import fs from 'fs'
import chalk from 'chalk'
import { loadModule } from './require.js'
import { exec } from 'child_process'
import { program } from './program.js'

import * as fetch from '@symbo.ls/fetch'
const { fetchRemote } = fetch.default

const PACKAGE_PATH = process.cwd() + '/package.json'
const RC_PATH = process.cwd() + '/symbols.json'
const LOCAL_CONFIG_PATH = process.cwd() + '/node_modules/@symbo.ls/init/dynamic.json'
const DEFAULT_REMOTE_REPOSITORY = 'https://github.com/symbo-ls/default-config/'
const DEFAULT_REMOTE_CONFIG_PATH = 'https://api.symbols.app/' // eslint-disable-line

const API_URL = 'https://api.symbols.app/' // eslint-disable-line

const pkg = loadModule(PACKAGE_PATH)
const rcFile = loadModule(RC_PATH) // eslint-disable-line
const localConfig = loadModule(LOCAL_CONFIG_PATH) // eslint-disable-line

let rc = {}
try {
  rc = loadModule(RC_PATH) // eslint-disable-line
} catch (e) { console.error('Please include symbols.json to your root of respository') }

program
  .version(pkg.version ?? 'unknown')

program
  .command('install')
  .description('Install Symbols')
  .option('--framework', 'Which Symbols to install (domql, react)')
  .action(async (framework) => {
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
      console.log(chalk.dim('Now you can import components like:'), 'import { Button } from \'smbls')
    })
  })

program
  .command('fetch [destination]')
  .description('Fetch symbols')
  .action(async (options) => {
    rc.then(async data => {
      const opts = { ...data, ...options } // eslint-disable-line
      const key = data.key || (options && options.key)

      const body = await fetchRemote(key, {
        endpoint: 'http://localhost:8080/'
      })
      const { version, ...config } = body

      console.log(chalk.bold('Symbols'), 'config fetched:')
      if (key) console.log(chalk.green(key))
      else console.log(chalk.dim('- Default config from:'), chalk.dim.underline(DEFAULT_REMOTE_REPOSITORY))
      console.log('')

      for (const t in config) {
        const type = config[t]
        console.log(chalk.bold(t))
        const arr = []
        for (const v in type) arr.push(v)
        console.log('  ', chalk.dim(arr.join(', ')))
      }

      if (body.designsystem) {
        body.designSystem = body.designsystem
        delete body.designsystem
      }
      const bodyString = JSON.stringify(body)

      try {
        fs.writeFileSync(LOCAL_CONFIG_PATH, bodyString)
        console.log(chalk.dim('- dynamic.json updated:'), chalk.dim.underline(LOCAL_CONFIG_PATH))
        console.log('')

        console.log('Successfully wrote file')
      } catch (e) {
        console.log('Error writing file', e)
      }
    })
  })
