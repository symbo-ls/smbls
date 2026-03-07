import path from 'path'
import chalk from 'chalk'
import { createLocalTemplate, createWorkspaceTemplate } from '../../../helpers/localTemplateCreate.js'
import { linkWorkspaceToProject } from '../../../helpers/projectConfigLink.js'
import { runConfigPrompts } from '../../../helpers/configPrompts.js'
import { loadSymbolsConfig } from '../../../helpers/symbolsConfig.js'
import { normalizeProjectKey, suggestProjectKeyFromName, isProbablyProjectId } from '../../../helpers/projectKeyUtils.js'
import { createProject, addProjectLibraries, listAvailableLibraries, getLatestProjectVersion } from '../../../helpers/projectsApi.js'
import {
  promptProjectCreateMode,
  promptProjectName,
  promptProjectType,
  promptProjectKey,
  promptWorkspaceMode,
  promptIncludeRunnerFiles,
  promptRunConfig,
  promptProjectSharedLibrariesMode,
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

function pickLibId (lib) {
  return lib?.id || lib?._id || null
}

async function resolveAvailableLibraryIdByKey ({ libraryKey, authToken }) {
  const payload = await listAvailableLibraries({ search: libraryKey, page: 1, limit: 50 }, authToken)
  const items = Array.isArray(payload?.items)
    ? payload.items
    : (Array.isArray(payload) ? payload : (payload?.data || payload?.libraries || []))

  const exact = items.find((lib) => String(lib?.key || '').toLowerCase() === String(libraryKey || '').toLowerCase())
  return pickLibId(exact)
}

function pickVersionValue (v) {
  const raw = v?.value || v?.version || v?.versionNumber || ''
  const s = String(raw || '').trim()
  return s || ''
}

function pickVersionId (v) {
  const raw = v?.id || v?._id || ''
  const s = String(raw || '').trim()
  return s || ''
}

export async function runProjectCreate (destArg, options = {}) {
  const dest = destArg || 'symbols-starter-kit'
  const absDest = path.resolve(dest)

  const interactive = !!process.stdin.isTTY && !!process.stdout.isTTY && !options.nonInteractive

  let mode = options.localOnly ? 'local_only' : (options.linkExisting ? 'link_existing' : (options.createNew ? 'create_new' : null))
  if (!mode && interactive) {
    mode = await promptProjectCreateMode()
  }
  if (!mode) mode = 'local_only'

  let { cliConfig, authToken } = (mode === 'local_only')
    ? resolveMaybeAuth()
    : await resolveAuthOrExit({ nonInteractive: options.nonInteractive })

  // For create_new, resolve project type early so we can use it for workspace default
  let projectType = options.type || null
  if (mode === 'create_new' && !projectType && interactive) {
    projectType = await promptProjectType()
  }

  // Resolve workspace mode: flag > interactive prompt
  let useWorkspace = options.workspace || false
  if (!options.workspace && interactive) {
    const defaultWs = (projectType === 'library' || projectType === 'platform')
    useWorkspace = await promptWorkspaceMode({ defaultWorkspace: defaultWs })
  }

  // For library/platform, ask if runner files are needed (default: no)
  const isLibType = (projectType === 'library' || projectType === 'platform')
  let skipRunnerFiles = isLibType
  if (isLibType && interactive) {
    const include = await promptIncludeRunnerFiles({ defaultInclude: false })
    skipRunnerFiles = !include
  }

  // Post-scaffold: ask about project config
  async function maybeRunConfig () {
    if (!interactive) return
    console.log()
    const action = await promptRunConfig()
    if (action === 'config') {
      const prevCwd = process.cwd()
      process.chdir(absDest)
      try {
        const symbolsConfig = (await loadSymbolsConfig({ required: false, validateKey: false, silent: true })) || {}
        await runConfigPrompts(symbolsConfig)
        console.log(chalk.green('\nConfiguration saved.'))
      } finally {
        process.chdir(prevCwd)
      }
    } else if (action === 'defaults') {
      console.log(chalk.dim('Using recommended defaults.'))
    }
  }

  // Helper: scaffold files (workspace = flat, otherwise full repo clone)
  async function scaffoldFiles () {
    if (useWorkspace) {
      await createWorkspaceTemplate({
        destDir: absDest,
        framework: 'domql',
        packageManager: options.packageManager || 'npm',
        verbose: !!options.verbose,
        skipRunnerFiles,
        templateUrl: options.template
      })
    } else {
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
    }
  }

  if (mode === 'link_existing') {
    // Scaffold first so the dest folder exists with source files
    await scaffoldFiles()

    let projectKey = options.key ? normalizeProjectKey(options.key) : null
    let projectId = options.id ? String(options.id).trim() : null

    if (!projectKey && !projectId) {
      const selected = await selectProjectPaged({ authToken, initialSearch: path.basename(absDest) })
      if (!selected) {
        console.log(chalk.dim('Cancelled.'))
        return
      }
      if (selected.__create_new) {
        // Switch to create_new flow
        mode = 'create_new'
      } else {
        const maybeKey = pickProjectKey(selected)
        const maybeId = pickProjectId(selected)

        if (selected.__pasted) {
          if (isProbablyProjectId(selected._id)) projectId = selected._id
          else projectKey = normalizeProjectKey(selected.key)
        } else {
          if (maybeId) projectId = maybeId
          if (maybeKey) projectKey = normalizeProjectKey(maybeKey)
        }
      }
    }

    if (mode !== 'create_new') {
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
      console.log(chalk.dim(`Config written to ${path.join(dest, '.symbols_local/config.json')}`))

      // Fetch initial project data so the workspace is ready to use
      console.log(chalk.bold('\nFetching project data...\n'))
      const { spawnSync } = await import('child_process')
      const { resolve, dirname } = await import('path')
      const { fileURLToPath } = await import('url')
      const cliBin = resolve(dirname(fileURLToPath(import.meta.url)), '../../index.js')
      spawnSync(process.execPath, [cliBin, 'fetch', '--update', '--yes'], { stdio: 'inherit', cwd: absDest })
      await maybeRunConfig()
      return
    }
    // else: fall through to create_new flow below
  }

  if (mode === 'local_only') {
    await scaffoldFiles()
    await maybeRunConfig()
    return
  }

  // mode === create_new
  const defaultName = path.basename(absDest)
  const branch = options.branch || 'main'
  const name = options.name || (interactive ? await promptProjectName({ defaultName }) : null)
  if (!projectType && interactive) projectType = await promptProjectType()
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

  {
    const ensured = await ensureAvailableKeyOrExit({
      projectKey,
      authToken,
      cliConfig,
      nonInteractive: options.nonInteractive
    })
    projectKey = ensured.projectKey
    authToken = ensured.authToken
    cliConfig = ensured.cliConfig

    // User chose to link to existing project instead of creating new
    if (ensured.linkExisting) {
      const projectId = await resolveProjectIdOrExit({ value: projectKey, authToken })
      await scaffoldFiles()
      linkWorkspaceToProject({
        baseDir: absDest,
        apiBaseUrl: cliConfig.apiBaseUrl,
        projectKey,
        projectId,
        branch
      })
      console.log(chalk.green('Linked project:'))
      console.log(' ', chalk.cyan(projectKey))
      if (projectId) console.log(' ', chalk.dim(projectId))
      console.log(chalk.dim(`Config written to ${path.join(dest, '.symbols_local/config.json')}`))

      console.log(chalk.bold('\nFetching project data...\n'))
      const { spawnSync } = await import('child_process')
      const { resolve, dirname } = await import('path')
      const { fileURLToPath } = await import('url')
      const cliBin = resolve(dirname(fileURLToPath(import.meta.url)), '../../index.js')
      spawnSync(process.execPath, [cliBin, 'fetch', '--update', '--yes'], { stdio: 'inherit', cwd: absDest })
      await maybeRunConfig()
      return
    }
  }

  // Shared libraries: default foundation library or blank.
  // Non-interactive defaults to "default" unless explicitly opted out.
  const sharedLibsMode = options.blankSharedLibraries
    ? 'blank'
    : (interactive ? await promptProjectSharedLibrariesMode({ defaultMode: 'default' }) : 'default')

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

  let latestVersion
  let latestVersionId
  if (createdId) {
    try {
      const payload = await getLatestProjectVersion(
        createdId,
        { branch, fields: 'value,version,versionNumber,createdAt' },
        authToken
      )
      const v = payload?.data || payload
      latestVersion = pickVersionValue(v) || undefined
      latestVersionId = pickVersionId(v) || undefined
    } catch (err) {
      console.log(chalk.yellow('Warning: unable to resolve initial project version from platform.'))
      const msg = String(err?.message || '').trim()
      if (msg) console.log(chalk.dim(msg))
      latestVersion = undefined
      latestVersionId = undefined
    }
  } else {
    latestVersion = undefined
    latestVersionId = undefined
  }

  if (sharedLibsMode === 'default') {
    const defaultLibraryKey = 'default.symbo.ls'
    try {
      const libId = await resolveAvailableLibraryIdByKey({ libraryKey: defaultLibraryKey, authToken })
      if (!libId) {
        console.log(chalk.yellow(`Warning: shared library "${defaultLibraryKey}" not found in this environment.`))
        console.log(chalk.dim('Continuing with blank shared libraries.'))
      } else if (!createdId) {
        console.log(chalk.yellow('Warning: project created, but unable to attach shared libraries (missing project id).'))
        console.log(chalk.dim('Continuing with blank shared libraries.'))
      } else {
        await addProjectLibraries(createdId, [String(libId)], authToken)
        console.log(chalk.gray(`Shared library added: ${chalk.cyan(defaultLibraryKey)}`))
      }
    } catch (err) {
      console.log(chalk.yellow(`Warning: failed to add shared library "${defaultLibraryKey}".`))
      const msg = String(err?.message || '').trim()
      if (msg) console.log(chalk.dim(msg))
      console.log(chalk.dim('Continuing with blank shared libraries.'))
    }
  }

  await scaffoldFiles()

  linkWorkspaceToProject({
    baseDir: absDest,
    apiBaseUrl: cliConfig.apiBaseUrl,
    projectKey: createdKey,
    projectId: createdId,
    branch,
    legacyPatch: {
      key: createdKey,
      version: latestVersion,
      versionId: latestVersionId
    }
  })

  console.log(chalk.green('Platform project created and linked:'))
  console.log(' ', chalk.cyan(createdKey))
  if (createdId) console.log(' ', chalk.dim(createdId))

  await maybeRunConfig()
}

export function registerProjectCreateCommand (projectCmd) {
  projectCmd
    .command('create [dir]')
    .description('Create a new project (platform/local) or link an existing one')
    .option('--create-new', 'Force create new platform project', false)
    .option('--link-existing', 'Force link to existing platform project', false)
    .option('--workspace', 'Scaffold only symbols source files (no full repo, dir: ".")', false)
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
    .option('--blank-shared-libraries', 'Create project with blank shared libraries', false)
    .action(async (dir, opts) => {
      await runProjectCreate(dir, {
        ...opts,
        workspace: !!opts.workspace,
        createNew: !!opts.createNew,
        linkExisting: !!opts.linkExisting
      })
    })
}
