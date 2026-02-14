import chalk from 'chalk'
import { listProjectLibraries } from '../../../../helpers/projectsApi.js'
import { resolveAuthOrExit } from '../../shared.js'
import { resolveWorkspaceProjectIdOrExit } from './shared.js'

export function registerProjectLibsListCommand (libsCmd) {
  libsCmd
    .command('list')
    .description('List shared libraries linked to this project')
    .option('--project <projectKeyOrId>', 'Override project (defaults to linked workspace)')
    .option('--json', 'Output raw JSON', false)
    .action(async (opts) => {
      const { authToken } = resolveAuthOrExit()
      const projectId = await resolveWorkspaceProjectIdOrExit({ projectArg: opts.project, authToken })

      const payload = await listProjectLibraries(projectId, authToken)
      if (opts.json) {
        console.log(JSON.stringify(payload, null, 2))
        return
      }

      const items = Array.isArray(payload?.items)
        ? payload.items
        : (Array.isArray(payload) ? payload : (payload?.data || payload?.libraries || []))

      if (!items.length) {
        console.log(chalk.dim('No libraries linked to this project.'))
        return
      }

      for (const lib of items) {
        const name = lib?.name || ''
        const key = lib?.key || ''
        const id = lib?.id || lib?._id || ''
        console.log(`${chalk.bold(name || key || id)}  ${chalk.cyan(key || '')}  ${chalk.dim(id || '')}`.trim())
      }
    })
}
