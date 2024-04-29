#!/usr/bin/env node

import fs from 'fs'
import chalk from 'chalk'
import { loadModule } from './require.js'
import { program } from './program.js'
import * as fetch from '@symbo.ls/fetch'
import * as utils from '@domql/utils'
import { convertFromCli } from './convert.js'
import { createFs } from './fs.js'

const { isObjectLike } = utils.default
const { fetchRemote } = fetch.default

const RC_PATH = process.cwd() + '/symbols.json'
const LOCAL_CONFIG_PATH =
  process.cwd() + '/node_modules/@symbo.ls/init/dynamic.json'
const DEFAULT_REMOTE_REPOSITORY = 'https://github.com/symbo-ls/default-config/'
const DEFAULT_REMOTE_CONFIG_PATH = "https://api.symbols.app/"; // eslint-disable-line

const API_URL_LOCAL = 'http://localhost:13335/get/'
const API_URL = 'https://api.symbols.app/get/'

const rcFile = loadModule(RC_PATH); // eslint-disable-line
const localConfig = loadModule(LOCAL_CONFIG_PATH); // eslint-disable-line

const debugMsg = chalk.dim(
  'Use --verbose to debug the error or open the issue at https://github.com/symbo-ls/smbls'
)

let rc = {}
try {
  rc = loadModule(RC_PATH); // eslint-disable-line
} catch (e) {
  console.error('Please include symbols.json to your root of respository')
}

export const fetchFromCli = async (opts) => {
  const { dev, verbose, prettify, convert: convertOpt, update } = opts
  await rc.then(async (data) => {
    const { key, framework, distDir } = data

    const endpoint = dev ? API_URL_LOCAL : API_URL

    console.log('\nFetching from:', chalk.bold(endpoint), '\n')

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

    if (verbose) {
      if (key) {
        console.log(
          chalk.bold('Symbols'),
          'data fetched for',
          chalk.green(body.name)
        )
      } else {
        console.log(
          chalk.bold('Symbols'),
          'config fetched from',
          chalk.bold('default-config from:'),
          chalk.dim.underline(DEFAULT_REMOTE_REPOSITORY)
        )
      }
      console.log()
    }

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

    const bodyString = JSON.stringify(body, null, prettify ?? 2)

    try {
      await fs.writeFileSync(LOCAL_CONFIG_PATH, bodyString)

      if (verbose) {
        console.log(chalk.dim('\ndynamic.json has been updated:'))
        console.log(chalk.dim.underline(LOCAL_CONFIG_PATH))
      }

      console.log(chalk.bold.green('\nSuccessfully wrote file'))
    } catch (e) {
      console.log(chalk.bold.red('\nError writing file'))
      if (verbose) console.error(e)
      else console.log(debugMsg)
    }

    if (body.components && convertOpt && framework) {
      convertFromCli(body.components, { ...opts, framework })
    }

    if (update) {
      createFs(body, distDir, update)
    } else {
      createFs(body, distDir)
    }
  })
}

program
  .command('fetch')
  .description('Fetch Symbols')
  .option('-d, --dev', 'Running from local server')
  .option('-v, --verbose', 'Verbose errors and warnings')
  .option('--convert', 'Verbose errors and warnings', true)
  .option('--update', 'overriding changes from platform')
  .option('--verbose-code', 'Verbose errors and warnings')
  .action(fetchFromCli)

// program
//   .command("push")
//   .description("Push changes to platform")
//   .action(fetchFromCli({ cache: true }));
