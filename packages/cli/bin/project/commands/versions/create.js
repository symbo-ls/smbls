import chalk from 'chalk'
import { createProjectVersion } from '../../../../helpers/projectsApi.js'
import { resolveAuthOrExit, parseJsonArg, readJsonFile } from '../../shared.js'
import { resolveWorkspaceProjectIdOrExit } from '../libs/shared.js'

export function registerProjectVersionsCreateCommand (versionsCmd) {
  versionsCmd
    .command('create')
    .description('Create a new version (server decides semantics)')
    .option('--project <projectKeyOrId>', 'Override project (defaults to linked workspace)')
    .option('--branch <branch>', 'Branch name', 'main')
    .option('--type <type>', 'Version bump type (patch/minor/major)', 'patch')
    .option('--message <message>', 'Version message/description')
    .option('--body <json>', 'Raw JSON body to merge into request')
    .option('--body-file <path>', 'JSON file to merge into request')
    .option('--json', 'Output raw JSON', false)
    .action(async (opts) => {
      const { authToken } = resolveAuthOrExit()
      const projectId = await resolveWorkspaceProjectIdOrExit({ projectArg: opts.project, authToken })

      const fromFile = opts.bodyFile ? readJsonFile(opts.bodyFile) : null
      const fromArg = parseJsonArg(opts.body)
      if (fromFile && fromArg) {
        console.error(chalk.red('Use either --body or --body-file (not both).'))
        process.exit(1)
      }

      const body = { ...(fromFile || fromArg || {}) }
      if (opts.branch) body.branch = opts.branch
      if (opts.type) body.type = opts.type
      if (opts.message) body.message = opts.message

      const payload = await createProjectVersion(projectId, body, authToken)
      console.log(JSON.stringify(opts.json ? payload : payload, null, 2))
    })
}
