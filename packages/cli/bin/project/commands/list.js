import chalk from 'chalk'
import { listProjects } from '../../../helpers/projectsApi.js'
import { resolveAuthOrExit } from '../shared.js'

export function registerProjectListCommand (projectCmd) {
  projectCmd
    .command('list')
    .description('List your projects')
    .option('--page <n>', 'Page number', (v) => parseInt(v, 10), 1)
    .option('--limit <n>', 'Page size', (v) => parseInt(v, 10), 20)
    .option('--search <q>', 'Search query')
    .option('--json', 'Output raw JSON', false)
    .action(async (opts) => {
      const { authToken } = resolveAuthOrExit()
      const payload = await listProjects({ page: opts.page, limit: opts.limit, search: opts.search }, authToken)
      if (opts.json) {
        console.log(JSON.stringify(payload, null, 2))
        return
      }

      const items = Array.isArray(payload?.items)
        ? payload.items
        : (Array.isArray(payload) ? payload : (payload?.data || payload?.projects || []))
      if (!items.length) {
        console.log(chalk.dim('No projects found.'))
        return
      }
      for (const p of items) {
        const name = p?.name || ''
        const key = p?.key || p?.projectKey || ''
        const id = p?.id || p?._id || ''
        console.log(`${chalk.bold(name || key || id)}  ${chalk.cyan(key || '')}  ${chalk.dim(id || '')}`.trim())
      }
    })
}
