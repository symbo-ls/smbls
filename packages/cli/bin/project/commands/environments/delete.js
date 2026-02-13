import chalk from 'chalk'
import { deleteProjectEnvironment } from '../../../../helpers/projectsApi.js'
import { confirmPrompt } from '../../../../helpers/projectPrompts.js'
import { resolveAuthOrExit } from '../../shared.js'
import { resolveWorkspaceProjectIdOrExit } from '../libs/shared.js'

export function registerProjectEnvironmentsDeleteCommand (envCmd) {
  envCmd
    .command('delete <envKey>')
    .description('Delete an environment slot')
    .option('--project <projectKeyOrId>', 'Override project (defaults to linked workspace)')
    .option('--yes', 'Skip confirmation prompt', false)
    .option('--json', 'Output raw JSON', false)
    .action(async (envKey, opts) => {
      const { authToken } = resolveAuthOrExit()
      const projectId = await resolveWorkspaceProjectIdOrExit({ projectArg: opts.project, authToken })

      if (!opts.yes) {
        const ok = await confirmPrompt(`Delete environment "${envKey}" from project ${projectId}?`, false)
        if (!ok) {
          console.log(chalk.dim('Cancelled.'))
          return
        }
      }

      const payload = await deleteProjectEnvironment(projectId, envKey, authToken)

      if (opts.json) {
        console.log(JSON.stringify(payload, null, 2))
        return
      }

      const key = payload?.key || payload?.data?.key || envKey
      console.log(chalk.green('Deleted environment:'), chalk.bold(String(key)))
    })
}
