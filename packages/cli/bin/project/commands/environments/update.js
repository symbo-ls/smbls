import chalk from 'chalk'
import { updateProjectEnvironment } from '../../../../helpers/projectsApi.js'
import { resolveAuthOrExit, parseJsonArg, readJsonFile } from '../../shared.js'
import { resolveWorkspaceProjectIdOrExit } from '../libs/shared.js'
import { buildPatchBodyFromFlags, formatEnvConfigSummary } from './utils.js'

function ensurePlainObjectOrExit (value, { label } = {}) {
  if (value === null || value === undefined) return {}
  if (typeof value !== 'object' || Array.isArray(value)) {
    console.error(chalk.red(`${label || 'value'} must be a JSON object.`))
    process.exit(1)
  }
  return value
}

export function registerProjectEnvironmentsUpdateCommand (envCmd) {
  envCmd
    .command('update <envKey>')
    .description('Update an environment slot (PATCH)')
    .option('--project <projectKeyOrId>', 'Override project (defaults to linked workspace)')
    .option('--mode <mode>', 'Mode: latest|published|version|branch')
    .option('--version <version>', 'Version value (only meaningful for mode=version)')
    .option('--branch <branch>', 'Branch name (only meaningful for mode=branch)')
    .option('--label <label>', 'Display label')
    .option('--host <host>', 'Host label (single DNS label; can paste full domain)')
    .option('--enabled', 'Enable this environment', false)
    .option('--disabled', 'Disable this environment', false)
    .option('--body <json>', 'Raw JSON PATCH body (merged with flags)')
    .option('--body-file <path>', 'JSON file PATCH body (merged with flags)')
    .option('--json', 'Output raw JSON', false)
    .action(async (envKey, opts) => {
      const { authToken } = resolveAuthOrExit()
      const projectId = await resolveWorkspaceProjectIdOrExit({ projectArg: opts.project, authToken })

      const fromFile = opts.bodyFile ? readJsonFile(opts.bodyFile) : null
      const fromArg = opts.body ? parseJsonArg(opts.body) : null
      if (fromFile && fromArg) {
        console.error(chalk.red('Use either --body or --body-file (not both).'))
        process.exit(1)
      }

      const base = ensurePlainObjectOrExit(fromFile || fromArg, { label: 'body' })
      const flagsBody = buildPatchBodyFromFlags(opts)
      const body = { ...base, ...flagsBody }

      if (!Object.keys(body).length) {
        console.error(chalk.red('Missing update payload. Provide flags or --body/--body-file.'))
        process.exit(1)
      }

      const payload = await updateProjectEnvironment(projectId, envKey, body, authToken)

      if (opts.json) {
        console.log(JSON.stringify(payload, null, 2))
        return
      }

      const key = payload?.key || payload?.data?.key || envKey
      const cfg = payload?.config || payload?.data?.config || null
      console.log(chalk.green('Environment updated.'))
      if (cfg) console.log(formatEnvConfigSummary(key, cfg))
      else console.log(chalk.bold(key))
    })
}
