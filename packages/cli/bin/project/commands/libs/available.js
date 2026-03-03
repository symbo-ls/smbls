import chalk from 'chalk'
import { listAvailableLibraries } from '../../../../helpers/projectsApi.js'
import { resolveMaybeAuth } from '../../shared.js'

export function registerProjectLibsAvailableCommand (libsCmd) {
  libsCmd
    .command('available')
    .description('List available shared libraries')
    .option('--page <n>', 'Page number', (v) => parseInt(v, 10), 1)
    .option('--limit <n>', 'Page size', (v) => parseInt(v, 10), 20)
    .option('--search <q>', 'Search query')
    .option('--framework <framework>', 'Filter by framework')
    .option('--include-deprecated', 'Include deprecated libs', false)
    .option('--json', 'Output raw JSON', false)
    .action(async (opts) => {
      const { authToken } = resolveMaybeAuth()
      const payload = await listAvailableLibraries({
        page: opts.page,
        limit: opts.limit,
        search: opts.search,
        framework: opts.framework,
        includeDeprecated: opts.includeDeprecated ? 'true' : undefined
      }, authToken)
      if (opts.json) {
        console.log(JSON.stringify(payload, null, 2))
        return
      }
      const items = Array.isArray(payload?.items)
        ? payload.items
        : (Array.isArray(payload) ? payload : (payload?.data || payload?.libraries || []))
      if (!items.length) {
        console.log(chalk.dim('No libraries found.'))
        return
      }
      for (const lib of items) {
        const name = lib?.name || ''
        const key = lib?.key || ''
        const id = lib?.id || lib?._id || ''
        console.log(`${chalk.bold(name || key || id)}  ${chalk.cyan(key || '')}  ${chalk.dim(id || '')}`.trim())
      }
    })
}
