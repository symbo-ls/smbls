import chalk from 'chalk'
import { publishProjectToEnvironment } from '../../../../helpers/projectsApi.js'
import { resolveAuthOrExit } from '../../shared.js'
import { resolveWorkspaceProjectIdOrExit } from '../libs/shared.js'
import { formatEnvConfigSummary } from './utils.js'

export function registerProjectEnvironmentsPublishCommand (envCmd) {
  envCmd
    .command('publish <envKey>')
    .description('Publish a project to an environment (updates env effective mode)')
    .option('--project <projectKeyOrId>', 'Override project (defaults to linked workspace)')
    .requiredOption('--mode <mode>', 'Mode: latest|published|version|branch')
    .option('--version <version>', 'Version value (required for mode=version)')
    .option('--branch <branch>', 'Branch name (meaningful for mode=branch)')
    .option('--json', 'Output raw JSON', false)
    .action(async (envKey, opts) => {
      const { authToken } = resolveAuthOrExit()
      const projectId = await resolveWorkspaceProjectIdOrExit({ projectArg: opts.project, authToken })

      const mode = String(opts.mode || '').trim()
      if (!['latest', 'published', 'version', 'branch'].includes(mode)) {
        console.error(chalk.red('Invalid --mode. Use: latest|published|version|branch'))
        process.exit(1)
      }
      if (mode === 'version' && !opts.version) {
        console.error(chalk.red('Missing --version (required when --mode=version).'))
        process.exit(1)
      }

      const body = { mode }
      if (opts.version !== undefined) body.version = opts.version
      if (opts.branch !== undefined) body.branch = opts.branch

      const payload = await publishProjectToEnvironment(projectId, envKey, body, authToken)

      if (opts.json) {
        console.log(JSON.stringify(payload, null, 2))
        return
      }

      const key = payload?.key || payload?.data?.key || envKey
      const cfg = payload?.config || payload?.data?.config || null
      console.log(chalk.green('Published to environment.'))
      if (cfg) console.log(formatEnvConfigSummary(key, cfg))
      else console.log(chalk.bold(key))
    })
}
