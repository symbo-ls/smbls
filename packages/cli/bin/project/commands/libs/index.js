import { registerProjectLibsAvailableCommand } from './available.js'

export function registerProjectLibsCommand (projectCmd) {
  const libsCmd = projectCmd
    .command('libs')
    .description('Project libraries')

  registerProjectLibsAvailableCommand(libsCmd)
}
