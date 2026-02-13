import chalk from 'chalk'
import { inviteProjectMember } from '../../../../helpers/projectsApi.js'
import { resolveAuthOrExit } from '../../shared.js'
import { resolveWorkspaceProjectIdOrExit } from '../libs/shared.js'

export function registerProjectMembersInviteCommand (membersCmd) {
  membersCmd
    .command('invite <email>')
    .description('Invite an email address to join the project')
    .option('--project <projectKeyOrId>', 'Override project (defaults to linked workspace)')
    .option('--role <role>', 'Invite role (guest/editor/admin/owner)', 'guest')
    .option('--name <name>', 'Invitee name (optional)')
    .option('--json', 'Output raw JSON', false)
    .action(async (email, opts) => {
      const { authToken } = resolveAuthOrExit()
      const projectId = await resolveWorkspaceProjectIdOrExit({ projectArg: opts.project, authToken })

      const payload = await inviteProjectMember(projectId, { email, role: opts.role, name: opts.name }, authToken)
      if (opts.json) {
        console.log(JSON.stringify(payload, null, 2))
        return
      }

      const info = payload?.data || payload
      console.log(chalk.green('Invitation sent:'), chalk.bold(info?.email || email), chalk.dim(info?.role || opts.role))
    })
}
