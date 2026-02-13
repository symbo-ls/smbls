import { getLatestProjectVersion } from '../../../../helpers/projectsApi.js'
import { resolveAuthOrExit } from '../../shared.js'
import { resolveWorkspaceProjectIdOrExit } from '../libs/shared.js'

export function registerProjectVersionsLatestCommand (versionsCmd) {
  versionsCmd
    .command('latest')
    .description('Get latest version for a project')
    .option('--project <projectKeyOrId>', 'Override project (defaults to linked workspace)')
    .option('--branch <branch>', 'Branch name', 'main')
    .option('--json', 'Output raw JSON', false)
    .action(async (opts) => {
      const { authToken } = resolveAuthOrExit()
      const projectId = await resolveWorkspaceProjectIdOrExit({ projectArg: opts.project, authToken })
      const payload = await getLatestProjectVersion(projectId, { branch: opts.branch }, authToken)
      console.log(JSON.stringify(opts.json ? payload : payload, null, 2))
    })
}
