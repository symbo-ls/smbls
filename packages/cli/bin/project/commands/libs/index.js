import { registerProjectLibsAvailableCommand } from './available.js'
import { registerProjectLibsListCommand } from './list.js'
import { registerProjectLibsAddCommand } from './add.js'
import { registerProjectLibsRemoveCommand } from './remove.js'

export function registerProjectLibsCommand (projectCmd) {
  const libsCmd = projectCmd
    .command('libs')
    .description('Project libraries')

  registerProjectLibsAvailableCommand(libsCmd)
  registerProjectLibsListCommand(libsCmd)
  registerProjectLibsAddCommand(libsCmd)
  registerProjectLibsRemoveCommand(libsCmd)
}
