import chalk from 'chalk'
import { restoreProjectToVersion } from '../../../helpers/projectsApi.js'
import { resolveAuthOrExit } from '../shared.js'
import { resolveWorkspaceProjectIdOrExit } from './libs/shared.js'

export function registerProjectRestoreCommand (projectCmd) {
  projectCmd
    .command('restore')
    .description('Restore a project to a previous version state')
    .option('--project <projectKeyOrId>', 'Override project (defaults to linked workspace)')
    .requiredOption('--version <version>', 'Target version (id or semver string)')
    .option('--branch <branch>', 'Branch name', 'main')
    .option('--type <type>', 'Version bump type for restore (patch/minor/major)', 'patch')
    .option('--message <message>', 'Custom restore message')
    .option('--json', 'Output raw JSON', false)
    .action(async (opts) => {
      const { authToken } = resolveAuthOrExit()
      const projectId = await resolveWorkspaceProjectIdOrExit({ projectArg: opts.project, authToken })

      const payload = await restoreProjectToVersion(projectId, {
        version: opts.version,
        branch: opts.branch,
        type: opts.type,
        message: opts.message
      }, authToken)

      if (opts.json) {
        console.log(JSON.stringify(payload, null, 2))
        return
      }

      console.log(chalk.green('Restore request completed.'))
      if (payload) console.log(JSON.stringify(payload, null, 2))
    })
}
