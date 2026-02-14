import chalk from 'chalk'
import { updateProjectMemberRole } from '../../../../helpers/projectsApi.js'
import { resolveAuthOrExit } from '../../shared.js'
import { resolveWorkspaceProjectIdOrExit } from '../libs/shared.js'

export function registerProjectMembersRoleCommand (membersCmd) {
  membersCmd
    .command('role <memberId> <role>')
    .description('Update a project member role (guest/editor/admin/owner)')
    .option('--project <projectKeyOrId>', 'Override project (defaults to linked workspace)')
    .option('--json', 'Output raw JSON', false)
    .action(async (memberId, role, opts) => {
      const { authToken } = resolveAuthOrExit()
      const projectId = await resolveWorkspaceProjectIdOrExit({ projectArg: opts.project, authToken })

      const payload = await updateProjectMemberRole(projectId, memberId, role, authToken)
      if (opts.json) {
        console.log(JSON.stringify(payload, null, 2))
        return
      }

      const member = payload?.data || payload
      const email = member?.user?.email || ''
      console.log(chalk.green('Updated member role:'), chalk.bold(email || memberId), chalk.dim(member?.role || role))
    })
}
