import fs from 'fs'
import chalk from 'chalk'

import { ensureAuthenticated } from '../../../helpers/authEnsure.js'
import { loadCliConfig } from '../../../helpers/config.js'
import { createIntegration, createIntegrationApiKey } from '../../../helpers/integrationsApi.js'
import { createGitHubConnector } from '../../../helpers/connectorsApi.js'
import { saveGitHubLink } from '../../../helpers/githubLink.js'

export function registerGitHubConnectCommand (githubCmd) {
  githubCmd
    .command('connect')
    .description('Create Integration + API key + GitHub connector for this project')
    .requiredOption('-r, --repository <owner/repo>', 'GitHub repository full name (owner/repo)')
    .option('--project-id <projectId>', 'Project ID (defaults to linked .symbols/config.json)')
    .option('--integration-name <name>', 'Integration display name', 'GitHub')
    .option('--environment <env>', 'API key environment (test|live)', 'test')
    .option('--non-interactive', 'Fail instead of prompting for login', false)
    .action(async (options) => {
      const cliConfig = loadCliConfig()
      const projectId = options.projectId || cliConfig.projectId
      if (!projectId) {
        console.error(chalk.red('Missing projectId. Link this folder first: `smbls project link .`'))
        process.exit(1)
      }

      const repository = String(options.repository || '').trim()
      if (!repository || !repository.includes('/')) {
        console.error(chalk.red('Invalid repository. Expected: owner/repo'))
        process.exit(1)
      }

      const environment = options.environment === 'live' ? 'live' : 'test'

      const { apiBaseUrl, authToken } = await ensureAuthenticated({
        apiBaseUrl: cliConfig.apiBaseUrl,
        nonInteractive: options.nonInteractive
      })

      console.log(chalk.dim('Creating integration...'))
      const integration = await createIntegration({
        name: options.integrationName,
        ownerType: 'project',
        ownerProject: projectId
      }, authToken, apiBaseUrl)

      console.log(chalk.dim('Creating CI API key...'))
      const keyResp = await createIntegrationApiKey(integration._id || integration.id, {
        name: `GitHub Actions (${repository})`,
        environment,
        scopes: ['connectors:github:sync']
      }, authToken, apiBaseUrl)

      const apiKey = keyResp?.key
      if (!apiKey) {
        console.error(chalk.red('API key creation succeeded but no key was returned by server'))
        process.exit(1)
      }

      console.log(chalk.dim('Creating GitHub connector...'))
      const connectorResp = await createGitHubConnector(integration._id || integration.id, {
        projectId,
        repository,
        allowedEvents: ['push', 'pull_request']
      }, authToken, apiBaseUrl)

      const connector = connectorResp?.connector || connectorResp
      const connectorId = connector?._id || connector?.id
      if (!connectorId) {
        console.error(chalk.red('Failed to create connector (missing connector id in response)'))
        process.exit(1)
      }

      saveGitHubLink({
        apiBaseUrl,
        projectId,
        integrationId: integration._id || integration.id,
        connectorId,
        repository
      })

      console.log(chalk.bold.green('\nGitHub connector created.'))
      console.log(chalk.gray(`- Server: ${chalk.cyan(apiBaseUrl)}`))
      console.log(chalk.gray(`- Project ID: ${chalk.cyan(projectId)}`))
      console.log(chalk.gray(`- Repository: ${chalk.cyan(repository)}`))
      console.log(chalk.gray(`- Connector ID: ${chalk.cyan(connectorId)}`))

      console.log(chalk.bold('\nNext steps'))
      console.log(chalk.gray('1) Add a GitHub Actions secret to your repo/org:'))
      console.log(chalk.cyan('\n   SYMBOLS_API_KEY\n'))
      console.log(chalk.gray('   Value (shown once):'))
      console.log(chalk.cyan(`\n   ${apiKey}\n`))
      console.log(chalk.gray('2) Generate the workflow file:'))
      console.log(chalk.cyan('   smbls github init-actions'))
      console.log(chalk.gray('3) Install the Symbols GitHub App on the repo/org (for webhooks/audit).'))

      // Best-effort: avoid leaving the key in terminal scrollback in CI logs
      if (!process.stdout.isTTY) {
        try { fs.writeFileSync('/dev/null', '') } catch (_) {}
      }
    })
}
