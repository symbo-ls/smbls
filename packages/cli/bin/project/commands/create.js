import path from 'path'
import chalk from 'chalk'
import { createLocalTemplate } from '../../../helpers/localTemplateCreate.js'
import { linkWorkspaceToProject } from '../../../helpers/projectConfigLink.js'
import { normalizeProjectKey, suggestProjectKeyFromName, isProbablyProjectId } from '../../../helpers/projectKeyUtils.js'
import { createProject } from '../../../helpers/projectsApi.js'
import {
  promptProjectCreateMode,
  promptProjectName,
  promptProjectType,
  promptProjectKey,
  selectProjectPaged
} from '../../../helpers/projectPrompts.js'
import {
  ensureDir,
  resolveAuthOrExit,
  resolveMaybeAuth,
  pickProjectId,
  pickProjectKey,
  resolveProjectIdOrExit,
  ensureAvailableKeyOrExit
} from '../shared.js'

export async function runProjectCreate (destArg, options = {}) {
  const dest = destArg || 'symbols-starter-kit'
  const absDest = path.resolve(dest)

  const interactive = !!process.stdin.isTTY && !!process.stdout.isTTY && !options.nonInteractive

  let mode = options.localOnly ? 'local_only' : (options.linkExisting ? 'link_existing' : (options.createNew ? 'create_new' : null))
  if (!mode && interactive) {
    mode = await promptProjectCreateMode()
  }
  if (!mode) mode = 'local_only'

  const { cliConfig, authToken } = (mode === 'local_only') ? resolveMaybeAuth() : resolveAuthOrExit()

  if (mode === 'link_existing') {
    ensureDir(absDest)
    let projectKey = options.key ? normalizeProjectKey(options.key) : null
    let projectId = options.id ? String(options.id).trim() : null

    if (!projectKey && !projectId) {
      const selected = await selectProjectPaged({ authToken })
      if (!selected) {
        console.log(chalk.dim('Cancelled.'))
        return
      }
      const maybeKey = pickProjectKey(selected)
      const maybeId = pickProjectId(selected)

      if (selected.__pasted) {
        // preserve original behavior: pasted value could be id or key
        if (isProbablyProjectId(selected._id)) projectId = selected._id
        else projectKey = normalizeProjectKey(selected.key)
      } else {
        if (maybeId) projectId = maybeId
        if (maybeKey) projectKey = normalizeProjectKey(maybeKey)
      }
    }

    if (!projectId && projectKey) {
      projectId = await resolveProjectIdOrExit({ value: projectKey, authToken })
    }

    linkWorkspaceToProject({
      baseDir: absDest,
      apiBaseUrl: cliConfig.apiBaseUrl,
      projectKey,
      projectId,
      branch: options.branch || 'main'
    })

    console.log(chalk.green('Linked project:'))
    if (projectKey) console.log(' ', chalk.cyan(projectKey))
    if (projectId) console.log(' ', chalk.dim(projectId))
    console.log(chalk.dim(`Config written to ${path.join(dest, '.symbols/config.json')}`))
    return
  }

  if (mode === 'local_only') {
    if (options.domql === false) {
      console.error(chalk.red('Only DOMQL templates are supported right now.'))
      process.exit(1)
    }
    await createLocalTemplate({
      destDir: absDest,
      framework: 'domql',
      packageManager: options.packageManager || 'npm',
      clone: options.clone !== false,
      remote: options.remote !== false,
      cleanFromGit: options.cleanFromGit !== false,
      dependencies: options.dependencies !== false,
      verbose: !!options.verbose,
      templateUrl: options.template
    })
    return
  }

  // mode === create_new
  const defaultName = path.basename(absDest)
  const name = options.name || (interactive ? await promptProjectName({ defaultName }) : null)
  const projectType = options.type || (interactive ? await promptProjectType() : null)
  if (!name) {
    console.error(chalk.red('Missing --name (or run in interactive mode).'))
    process.exit(1)
  }
  if (!projectType) {
    console.error(chalk.red('Missing --type (or run in interactive mode).'))
    process.exit(1)
  }

  let projectKey = options.key
    ? normalizeProjectKey(options.key)
    : normalizeProjectKey(suggestProjectKeyFromName(name) || `${defaultName}.symbo.ls`)

  if (interactive) {
    const entered = await promptProjectKey({ defaultKey: projectKey })
    projectKey = normalizeProjectKey(entered)
  }

  projectKey = await ensureAvailableKeyOrExit({ projectKey, authToken })

  const created = await createProject({
    name,
    projectType,
    key: projectKey,
    framework: options.platformFramework || 'platform',
    language: options.language || 'javascript',
    visibility: options.visibility || 'private'
  }, authToken)

  const createdKey = normalizeProjectKey(pickProjectKey(created) || projectKey)
  const createdId = pickProjectId(created)

  if (options.domql === false) {
    console.error(chalk.red('Only DOMQL templates are supported right now.'))
    process.exit(1)
  }
  await createLocalTemplate({
    destDir: absDest,
    framework: 'domql',
    packageManager: options.packageManager || 'npm',
    clone: options.clone !== false,
    remote: options.remote !== false,
    cleanFromGit: options.cleanFromGit !== false,
    dependencies: options.dependencies !== false,
    verbose: !!options.verbose,
    templateUrl: options.template
  })

  linkWorkspaceToProject({
    baseDir: absDest,
    apiBaseUrl: cliConfig.apiBaseUrl,
    projectKey: createdKey,
    projectId: createdId,
    branch: options.branch || 'main'
  })

  console.log(chalk.green('Platform project created and linked:'))
  console.log(' ', chalk.cyan(createdKey))
  if (createdId) console.log(' ', chalk.dim(createdId))
}

export function registerProjectCreateCommand (projectCmd) {
  projectCmd
    .command('create [dir]')
    .description('Create a new project (platform/local) or link an existing one')
    .option('--create-new', 'Force create new platform project', false)
    .option('--link-existing', 'Force link to existing platform project', false)
    .option('--local-only', 'Local-only (no platform)', false)
    .option('--non-interactive', 'Disable prompts (require flags)', false)
    .option('--name <name>', 'Platform project name')
    .option('--type <projectType>', 'Platform projectType (API-required)')
    .option('--key <projectKey>', 'Platform project key')
    .option('--id <projectId>', 'Platform project id (for link mode)')
    .option('--visibility <visibility>', 'Platform visibility', 'private')
    .option('--language <language>', 'Platform language', 'javascript')
    .option('--platform-framework <framework>', 'Platform framework field', 'platform')
    .option('--branch <branch>', 'Local branch for .symbols/config.json', 'main')
    .option('--verbose', 'Verbose output', false)
    .option('--remote', 'Clone feature/remote branch when cloning templates', true)
    .option('--domql', 'Use DOMQL template (default)', true)
    .option('--template <gitUrl>', 'Override template git repo URL')
    .option('--package-manager <manager>', 'Choose the package manager (npm/yarn)', 'npm')
    .option('--clean-from-git', 'Remove starter-kit git repository', true)
    .option('--no-dependencies', 'Skip installing dependencies')
    .option('--no-clone', 'Create folder instead of cloning from git')
    .action(async (dir, opts) => {
      await runProjectCreate(dir, {
        ...opts,
        createNew: !!opts.createNew,
        linkExisting: !!opts.linkExisting
      })
    })
}
