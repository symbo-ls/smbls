import chalk from 'chalk'
import { listProjectMembers, removeProjectMember } from '../../../../helpers/projectsApi.js'
import { resolveAuthOrExit } from '../../shared.js'
import { resolveWorkspaceProjectIdOrExit } from '../libs/shared.js'

function isEmail (value) {
  return String(value || '').includes('@')
}

async function resolveMemberIdByEmail ({ projectId, email, authToken }) {
  const target = String(email || '').trim().toLowerCase()
  if (!target) return null

  // Best-effort: walk a few pages to find exact email match.
  const limit = 200
  for (let page = 1; page <= 5; page++) {
    const payload = await listProjectMembers(projectId, { page, limit }, authToken)
    const items = Array.isArray(payload?.data) ? payload.data : (Array.isArray(payload) ? payload : [])
    const match = items.find((m) => String(m?.user?.email || '').toLowerCase() === target)
    if (match) return String(match?.id || match?._id || '')
    if (items.length < limit) break
  }
  return null
}

export function registerProjectMembersRemoveCommand (membersCmd) {
  membersCmd
    .command('remove <memberIdOrEmail>')
    .description('Remove a member from the project (by member id; email is best-effort)')
    .option('--project <projectKeyOrId>', 'Override project (defaults to linked workspace)')
    .option('--json', 'Output raw JSON', false)
    .action(async (memberIdOrEmail, opts) => {
      const { authToken } = resolveAuthOrExit()
      const projectId = await resolveWorkspaceProjectIdOrExit({ projectArg: opts.project, authToken })

      const memberId = isEmail(memberIdOrEmail)
        ? await resolveMemberIdByEmail({ projectId, email: memberIdOrEmail, authToken })
        : String(memberIdOrEmail || '').trim()

      if (!memberId) {
        console.error(chalk.red('Unable to resolve member id. Provide a member id, or ensure the email exists in the first few pages of members.'))
        process.exit(1)
      }

      const payload = await removeProjectMember(projectId, memberId, authToken)
      if (opts.json) {
        console.log(JSON.stringify(payload, null, 2))
        return
      }

      console.log(chalk.green('Member removed.'))
    })
}
