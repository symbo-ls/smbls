import path from 'path'
import chalk from 'chalk'
import { createLocalTemplate } from '../../../helpers/localTemplateCreate.js'
import { linkWorkspaceToProject } from '../../../helpers/projectConfigLink.js'
import { normalizeProjectKey, suggestProjectKeyFromName } from '../../../helpers/projectKeyUtils.js'
import { duplicateProject } from '../../../helpers/projectsApi.js'
import { promptProjectName, promptProjectKey } from '../../../helpers/projectPrompts.js'
import {
  resolveAuthOrExit,
  resolveProjectIdOrExit,
  ensureAvailableKeyOrExit,
  pickProjectId,
  pickProjectKey
} from '../shared.js'

export function registerProjectDuplicateCommand (projectCmd) {
  projectCmd
    .command('duplicate <sourceProjectKeyOrId> [dir]')
    .description('Duplicate a project on the platform and (optionally) set up a local folder')
    .option('--name <name>', 'New project name')
    .option('--key <projectKey>', 'New project key')
    .option('--type <projectType>', 'New project type (optional; server may infer)')
    .option('--non-interactive', 'Disable prompts', false)
    .option('--no-local', 'Do not create/link a local folder', false)
    .option('--verbose', 'Verbose output', false)
    .option('--remote', 'Clone feature/remote branch when cloning templates', true)
    .option('--domql', 'Use DOMQL template (default)', true)
    .option('--template <gitUrl>', 'Override template git repo URL')
    .option('--package-manager <manager>', 'Choose the package manager (npm/yarn)', 'npm')
    .option('--clean-from-git', 'Remove starter-kit git repository', true)
    .option('--no-dependencies', 'Skip installing dependencies')
    .option('--no-clone', 'Create folder instead of cloning from git')
    .action(async (source, dir, opts) => {
      const { cliConfig, authToken } = resolveAuthOrExit()
      const sourceId = await resolveProjectIdOrExit({ value: source, authToken })

      const interactive = !!process.stdin.isTTY && !!process.stdout.isTTY && !opts.nonInteractive
      const name = opts.name || (interactive ? await promptProjectName({ defaultName: `Copy of ${source}` }) : null)
      let key = opts.key ? normalizeProjectKey(opts.key) : null
      if (interactive && !key) {
        const suggested = suggestProjectKeyFromName(name || '') || ''
        const entered = await promptProjectKey({ defaultKey: suggested })
        key = normalizeProjectKey(entered)
      }

      if (key) key = await ensureAvailableKeyOrExit({ projectKey: key, authToken })

      const body = {}
      if (name) body.name = name
      if (key) body.key = key
      if (opts.type) body.projectType = opts.type

      const duplicated = await duplicateProject(sourceId, body, authToken)
      const newKey = normalizeProjectKey(pickProjectKey(duplicated) || key || '')
      const newId = pickProjectId(duplicated)

      console.log(chalk.green('Duplicated project:'))
      if (newKey) console.log(' ', chalk.cyan(newKey))
      if (newId) console.log(' ', chalk.dim(newId))

      if (opts.local === false) return

      const dest = dir || (newKey ? newKey.replace(/\.symbo\.ls$/iu, '') : 'symbols-project')
      const absDest = path.resolve(dest)

      if (opts.domql === false) {
        console.error(chalk.red('Only DOMQL templates are supported right now.'))
        process.exit(1)
      }
      await createLocalTemplate({
        destDir: absDest,
        framework: 'domql',
        packageManager: opts.packageManager || 'npm',
        clone: opts.clone !== false,
        remote: opts.remote !== false,
        cleanFromGit: opts.cleanFromGit !== false,
        dependencies: opts.dependencies !== false,
        verbose: !!opts.verbose,
        templateUrl: opts.template
      })

      linkWorkspaceToProject({
        baseDir: absDest,
        apiBaseUrl: cliConfig.apiBaseUrl,
        projectKey: newKey || key,
        projectId: newId,
        branch: 'main'
      })
    })
}
