#!/usr/bin/env node

import chalk from 'chalk'
import fs from 'fs'
import path from 'path'
import { program } from './program.js'
import { CredentialManager } from '../helpers/credentialManager.js'
import { loadCliConfig } from '../helpers/config.js'
import { showAuthRequiredMessages } from '../helpers/buildMessages.js'
import { createLocalTemplate } from '../helpers/localTemplateCreate.js'
import { linkWorkspaceToProject } from '../helpers/projectConfigLink.js'
import { normalizeProjectKey, suggestProjectKeyFromName, isProbablyProjectId } from '../helpers/projectKeyUtils.js'
import {
  listProjects,
  listAvailableLibraries,
  checkProjectKey,
  createProject,
  deleteProject,
  patchProject,
  postChanges,
  duplicateProject,
  getProjectByKey
} from '../helpers/projectsApi.js'
import {
  promptProjectCreateMode,
  promptProjectName,
  promptProjectType,
  promptProjectKey,
  selectProjectPaged,
  confirmPrompt
} from '../helpers/projectPrompts.js'

function ensureDir (dir) {
  try {
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
  } catch (_) {
    // ignore
  }
}

function resolveAuthOrExit () {
  const cliConfig = loadCliConfig()
  const credManager = new CredentialManager()
  const authToken = credManager.ensureAuthToken(cliConfig.apiBaseUrl)
  if (!authToken) {
    showAuthRequiredMessages()
    process.exit(1)
  }
  return { cliConfig, authToken }
}

function resolveMaybeAuth () {
  const cliConfig = loadCliConfig()
  const credManager = new CredentialManager()
  const authToken = credManager.getAuthToken(cliConfig.apiBaseUrl)
  return { cliConfig, authToken }
}

function parseFrameworkFromOptions (options = {}) {
  let framework = 'domql'
  if (options.react) framework = 'react'
  else if (options.angular) framework = 'angular'
  else if (options.vue2) framework = 'vue2'
  else if (options.vue3) framework = 'vue3'
  return framework
}

function parseJsonArg (raw) {
  if (raw === undefined || raw === null) return null
  if (typeof raw !== 'string') return null
  const s = raw.trim()
  if (!s) return null
  try {
    return JSON.parse(s)
  } catch (err) {
    const e = new Error(`Invalid JSON: ${err.message}`)
    e.cause = err
    throw e
  }
}

function readJsonFile (filePath) {
  const abs = path.resolve(filePath)
  const content = fs.readFileSync(abs, 'utf8')
  return JSON.parse(content)
}

function pickProjectId (data) {
  return (
    data?.id ||
    data?._id ||
    data?.projectId ||
    data?.projectInfo?.id ||
    null
  )
}

function pickProjectKey (data) {
  return data?.key || data?.projectKey || data?.projectInfo?.key || null
}

async function resolveProjectIdOrExit ({ value, authToken }) {
  const raw = String(value || '').trim()
  if (!raw) {
    console.error(chalk.red('Missing project identifier (project key or id).'))
    process.exit(1)
  }

  if (isProbablyProjectId(raw)) return raw

  const projectKey = normalizeProjectKey(raw)

  try {
    const proj = await getProjectByKey(projectKey, authToken)
    const id = pickProjectId(proj)
    if (id) return id
  } catch (_) {
    // fallback to check-key
  }

  try {
    const info = await checkProjectKey(projectKey, authToken, { returnId: true })
    if (info?.available === false && info?.id) return info.id
  } catch (_) {
    // ignore
  }

  console.error(chalk.red('Project not found (or access denied):'), projectKey)
  process.exit(1)
}

async function ensureAvailableKeyOrExit ({ projectKey, authToken }) {
  for (;;) {
    const info = await checkProjectKey(projectKey, authToken)
    if (info?.available) return projectKey
    console.log(chalk.yellow(`Key is not available: ${projectKey}`))
    const next = await promptProjectKey({ defaultKey: projectKey })
    projectKey = normalizeProjectKey(next)
  }
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
    const framework = parseFrameworkFromOptions(options)
    await createLocalTemplate({
      destDir: absDest,
      framework,
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

  const framework = parseFrameworkFromOptions(options)
  await createLocalTemplate({
    destDir: absDest,
    framework,
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

const projectCmd = program
  .command('project')
  .description('Project lifecycle management')

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
  .option('--domql', 'Use DOMQL template', true)
  .option('--react', 'Use React template')
  .option('--angular', 'Use Angular template')
  .option('--vue2', 'Use Vue2 template')
  .option('--vue3', 'Use Vue3 template')
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

projectCmd
  .command('delete <projectKeyOrId>')
  .description('Delete a platform project')
  .option('--yes', 'Skip confirmation prompt', false)
  .action(async (value, opts) => {
    const { authToken } = resolveAuthOrExit()
    const projectId = await resolveProjectIdOrExit({ value, authToken })
    if (!opts.yes) {
      const ok = await confirmPrompt(`Delete project ${projectId}?`, false)
      if (!ok) {
        console.log(chalk.dim('Cancelled.'))
        return
      }
    }
    await deleteProject(projectId, authToken)
    console.log(chalk.green('Deleted project:'), chalk.dim(projectId))
  })

projectCmd
  .command('update <projectKeyOrId>')
  .description('Update project metadata or content changes')
  .option('--meta <json>', 'JSON for PATCH /projects/:id')
  .option('--meta-file <path>', 'JSON file for PATCH /projects/:id')
  .option('--changes <json>', 'JSON for POST /projects/:id/changes')
  .option('--changes-file <path>', 'JSON file for POST /projects/:id/changes')
  .action(async (value, opts) => {
    const { authToken } = resolveAuthOrExit()
    const projectId = await resolveProjectIdOrExit({ value, authToken })

    const meta = opts.metaFile ? readJsonFile(opts.metaFile) : parseJsonArg(opts.meta)
    const changes = opts.changesFile ? readJsonFile(opts.changesFile) : parseJsonArg(opts.changes)

    if (meta && changes) {
      console.error(chalk.red('Use either --meta/--meta-file OR --changes/--changes-file (not both).'))
      process.exit(1)
    }
    if (!meta && !changes) {
      console.error(chalk.red('Missing update payload. Provide --meta/--meta-file or --changes/--changes-file.'))
      process.exit(1)
    }

    if (meta) {
      const updated = await patchProject(projectId, meta, authToken)
      console.log(JSON.stringify(updated, null, 2))
      return
    }

    const result = await postChanges(projectId, authToken, changes || {})
    console.log(JSON.stringify(result, null, 2))
  })

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

const libsCmd = projectCmd
  .command('libs')
  .description('Project libraries')

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
  .option('--domql', 'Use DOMQL template', true)
  .option('--react', 'Use React template')
  .option('--angular', 'Use Angular template')
  .option('--vue2', 'Use Vue2 template')
  .option('--vue3', 'Use Vue3 template')
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

    const framework = parseFrameworkFromOptions(opts)
    await createLocalTemplate({
      destDir: absDest,
      framework,
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
