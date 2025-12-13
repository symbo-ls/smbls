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
import { loadSymbolsConfig, resolveDistDir } from '../helpers/symbolsConfig.js'
import { loadCliConfig, readLock, writeLock, updateLegacySymbolsJson, getConfigPaths } from '../helpers/config.js'
const { isObjectLike } = (utils.default || utils)

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
  const { framework } = symbolsConfig

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
      process.exit(1)
    }

    // Persist base snapshot for future rebases
    try {
      const { projectPath } = getConfigPaths()
      await fs.promises.mkdir(path.dirname(projectPath), { recursive: true })
      await fs.promises.writeFile(projectPath, JSON.stringify(payload, null, 2))
    } catch (e) {
      console.error(chalk.bold.red('\nError writing file'))
      if (verbose) console.error(e)
      else console.log(debugMsg)
      process.exit(1)
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

    // Resolve effective distDir from CLI flag or symbols.json, with a sane default
    const distDir =
      resolveDistDir(symbolsConfig, {
        distDirOverride: opts.distDir
      }) ||
      path.join(process.cwd(), 'smbls')

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
  .option('--dist-dir <dir>', 'Directory to import files to.')
  .action(fetchFromCli)
