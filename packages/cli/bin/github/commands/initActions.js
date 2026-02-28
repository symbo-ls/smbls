import fs from 'fs'
import path from 'path'
import chalk from 'chalk'

import { loadGitHubLink } from '../../../helpers/githubLink.js'

function workflowYaml ({ apiBaseUrl, connectorId, repository }) {
  const syncUrl = `${apiBaseUrl.replace(/\/+$/, '')}/core/connectors/github/${connectorId}/sync`
  return `name: smbls-sync
on:
  push:
    branches: ["**"]
permissions:
  contents: read

jobs:
  sync:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Install smbls
        run: npm i -g @symbo.ls/cli

      - name: Sync to Symbols
        env:
          SYMBOLS_API_BASE_URL: ${apiBaseUrl}
          SYMBOLS_CONNECTOR_ID: ${connectorId}
          SYMBOLS_API_KEY: \${{ secrets.SYMBOLS_API_KEY }}
          GITHUB_REPOSITORY: \${{ github.repository }}
          GITHUB_SHA: \${{ github.sha }}
          GITHUB_REF_NAME: \${{ github.ref_name }}
          GITHUB_RUN_ID: \${{ github.run_id }}
          GITHUB_RUN_ATTEMPT: \${{ github.run_attempt }}
        run: |
          smbls github sync \\
            --server "$SYMBOLS_API_BASE_URL" \\
            --connector "$SYMBOLS_CONNECTOR_ID" \\
            --repository "$GITHUB_REPOSITORY" \\
            --branch "$GITHUB_REF_NAME" \\
            --commit "$GITHUB_SHA" \\
            --event push \\
            --run-id "$GITHUB_RUN_ID" \\
            --run-attempt "$GITHUB_RUN_ATTEMPT"

      - name: Debug (sync endpoint)
        if: \${{ failure() }}
        run: echo "Sync endpoint was: ${syncUrl} (repo=${repository})"
`
}

export function registerGitHubInitActionsCommand (githubCmd) {
  githubCmd
    .command('init-actions')
    .description('Generate a GitHub Actions workflow that runs `smbls github sync` on push')
    .option('-f, --force', 'Overwrite existing workflow file', false)
    .action(async (options) => {
      const link = loadGitHubLink()
      if (!link) {
        console.error(chalk.red('No GitHub link found. Run `smbls github connect` first.'))
        process.exit(1)
      }

      const workflowsDir = path.join(process.cwd(), '.github', 'workflows')
      const filePath = path.join(workflowsDir, 'smbls-sync.yml')

      if (fs.existsSync(filePath) && !options.force) {
        console.error(chalk.red(`Workflow already exists at ${filePath}. Use --force to overwrite.`))
        process.exit(1)
      }

      fs.mkdirSync(workflowsDir, { recursive: true })
      fs.writeFileSync(filePath, workflowYaml(link), 'utf8')

      console.log(chalk.bold.green('\nWorkflow written:'))
      console.log(chalk.gray(filePath))
      console.log(chalk.bold('\nRequired GitHub secret:'))
      console.log(chalk.cyan('SYMBOLS_API_KEY'))
    })
}
