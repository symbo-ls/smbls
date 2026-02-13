import chalk from 'chalk'
import { listProjectMembers } from '../../../../helpers/projectsApi.js'
import { resolveAuthOrExit } from '../../shared.js'
import { resolveWorkspaceProjectIdOrExit } from '../libs/shared.js'

function pickItems (payload) {
  if (Array.isArray(payload?.items)) return payload.items
  if (Array.isArray(payload?.data)) return payload.data
  if (Array.isArray(payload)) return payload
  return payload?.members || payload?.data || []
}

export function registerProjectMembersListCommand (membersCmd) {
  membersCmd
    .command('list')
    .description('List members of a project')
    .option('--project <projectKeyOrId>', 'Override project (defaults to linked workspace)')
    .option('--page <n>', 'Page number', (v) => parseInt(v, 10), 1)
    .option('--limit <n>', 'Page size', (v) => parseInt(v, 10), 20)
    .option('--json', 'Output raw JSON', false)
    .action(async (opts) => {
      const { authToken } = resolveAuthOrExit()
      const projectId = await resolveWorkspaceProjectIdOrExit({ projectArg: opts.project, authToken })
      const payload = await listProjectMembers(projectId, { page: opts.page, limit: opts.limit }, authToken)

      if (opts.json) {
        console.log(JSON.stringify(payload, null, 2))
        return
      }

      const items = pickItems(payload)
      if (!items.length) {
        console.log(chalk.dim('No project members found.'))
        return
      }

      for (const m of items) {
        const user = m?.user || {}
        const name = user?.name || user?.username || ''
        const email = user?.email || ''
        const role = m?.role || ''
        const id = m?.id || m?._id || ''
        const label = name || email || id
        console.log(`${chalk.bold(label)}  ${chalk.cyan(email)}  ${chalk.dim(role)}  ${chalk.dim(id)}`.trim())
      }
    })
}
