import path from 'path'
import chalk from 'chalk'

import { loadModule } from '../../require.js'
import { buildDirectory } from '../../../helpers/fileUtils.js'
import { loadCliConfig } from '../../../helpers/config.js'
import { loadSymbolsConfig, resolveDistDir } from '../../../helpers/symbolsConfig.js'
import {
  augmentProjectWithLocalPackageDependencies,
  ensureSchemaDependencies,
  findNearestPackageJson
} from '../../../helpers/dependenciesUtils.js'
import { stripOrderFields } from '../../../helpers/orderUtils.js'
import { stringifyFunctionsForTransport } from '../../../helpers/transportUtils.js'
import { stripEmptyDefaultNamespaceEntries } from '../../../helpers/projectNormalization.js'
import { loadGitHubLink } from '../../../helpers/githubLink.js'
import { postGitHubConnectorSync } from '../../../helpers/githubSyncApi.js'
import { showBuildErrorMessages } from '../../../helpers/buildMessages.js'

async function buildLocalProject (distDir) {
  const outputDirectory = path.join(distDir, 'dist')
  await buildDirectory(distDir, outputDirectory)
  const outputFile = path.join(outputDirectory, 'index.js')
  return await loadModule(outputFile, { silent: false })
}

function splitBuiltState (projectObj) {
  const schema = projectObj?.schema && typeof projectObj.schema === 'object' ? projectObj.schema : {}
  const data = { ...(projectObj || {}) }
  delete data.schema
  return { data, schema }
}

export function registerGitHubSyncCommand (githubCmd) {
  githubCmd
    .command('sync')
    .description('Build full project state and upload to Symbols via GitHub connector sync endpoint')
    .option('--server <url>', 'Symbols API base URL (defaults to config/env)')
    .option('--connector <id>', 'GitHub connector id (defaults to .symbols/github.json)')
    .option('--repository <owner/repo>', 'GitHub repository full name')
    .option('--branch <branch>', 'Git branch name')
    .option('--commit <sha>', 'Git commit SHA')
    .option('--event <name>', 'Event name (push|pull_request|merge)', 'push')
    .option('--run-id <id>', 'Runner run id')
    .option('--run-attempt <n>', 'Runner run attempt', (v) => parseInt(v, 10))
    .option('--api-key <key>', 'Symbols Integration API key (or use env SYMBOLS_API_KEY)')
    .option('-v, --verbose', 'Verbose output', false)
    .action(async (options) => {
      try {
        const cliConfig = loadCliConfig()
        const link = loadGitHubLink() || {}

        const apiBaseUrl = options.server || process.env.SYMBOLS_API_BASE_URL || cliConfig.apiBaseUrl || link.apiBaseUrl
        const connectorId = options.connector || process.env.SYMBOLS_CONNECTOR_ID || link.connectorId
        const apiKey = options.apiKey || process.env.SYMBOLS_API_KEY

        const repository = options.repository || process.env.GITHUB_REPOSITORY || link.repository
        const branch = options.branch || process.env.GITHUB_REF_NAME || cliConfig.branch || 'main'
        const commitSha = options.commit || process.env.GITHUB_SHA

        if (!apiBaseUrl) throw new Error('Missing --server (SYMBOLS_API_BASE_URL) / config apiBaseUrl')
        if (!connectorId) throw new Error('Missing --connector (SYMBOLS_CONNECTOR_ID) / .symbols/github.json')
        if (!apiKey) throw new Error('Missing SYMBOLS_API_KEY (Integration API key)')
        if (!repository) throw new Error('Missing --repository (GITHUB_REPOSITORY)')
        if (!commitSha) throw new Error('Missing --commit (GITHUB_SHA)')

        const symbolsConfig = loadSymbolsConfig() || {}
        const distDir = resolveDistDir(symbolsConfig) || path.join(process.cwd(), 'smbls')
        const packageJsonPath = findNearestPackageJson(process.cwd())

        if (options.verbose) {
          console.log(chalk.dim('GitHub sync configuration:'), {
            apiBaseUrl,
            connectorId,
            repository,
            branch,
            commitSha: String(commitSha).slice(0, 12)
          })
        } else {
          console.log(chalk.dim('Building project...'))
        }

        let localProject = await buildLocalProject(distDir)
        localProject = augmentProjectWithLocalPackageDependencies(localProject, packageJsonPath) || localProject
        localProject = stripOrderFields(localProject)
        localProject = stripEmptyDefaultNamespaceEntries(localProject)
        ensureSchemaDependencies(localProject)

        const built = stringifyFunctionsForTransport(localProject || {})
        const { data, schema } = splitBuiltState(built)

        const payload = {
          repository,
          branch,
          commitSha,
          event: {
            name: options.event,
            runId: options.runId,
            runAttempt: options.runAttempt
          },
          builtState: { data, schema }
        }

        console.log(chalk.dim('Uploading to Symbols...'))
        const resp = await postGitHubConnectorSync({
          apiBaseUrl,
          connectorId,
          apiKey,
          payload
        })

        console.log(chalk.bold.green('Sync uploaded successfully'))
        if (options.verbose) {
          console.log(chalk.gray(JSON.stringify(resp, null, 2)))
        }
      } catch (err) {
        showBuildErrorMessages(err)
        console.error(chalk.bold.red('\nGitHub sync failed:'), chalk.white(err.message))
        process.exit(1)
      }
    })
}
