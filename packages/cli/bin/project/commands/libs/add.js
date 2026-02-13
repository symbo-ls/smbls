import chalk from 'chalk'
import { addProjectLibraries } from '../../../../helpers/projectsApi.js'
import { resolveAuthOrExit } from '../../shared.js'
import { resolveWorkspaceProjectIdOrExit, resolveLibraryIdsOrExit, refreshWorkspaceProjectFiles } from './shared.js'

export function registerProjectLibsAddCommand (libsCmd) {
  libsCmd
    .command('add <libraries...>')
    .description('Add one or more shared libraries to a project')
    .option('--project <projectKeyOrId>', 'Override project (defaults to linked workspace)')
    .option('--allow-deprecated', 'Allow adding deprecated libraries', false)
    .option('--no-refresh', 'Do not fetch latest project data after updating libs')
    .option('--json', 'Output raw JSON', false)
    .action(async (libraries, opts) => {
      const { authToken } = resolveAuthOrExit()
      const projectId = await resolveWorkspaceProjectIdOrExit({ projectArg: opts.project, authToken })
      const libraryIds = await resolveLibraryIdsOrExit(libraries, authToken)

      const payload = await addProjectLibraries(projectId, libraryIds, authToken, { allowDeprecated: !!opts.allowDeprecated })

      if (opts.json) {
        console.log(JSON.stringify(payload, null, 2))
      } else {
        console.log(chalk.green('Libraries added.'))
      }

      if (opts.refresh !== false) {
        await refreshWorkspaceProjectFiles()
        if (!opts.json) console.log(chalk.gray('Local project files updated.'))
      }
    })
}
