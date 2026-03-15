import { runProjectCreate } from './create.js'

export function registerProjectLinkCommand (projectCmd) {
  projectCmd
    .command('link [dir]')
    .description('Link a local folder to an existing platform project')
    .option('--key <projectKey>', 'Project key to link')
    .option('--id <projectId>', 'Project id to link')
    .option('--branch <branch>', 'Local branch for .symbols_local/config.json', 'main')
    .option('--bootstrap', 'Create the local starter project before linking', false)
    .option('--verbose', 'Verbose output', false)
    .option('--remote', 'Clone feature/remote branch when cloning templates', true)
    .option('--domql', 'Use DOMQL template (default)', true)
    .option('--template <gitUrl>', 'Override template git repo URL')
    .option('--package-manager <manager>', 'Choose the package manager (npm/yarn)', 'npm')
    .option('--clean-from-git', 'Remove starter-kit git repository', true)
    .option('--no-dependencies', 'Skip installing dependencies')
    .option('--no-clone', 'Create folder instead of cloning from git')
    .action(async (dir, opts) => {
      await runProjectCreate(dir || process.cwd(), {
        linkExisting: true,
        key: opts.key,
        id: opts.id,
        branch: opts.branch,
        bootstrap: !!opts.bootstrap,
        verbose: !!opts.verbose,
        remote: opts.remote,
        domql: opts.domql,
        template: opts.template,
        packageManager: opts.packageManager,
        cleanFromGit: opts.cleanFromGit,
        dependencies: opts.dependencies,
        clone: opts.clone
      })
    })
}
