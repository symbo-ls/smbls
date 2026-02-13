import chalk from 'chalk'
import { listProjectVersions } from '../../../../helpers/projectsApi.js'
import { resolveAuthOrExit } from '../../shared.js'
import { resolveWorkspaceProjectIdOrExit } from '../libs/shared.js'

function pickItems (payload) {
  if (Array.isArray(payload?.items)) return payload.items
  if (Array.isArray(payload?.data)) return payload.data
  if (Array.isArray(payload)) return payload
  return payload?.versions || payload?.data || []
}

function pickVersionId (v) {
  return v?.id || v?._id || ''
}

export function registerProjectVersionsListCommand (versionsCmd) {
  versionsCmd
    .command('list')
    .description('List versions of a project')
    .option('--project <projectKeyOrId>', 'Override project (defaults to linked workspace)')
    .option('--branch <branch>', 'Branch name', 'main')
    .option('--page <n>', 'Page number', (v) => parseInt(v, 10), 1)
    .option('--limit <n>', 'Page size', (v) => parseInt(v, 10), 20)
    .option('--json', 'Output raw JSON', false)
    .action(async (opts) => {
      const { authToken } = resolveAuthOrExit()
      const projectId = await resolveWorkspaceProjectIdOrExit({ projectArg: opts.project, authToken })

      const payload = await listProjectVersions(
        projectId,
        { branch: opts.branch, page: opts.page, limit: opts.limit },
        authToken
      )

      if (opts.json) {
        console.log(JSON.stringify(payload, null, 2))
        return
      }

      const items = pickItems(payload)
      if (!items.length) {
        console.log(chalk.dim('No versions found.'))
        return
      }

      for (const v of items) {
        const value = v?.value || v?.version || ''
        const branch = v?.branch || ''
        const message = String(v?.message || '')
        const createdAt = v?.createdAt && new Date(v.createdAt).toISOString()
        const id = pickVersionId(v)
        const parts = [
          chalk.bold(value || id || '(version)'),
          branch && chalk.cyan(branch),
          createdAt && chalk.dim(createdAt),
          message,
          id && chalk.dim(id)
        ].filter(Boolean)
        console.log(parts.join('  '))
      }
    })
}
