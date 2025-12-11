#!/usr/bin/env node

import fs from 'fs'
import path from 'path'
import chalk from 'chalk'
import { program } from './program.js'
import * as utils from '@domql/utils'
import { convertFromCli } from './convert.js'
import { createFs } from './fs.js'
import { CredentialManager } from '../helpers/credentialManager.js'
import { getCurrentProjectData } from '../helpers/apiUtils.js'
import { showAuthRequiredMessages } from '../helpers/buildMessages.js'
import { loadSymbolsConfig } from '../helpers/symbolsConfig.js'
import { loadCliConfig, readLock, writeLock, updateLegacySymbolsJson, getConfigPaths } from '../helpers/config.js'
const { isObjectLike } = (utils.default || utils)

const RC_PATH = process.cwd() + '/symbols.json'
const LOCAL_CONFIG_PATH =
  process.cwd() + '/node_modules/@symbo.ls/init/dynamic.json'
const DEFAULT_REMOTE_REPOSITORY = 'https://github.com/symbo-ls/default-config/'

const debugMsg = chalk.dim(
  'Use --verbose to debug the error or open the issue at https://github.com/symbo-ls/smbls'
)

export const fetchFromCli = async (opts) => {
  const { dev, verbose, prettify, convert: convertOpt, metadata: metadataOpt, update, force } = opts

  const symbolsConfig = await loadSymbolsConfig()
  const cliConfig = loadCliConfig()
  const credManager = new CredentialManager()
  const authToken = credManager.ensureAuthToken(cliConfig.apiBaseUrl)

  if (!authToken) {
    showAuthRequiredMessages()
    process.exit(1)
  }

  const projectKey = cliConfig.projectKey || symbolsConfig.key
  const branch = cliConfig.branch || symbolsConfig.branch || 'main'
  const { framework, distDir, metadata } = symbolsConfig

    console.log('\nFetching project data...\n')

    let payload
    try {
      const lock = readLock()
      const result = await getCurrentProjectData(
        { projectKey, projectId: lock.projectId },
        authToken,
        { branch, includePending: true, etag: lock.etag }
      )

      if (result.notModified) {
        console.log(chalk.bold.green('Already up to date (ETag matched)'))
        return
      }

      payload = result.data || {}
      const etag = result.etag || null

      // Update lock.json
      writeLock({
        etag,
        version: payload.version,
        branch,
        projectId: payload?.projectInfo?.id || lock.projectId,
        pulledAt: new Date().toISOString()
      })

      // Update legacy symbols.json with version and branch
      updateLegacySymbolsJson({ ...(symbolsConfig || {}), version: payload.version, branch })

      if (verbose) {
        console.log(chalk.gray(`Version: ${chalk.cyan(payload.version)}`))
        console.log(chalk.gray(`Branch: ${chalk.cyan(branch)}\n`))
      }
    } catch (e) {
      console.log(chalk.red('Failed to fetch:'), projectKey)
      if (verbose) console.error(e)
      else console.log(debugMsg)
      return
    }

    // Persist base snapshot for future rebases
    try {
      const { projectPath } = getConfigPaths()
      await fs.promises.mkdir(path.dirname(projectPath), { recursive: true })
      await fs.promises.writeFile(projectPath, JSON.stringify(payload, null, 2))
    } catch (_) {}

    if (verbose) {
      if (projectKey) {
        console.log(
          chalk.bold('Symbols'),
          'data fetched for',
          chalk.green(payload.name)
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

    const { version: fetchedVersion, ...config } = payload

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
      const bodyString = JSON.stringify(payload, null, prettify ?? 2)

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
      console.warn(
        'No --dist-dir option or "distDir" in symbols.json provided. Saving in ./node_modules/@symbo.ls/init/dynamic.json.'
      )
      return {}
    }

    if (payload.components && convertOpt && framework) {
      convertFromCli(payload.components, { ...opts, framework })
    }

    if (update || force) {
      createFs(payload, distDir, { update: true, metadata: false })
    } else {
      createFs(payload, distDir, { metadata: false })
    }
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
