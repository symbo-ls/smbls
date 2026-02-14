import chalk from 'chalk'
import { updateProjectVersion } from '../../../../helpers/projectsApi.js'
import { resolveAuthOrExit, parseJsonArg, readJsonFile } from '../../shared.js'
import { resolveWorkspaceProjectIdOrExit } from '../libs/shared.js'

export function registerProjectVersionsUpdateCommand (versionsCmd) {
  versionsCmd
    .command('update <versionId>')
    .description('Update an existing version (e.g. message/metadata)')
    .option('--project <projectKeyOrId>', 'Override project (defaults to linked workspace)')
    .option('--message <message>', 'Convenience: set message field')
    .option('--body <json>', 'Raw JSON body for PATCH')
    .option('--body-file <path>', 'JSON file body for PATCH')
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

      const body = { ...(fromFile || fromArg || {}) }
      if (opts.message) body.message = opts.message
      if (!Object.keys(body).length) {
        console.error(chalk.red('Missing update payload. Provide --message or --body/--body-file.'))
        process.exit(1)
      }

      const payload = await updateProjectVersion(projectId, versionId, body, authToken)
      console.log(JSON.stringify(opts.json ? payload : payload, null, 2))
    })
}
