import chalk from 'chalk'
import { activateMultipleEnvironments } from '../../../../helpers/projectsApi.js'
import { resolveAuthOrExit } from '../../shared.js'
import { resolveWorkspaceProjectIdOrExit } from '../libs/shared.js'

export function registerProjectEnvironmentsActivateCommand (envCmd) {
  envCmd
    .command('activate')
    .description('Activate multiple environments (paid feature)')
    .option('--project <projectKeyOrId>', 'Override project (defaults to linked workspace)')
    .option('--force', 'Force reconfiguration even if already active', false)
    .option('--json', 'Output raw JSON', false)
    .action(async (opts) => {
      const { authToken } = resolveAuthOrExit()
      const projectId = await resolveWorkspaceProjectIdOrExit({ projectArg: opts.project, authToken })

      const payload = await activateMultipleEnvironments(
        projectId,
        { force: !!opts.force },
        authToken
      )

      if (opts.json) {
        console.log(JSON.stringify(payload, null, 2))
        return
      }

      const activation = payload?.activation || payload?.data?.activation || null
      const wildcardHostname = payload?.wildcardHostname || payload?.data?.wildcardHostname || ''
      console.log(chalk.green('Multiple environments activated.'))
      if (wildcardHostname) console.log('wildcard:', chalk.dim(String(wildcardHostname)))
      if (activation) console.log(JSON.stringify({ activation }, null, 2))
    })
}
