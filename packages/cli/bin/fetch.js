#!/usr/bin/env node

import fs from 'fs'
import chalk from 'chalk'
import { program } from './program.js'
import * as utils from '@domql/utils'
import { convertFromCli } from './convert.js'
import { createFs } from './fs.js'
import { CredentialManager } from './login.js'
import { getProjectDataFromSymStory } from '../helpers/apiUtils.js'
const { isObjectLike } = (utils.default || utils)

const RC_PATH = process.cwd() + '/symbols.json'
const LOCAL_CONFIG_PATH =
  process.cwd() + '/node_modules/@symbo.ls/init/dynamic.json'
const DEFAULT_REMOTE_REPOSITORY = 'https://github.com/symbo-ls/default-config/'

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
  const { dev, verbose, prettify, convert: convertOpt, metadata: metadataOpt, update, force } = opts

  const credManager = new CredentialManager()
  const authToken = credManager.getAuthToken()

  if (!authToken) {
    console.error(chalk.red('Please login first using: smbls login'))
    process.exit(1)
  }

  await rc.then(async (data) => {
    const { key, framework, distDir, metadata, branch = 'main' } = data

    console.log('\nFetching project data...\n')

    let body
    try {
      body = await getProjectDataFromSymStory(key, authToken, branch)
      // Update symbols.json with version and branch info
      const updatedConfig = { ...data, version: body.version, branch }
      await fs.promises.writeFile(RC_PATH, JSON.stringify(updatedConfig, null, 2))

      if (verbose) {
        console.log(chalk.gray(`Version: ${chalk.cyan(body.version)}`))
        console.log(chalk.gray(`Branch: ${chalk.cyan(branch)}\n`))
      }
    } catch (e) {
      console.log(chalk.red('Failed to fetch:'), key)
      if (verbose) console.error(e)
      else console.log(debugMsg)
      return
    }

    if (body.designsystem) {
      body.designSystem = body.designsystem
      delete body.designsystem
    }

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

    const { version: fetchedVersion, ...config } = body

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

    if (!distDir) {
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

      console.log()
      console.warn('No --dist-dir option or "distDir" in symbols.json provided. Saving in ./node_modules/@symbo.ls/init/dynamic.json.')
      return {}
    }

    if (body.components && convertOpt && framework) {
      convertFromCli(body.components, { ...opts, framework })
    }

    if (update || force) {
      createFs(body, distDir, { update: true, metadata })
    } else {
      createFs(body, distDir, { metadata })
    }
  })
}

program
  .command('fetch')
  .description('Fetch Symbols')
  .option('-d, --dev', 'Running from local server')
  .option('-v, --verbose', 'Verbose errors and warnings')
  .option('--convert', 'Verbose errors and warnings', true)
  .option('--metadata', 'Include metadata', false)
  .option('--force', 'Force overriding changes from platform')
  .option('--update', 'Overriding changes from platform')
  .option('--verbose-code', 'Verbose errors and warnings')
  .option('--dist-dir', 'Directory to import files to.')
  .action(fetchFromCli)
