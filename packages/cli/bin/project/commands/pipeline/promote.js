import chalk from 'chalk'
import { promoteProjectEnvironment } from '../../../../helpers/projectsApi.js'
import { resolveAuthOrExit } from '../../shared.js'
import { resolveWorkspaceProjectIdOrExit } from '../libs/shared.js'
import { formatEnvConfigSummary } from '../environments/utils.js'

export function registerProjectPipelinePromoteCommand (pipelineCmd) {
  pipelineCmd
    .command('promote <from> <to>')
    .description('Promote content between environments (sets target to mode=version)')
    .option('--project <projectKeyOrId>', 'Override project (defaults to linked workspace)')
    .option('--json', 'Output raw JSON', false)
    .action(async (from, to, opts) => {
      const { authToken } = resolveAuthOrExit()
      const projectId = await resolveWorkspaceProjectIdOrExit({ projectArg: opts.project, authToken })

      const body = { from, to }
      const payload = await promoteProjectEnvironment(projectId, body, authToken)

      if (opts.json) {
        console.log(JSON.stringify(payload, null, 2))
        return
      }

      const data = payload?.data || payload || {}
      const nextCfg = data?.config || payload?.config || null
      console.log(chalk.green('Promotion completed.'))
      console.log(chalk.dim(`${String(from)} → ${String(to)}`))
      if (nextCfg) console.log(formatEnvConfigSummary(to, nextCfg))
    })
}
