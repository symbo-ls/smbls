import inquirer from 'inquirer'
import chalk from 'chalk'
import { listProjects } from './projectsApi.js'

export async function promptProjectCreateMode () {
  const res = await inquirer.prompt([{
    name: 'mode',
    type: 'list',
    message: 'Project setup:',
    choices: [
      { name: 'Create new project on platform + set up local folder', value: 'create_new' },
      { name: 'Link local folder to an existing platform project', value: 'link_existing' },
      { name: 'Local-only (no platform)', value: 'local_only' }
    ],
    pageSize: 10
  }])
  return res.mode
}

export async function promptProjectName ({ defaultName } = {}) {
  const res = await inquirer.prompt([{
    name: 'name',
    type: 'input',
    message: 'Project name:',
    default: defaultName || undefined,
    validate: (v) => String(v || '').trim() ? true : 'Project name is required'
  }])
  return String(res.name || '').trim()
}

export async function promptProjectType ({ defaultType } = {}) {
  const res = await inquirer.prompt([{
    name: 'projectType',
    type: 'list',
    message: 'Project type:',
    choices: [
      { name: 'app', value: 'app' },
      { name: 'library', value: 'library' },
      { name: 'platform', value: 'platform' },
      { name: 'custom…', value: '__custom__' }
    ],
    default: defaultType || 'app',
    pageSize: 10
  }])

  if (res.projectType !== '__custom__') return res.projectType

  const custom = await inquirer.prompt([{
    name: 'customType',
    type: 'input',
    message: 'Enter custom projectType:',
    validate: (v) => String(v || '').trim() ? true : 'projectType is required'
  }])
  return String(custom.customType || '').trim()
}

export async function promptProjectKey ({ defaultKey } = {}) {
  const res = await inquirer.prompt([{
    name: 'projectKey',
    type: 'input',
    message: 'Project key (e.g. my-project.symbo.ls):',
    default: defaultKey || undefined,
    validate: (v) => String(v || '').trim() ? true : 'Project key is required'
  }])
  return String(res.projectKey || '').trim()
}

export async function promptProjectSharedLibrariesMode ({ defaultMode } = {}) {
  const res = await inquirer.prompt([{
    name: 'mode',
    type: 'list',
    message: 'Shared libraries:',
    choices: [
      { name: chalk.bold('Default') + chalk.dim(' (recommended: add default.symbo.ls)'), value: 'default' },
      { name: 'Blank', value: 'blank' }
    ],
    default: defaultMode || 'default',
    pageSize: 10
  }])
  return res.mode
}

export async function confirmPrompt (message, defaultValue = false) {
  const res = await inquirer.prompt([{
    name: 'ok',
    type: 'confirm',
    message,
    default: !!defaultValue
  }])
  return !!res.ok
}

function formatProjectChoice (p) {
  const key = p?.key || p?.projectKey || ''
  const name = p?.name || ''
  const id = p?.id || p?._id || p?.projectId || ''
  const suffix = id ? chalk.dim(` ${id}`) : ''
  return `${chalk.bold(name || key || id)}${key ? chalk.dim(`  ${key}`) : ''}${suffix}`
}

export async function selectProjectPaged ({ authToken, pageSize = 20, initialSearch = '' } = {}) {
  let page = 1
  let search = String(initialSearch || '').trim()

  for (;;) {
    let payload
    try {
      payload = await listProjects({ page, limit: pageSize, search }, authToken)
    } catch (err) {
      const msg = err?.message || 'Failed to list projects'
      throw new Error(msg)
    }

    const items = Array.isArray(payload?.items)
      ? payload.items
      : (Array.isArray(payload) ? payload : (payload?.data || payload?.projects || []))

    const meta = payload?.meta || payload?.pagination || payload || {}
    const totalPages = Number(meta?.totalPages || meta?.pages || 0) || 0

    const choices = []
    if (items.length) {
      for (const p of items) {
        choices.push({ name: formatProjectChoice(p), value: { project: p } })
      }
    } else {
      choices.push({ name: chalk.dim('No projects found for this page/search.'), value: { noop: true } })
    }

    choices.push(new inquirer.Separator())
    choices.push({ name: 'Paste project key or id…', value: { action: 'paste' } })
    choices.push({ name: 'Change search…', value: { action: 'search' } })
    if (page > 1) choices.push({ name: 'Previous page', value: { action: 'prev' } })
    if (!totalPages || page < totalPages) choices.push({ name: 'Next page', value: { action: 'next' } })
    choices.push({ name: 'Cancel', value: { action: 'cancel' } })

    const header = []
    header.push('Select a project')
    if (search) header.push(chalk.dim(`(search: "${search}")`))
    header.push(chalk.dim(`(page ${page}${totalPages ? `/${totalPages}` : ''})`))

    const res = await inquirer.prompt([{
      name: 'selected',
      type: 'list',
      message: header.join(' '),
      choices,
      pageSize: Math.min(20, choices.length)
    }])

    const sel = res.selected || {}
    if (sel.project) return sel.project
    if (sel.noop) continue

    if (sel.action === 'cancel') return null
    if (sel.action === 'next') {
      page += 1
      continue
    }
    if (sel.action === 'prev') {
      page = Math.max(1, page - 1)
      continue
    }
    if (sel.action === 'search') {
      const q = await inquirer.prompt([{
        name: 'q',
        type: 'input',
        message: 'Search:',
        default: search || undefined
      }])
      search = String(q.q || '').trim()
      page = 1
      continue
    }
    if (sel.action === 'paste') {
      const v = await inquirer.prompt([{
        name: 'value',
        type: 'input',
        message: 'Enter project key or id:',
        validate: (x) => String(x || '').trim() ? true : 'Value is required'
      }])
      const value = String(v.value || '').trim()
      return { key: value, _id: value, __pasted: true }
    }
  }
}
