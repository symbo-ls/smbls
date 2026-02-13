import chalk from 'chalk'
import { deleteProject } from '../../../helpers/projectsApi.js'
import { confirmPrompt } from '../../../helpers/projectPrompts.js'
import { resolveAuthOrExit, resolveProjectIdOrExit } from '../shared.js'

export function registerProjectDeleteCommand (projectCmd) {
  projectCmd
    .command('delete <projectKeyOrId>')
    .description('Delete a platform project')
    .option('--yes', 'Skip confirmation prompt', false)
    .action(async (value, opts) => {
      const { authToken } = resolveAuthOrExit()
      const projectId = await resolveProjectIdOrExit({ value, authToken })
      if (!opts.yes) {
        const ok = await confirmPrompt(`Delete project ${projectId}?`, false)
        if (!ok) {
          console.log(chalk.dim('Cancelled.'))
          return
        }
      }
      await deleteProject(projectId, authToken)
      console.log(chalk.green('Deleted project:'), chalk.dim(projectId))
    })
}
