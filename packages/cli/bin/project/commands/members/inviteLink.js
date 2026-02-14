import { createProjectMagicInviteLink } from '../../../../helpers/projectsApi.js'
import { resolveAuthOrExit } from '../../shared.js'
import { resolveWorkspaceProjectIdOrExit } from '../libs/shared.js'

export function registerProjectMembersInviteLinkCommand (membersCmd) {
  membersCmd
    .command('invite-link')
    .description('Create a magic invite link for the project (defaults to guest role)')
    .option('--project <projectKeyOrId>', 'Override project (defaults to linked workspace)')
    .option('--json', 'Output raw JSON', false)
    .action(async (opts) => {
      const { authToken } = resolveAuthOrExit()
      const projectId = await resolveWorkspaceProjectIdOrExit({ projectArg: opts.project, authToken })

      const payload = await createProjectMagicInviteLink(projectId, authToken)
      if (opts.json) {
        console.log(JSON.stringify(payload, null, 2))
        return
      }

      const info = payload?.data || payload
      if (info?.url) console.log(info.url)
      else console.log(JSON.stringify(payload, null, 2))
    })
}
