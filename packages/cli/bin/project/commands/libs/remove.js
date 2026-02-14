import chalk from 'chalk'
import { removeProjectLibraries } from '../../../../helpers/projectsApi.js'
import { resolveAuthOrExit } from '../../shared.js'
import { resolveWorkspaceProjectIdOrExit, resolveLibraryIdsOrExit, refreshWorkspaceProjectFiles } from './shared.js'

export function registerProjectLibsRemoveCommand (libsCmd) {
  libsCmd
    .command('remove <libraries...>')
    .description('Remove one or more shared libraries from a project')
    .option('--project <projectKeyOrId>', 'Override project (defaults to linked workspace)')
    .option('--no-refresh', 'Do not fetch latest project data after updating libs')
    .option('--json', 'Output raw JSON', false)
    .action(async (libraries, opts) => {
      const { authToken } = resolveAuthOrExit()
      const projectId = await resolveWorkspaceProjectIdOrExit({ projectArg: opts.project, authToken })
      const libraryIds = await resolveLibraryIdsOrExit(libraries, authToken)

      const payload = await removeProjectLibraries(projectId, libraryIds, authToken)

      if (opts.json) {
        console.log(JSON.stringify(payload, null, 2))
      } else {
        console.log(chalk.green('Libraries removed.'))
      }

      if (opts.refresh !== false) {
        await refreshWorkspaceProjectFiles()
        if (!opts.json) console.log(chalk.gray('Local project files updated.'))
      }
    })
}
