import chalk from 'chalk'
import { acceptProjectInvite } from '../../../../helpers/projectsApi.js'
import { resolveAuthOrExit } from '../../shared.js'

export function registerProjectMembersAcceptInviteCommand (membersCmd) {
  membersCmd
    .command('accept-invite <token>')
    .description('Accept a project invite token (requires being logged in)')
    .option('--json', 'Output raw JSON', false)
    .action(async (token, opts) => {
      const { authToken } = resolveAuthOrExit()
      const payload = await acceptProjectInvite(token, authToken)
      if (opts.json) {
        console.log(JSON.stringify(payload, null, 2))
        return
      }

      const info = payload?.data || payload
      const projectName = info?.projectName || info?.project?.name || ''
      console.log(chalk.green('Invite accepted.'), projectName ? chalk.dim(projectName) : '')
    })
}
