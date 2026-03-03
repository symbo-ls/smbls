import { runProjectCreate } from './create.js'

export function registerProjectLinkCommand (projectCmd) {
  projectCmd
    .command('link [dir]')
    .description('Link a local folder to an existing platform project')
    .option('--key <projectKey>', 'Project key to link')
    .option('--id <projectId>', 'Project id to link')
    .option('--branch <branch>', 'Local branch for .symbols/config.json', 'main')
    .action(async (dir, opts) => {
      await runProjectCreate(dir || process.cwd(), {
        linkExisting: true,
        key: opts.key,
        id: opts.id,
        branch: opts.branch
      })
    })
}
