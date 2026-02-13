import chalk from 'chalk'
import { createProjectVersionSnapshot } from '../../../../helpers/projectsApi.js'
import { resolveAuthOrExit, parseJsonArg, readJsonFile } from '../../shared.js'
import { resolveWorkspaceProjectIdOrExit } from '../libs/shared.js'

export function registerProjectVersionsSnapshotCommand (versionsCmd) {
  versionsCmd
    .command('snapshot <versionId>')
    .description('Create a snapshot for a version')
    .option('--project <projectKeyOrId>', 'Override project (defaults to linked workspace)')
    .option('--body <json>', 'Raw JSON body for POST (optional)')
    .option('--body-file <path>', 'JSON file body for POST (optional)')
    .option('--json', 'Output raw JSON', false)
    .action(async (versionId, opts) => {
      const { authToken } = resolveAuthOrExit()
      const projectId = await resolveWorkspaceProjectIdOrExit({ projectArg: opts.project, authToken })

      const fromFile = opts.bodyFile ? readJsonFile(opts.bodyFile) : null
      const fromArg = parseJsonArg(opts.body)
      if (fromFile && fromArg) {
        console.error(chalk.red('Use either --body or --body-file (not both).'))
        process.exit(1)
      }

      const body = fromFile || fromArg || {}
      const payload = await createProjectVersionSnapshot(projectId, versionId, body, authToken)
      console.log(JSON.stringify(opts.json ? payload : payload, null, 2))
    })
}
