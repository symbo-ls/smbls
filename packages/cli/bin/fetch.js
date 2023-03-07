#!/usr/bin/env node

import fs from 'fs'
import chalk from 'chalk'
import { loadModule } from './require.js'
import { exec } from 'child_process'
import { program } from './program.js'

import fetch from '@symbo.ls/fetch'
const { fetchRemote } = fetch

const PACKAGE_PATH = process.cwd() + '/package.json'
const RC_PATH = process.cwd() + '/symbols.json'
const LOCAL_CONFIG_PATH = process.cwd() + '/node_modules/@symbo.ls/init/dynamic.json'
const DEFAULT_REMOTE_REPOSITORY = 'https://github.com/symbo-ls/default-config/'
const DEFAULT_REMOTE_CONFIG_PATH = 'https://api.symbols.dev/'

const API_URL = 'https://api.symbols.dev/' // eslint-disable-line

const pkg = loadModule(PACKAGE_PATH)
const rc_file = loadModule(RC_PATH) // eslint-disable-line
const local_config = loadModule(LOCAL_CONFIG_PATH) // eslint-disable-line

let rc = {}
try {
  rc = loadModule(RC_PATH) // eslint-disable-line
} catch (e) { console.error('Please include symbols.json to your root of respository') }

program
  .version(pkg.version)

program
  .command('install')
  .description('Install Symbols')
  .option('--framework', 'Which Symbols to install (domql, react)')
  .action(async (framework) => {
    // const packageName = `@symbo.ls/${mode || 'uikit'}`
    const packageName = 'smbls'
    console.log('Adding', chalk.green.bold(packageName))

    if (framework === 'domql' || rc_file.framework === 'domql') {
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
      console.log(chalk.dim('Now you can import components like:'), `import { Button } from 'smbls`)
    })
  })

program
  .command('fetch [destination]')
  .description('Fetch symbols')
  .action(async (options) => {
    rc.then(async data => {
      const opts = { ...data, ...options }
      const key = data.key || options.key

      const body = await fetchRemote(key, { endpoint: 'api.symbols.dev' })
      const { version, ...config } = body

      console.log(chalk.bold('Symbols'), 'config fetched:')
      if (key) console.log(chalk.green(key))
      else console.log(chalk.dim('- Default config from:'), chalk.dim.underline(DEFAULT_REMOTE_REPOSITORY))
      console.log('')

      console.log(chalk.dim('- symbols.json created:'), chalk.dim.underline(LOCAL_CONFIG_PATH))
      console.log('')

      for (const t in config) {
        const type = config[t]
        console.log(chalk.bold(t))
        const arr = []
        for (const v in type) arr.push(v)
        console.log('  ', chalk.dim(arr.join(', ')))
      }

      const bodyString = JSON.stringify(body)
      fs.writeFile(LOCAL_CONFIG_PATH, bodyString, err => {
        console.log('')
        if (err) {
          console.log('Error writing file', err)
        } else {
          console.log('Successfully wrote file')
        }
      })
    })
  })
