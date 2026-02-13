import chalk from 'chalk'
import { patchProject, postChanges } from '../../../helpers/projectsApi.js'
import { resolveAuthOrExit, resolveProjectIdOrExit, parseJsonArg, readJsonFile } from '../shared.js'

export function registerProjectUpdateCommand (projectCmd) {
  projectCmd
    .command('update <projectKeyOrId>')
    .description('Update project metadata or content changes')
    .option('--meta <json>', 'JSON for PATCH /projects/:id')
    .option('--meta-file <path>', 'JSON file for PATCH /projects/:id')
    .option('--changes <json>', 'JSON for POST /projects/:id/changes')
    .option('--changes-file <path>', 'JSON file for POST /projects/:id/changes')
    .action(async (value, opts) => {
      const { authToken } = resolveAuthOrExit()
      const projectId = await resolveProjectIdOrExit({ value, authToken })

      const meta = opts.metaFile ? readJsonFile(opts.metaFile) : parseJsonArg(opts.meta)
      const changes = opts.changesFile ? readJsonFile(opts.changesFile) : parseJsonArg(opts.changes)

      if (meta && changes) {
        console.error(chalk.red('Use either --meta/--meta-file OR --changes/--changes-file (not both).'))
        process.exit(1)
      }
      if (!meta && !changes) {
        console.error(chalk.red('Missing update payload. Provide --meta/--meta-file or --changes/--changes-file.'))
        process.exit(1)
      }

      if (meta) {
        const updated = await patchProject(projectId, meta, authToken)
        console.log(JSON.stringify(updated, null, 2))
        return
      }

      const result = await postChanges(projectId, authToken, changes || {})
      console.log(JSON.stringify(result, null, 2))
    })
}
