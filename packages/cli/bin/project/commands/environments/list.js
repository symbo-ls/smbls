import chalk from 'chalk'
import { listProjectEnvironments } from '../../../../helpers/projectsApi.js'
import { resolveAuthOrExit } from '../../shared.js'
import { resolveWorkspaceProjectIdOrExit } from '../libs/shared.js'
import { pickEnvironmentsData, formatEnvConfigSummary } from './utils.js'

export function registerProjectEnvironmentsListCommand (envCmd) {
  envCmd
    .command('list')
    .description('List environment slots for a project')
    .option('--project <projectKeyOrId>', 'Override project (defaults to linked workspace)')
    .option('--json', 'Output raw JSON', false)
    .action(async (opts) => {
      const { authToken } = resolveAuthOrExit()
      const projectId = await resolveWorkspaceProjectIdOrExit({ projectArg: opts.project, authToken })

      const payload = await listProjectEnvironments(projectId, authToken)
      if (opts.json) {
        console.log(JSON.stringify(payload, null, 2))
        return
      }

      const data = pickEnvironmentsData(payload)
      const envs = data?.environments || {}
      const keys = Object.keys(envs)

      const limit = data?.limit
      const enabledCount = data?.enabledCount
      const activation = data?.activation || {}

      if (limit !== undefined) console.log('limit:', chalk.cyan(String(limit)))
      if (enabledCount !== undefined) console.log('enabledCount:', chalk.cyan(String(enabledCount)))
      if (activation?.active !== undefined) {
        console.log('multiEnvironment:', activation.active ? chalk.green('active') : chalk.dim('inactive'))
      }
      if (activation?.wildcard?.hostname) {
        console.log('wildcard:', chalk.dim(String(activation.wildcard.hostname)))
      }

      if (!keys.length) {
        console.log(chalk.dim('No environments configured.'))
        return
      }

      for (const k of keys.sort()) {
        console.log(formatEnvConfigSummary(k, envs[k]))
      }
    })
}
