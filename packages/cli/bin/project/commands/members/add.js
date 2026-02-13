import chalk from 'chalk'
import { addProjectMember } from '../../../../helpers/projectsApi.js'
import { resolveAuthOrExit } from '../../shared.js'
import { resolveWorkspaceProjectIdOrExit } from '../libs/shared.js'

export function registerProjectMembersAddCommand (membersCmd) {
  membersCmd
    .command('add <email>')
    .description('Add an existing platform user to the project by email')
    .option('--project <projectKeyOrId>', 'Override project (defaults to linked workspace)')
    .option('--role <role>', 'Member role (guest/editor/admin/owner)', 'guest')
    .option('--json', 'Output raw JSON', false)
    .action(async (email, opts) => {
      const { authToken } = resolveAuthOrExit()
      const projectId = await resolveWorkspaceProjectIdOrExit({ projectArg: opts.project, authToken })

      const payload = await addProjectMember(projectId, { email, role: opts.role }, authToken)
      if (opts.json) {
        console.log(JSON.stringify(payload, null, 2))
        return
      }

      const member = payload?.data || payload
      const user = member?.user || {}
      const label = user?.email || email
      console.log(chalk.green('Member added:'), chalk.bold(label), chalk.dim(member?.role || opts.role))
    })
}
