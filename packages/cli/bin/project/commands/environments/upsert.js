import chalk from 'chalk'
import { upsertProjectEnvironment } from '../../../../helpers/projectsApi.js'
import { resolveAuthOrExit, parseJsonArg, readJsonFile } from '../../shared.js'
import { resolveWorkspaceProjectIdOrExit } from '../libs/shared.js'
import { buildEnvConfigFromFlags, formatEnvConfigSummary } from './utils.js'

function ensurePlainObjectOrExit (value, { label } = {}) {
  if (value === null || value === undefined) return {}
  if (typeof value !== 'object' || Array.isArray(value)) {
    console.error(chalk.red(`${label || 'value'} must be a JSON object.`))
    process.exit(1)
  }
  return value
}

export function registerProjectEnvironmentsUpsertCommand (envCmd) {
  envCmd
    .command('upsert <envKey>')
    .description('Create or update an environment slot (POST upsert)')
    .option('--project <projectKeyOrId>', 'Override project (defaults to linked workspace)')
    .option('--mode <mode>', 'Mode: latest|published|version|branch')
    .option('--version <version>', 'Version value (only meaningful for mode=version)')
    .option('--branch <branch>', 'Branch name (only meaningful for mode=branch)')
    .option('--label <label>', 'Display label')
    .option('--host <host>', 'Host label (single DNS label; can paste full domain)')
    .option('--enabled', 'Enable this environment', false)
    .option('--disabled', 'Disable this environment', false)
    .option('--config <json>', 'Config JSON object (merged with flags)')
    .option('--config-file <path>', 'Config JSON file (merged with flags)')
    .option('--json', 'Output raw JSON', false)
    .action(async (envKey, opts) => {
      const { authToken } = resolveAuthOrExit()
      const projectId = await resolveWorkspaceProjectIdOrExit({ projectArg: opts.project, authToken })

      const fromFile = opts.configFile ? readJsonFile(opts.configFile) : null
      const fromArg = opts.config ? parseJsonArg(opts.config) : null
      if (fromFile && fromArg) {
        console.error(chalk.red('Use either --config or --config-file (not both).'))
        process.exit(1)
      }

      const base = ensurePlainObjectOrExit(fromFile || fromArg, { label: 'config' })
      const config = buildEnvConfigFromFlags(opts, { base })

      const payload = await upsertProjectEnvironment(projectId, { envKey, config }, authToken)

      if (opts.json) {
        console.log(JSON.stringify(payload, null, 2))
        return
      }

      const key = payload?.key || payload?.data?.key || envKey
      const cfg = payload?.config || payload?.data?.config || config
      console.log(chalk.green('Environment upserted.'))
      console.log(formatEnvConfigSummary(key, cfg))
    })
}
