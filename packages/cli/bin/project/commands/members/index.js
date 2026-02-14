import { registerProjectMembersListCommand } from './list.js'
import { registerProjectMembersAddCommand } from './add.js'
import { registerProjectMembersRemoveCommand } from './remove.js'
import { registerProjectMembersRoleCommand } from './role.js'
import { registerProjectMembersInviteCommand } from './invite.js'
import { registerProjectMembersInviteLinkCommand } from './inviteLink.js'
import { registerProjectMembersAcceptInviteCommand } from './acceptInvite.js'

export function registerProjectMembersCommand (projectCmd) {
  const membersCmd = projectCmd
    .command('members')
    .description('Project member management')

  registerProjectMembersListCommand(membersCmd)
  registerProjectMembersAddCommand(membersCmd)
  registerProjectMembersRemoveCommand(membersCmd)
  registerProjectMembersRoleCommand(membersCmd)
  registerProjectMembersInviteCommand(membersCmd)
  registerProjectMembersInviteLinkCommand(membersCmd)
  registerProjectMembersAcceptInviteCommand(membersCmd)
}
