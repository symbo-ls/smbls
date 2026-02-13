import chalk from 'chalk'
import { getProjectVersion } from '../../../../helpers/projectsApi.js'
import { resolveAuthOrExit } from '../../shared.js'
import { resolveWorkspaceProjectIdOrExit } from '../libs/shared.js'

export function registerProjectVersionsGetCommand (versionsCmd) {
  versionsCmd
    .command('get <versionId>')
    .description('Fetch a specific version by id (or server-supported identifier)')
    .option('--project <projectKeyOrId>', 'Override project (defaults to linked workspace)')
    .option('--branch <branch>', 'Branch name (if server supports it)', 'main')
    .option('--json', 'Output raw JSON', false)
    .action(async (versionId, opts) => {
      const { authToken } = resolveAuthOrExit()
      const projectId = await resolveWorkspaceProjectIdOrExit({ projectArg: opts.project, authToken })
      const payload = await getProjectVersion(projectId, versionId, { branch: opts.branch }, authToken)

      if (opts.json) {
        console.log(JSON.stringify(payload, null, 2))
        return
      }

      // Best-effort friendly output.
      const v = payload?.data || payload
      const value = v?.value || v?.version || versionId
      const message = v?.message || ''
      const branch = v?.branch || ''
      const createdAt = v?.createdAt ? new Date(v.createdAt).toISOString() : ''
      const id = v?.id || v?._id || ''

      console.log(chalk.bold(value))
      if (branch) console.log('branch:', chalk.cyan(branch))
      if (createdAt) console.log('createdAt:', chalk.dim(createdAt))
      if (message) console.log('message:', message)
      if (id) console.log('id:', chalk.dim(id))
    })
}
