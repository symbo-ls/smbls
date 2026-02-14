import chalk from 'chalk'
import fs from 'fs'
import path from 'path'
import { CredentialManager } from '../../helpers/credentialManager.js'
import { loadCliConfig } from '../../helpers/config.js'
import { showAuthRequiredMessages } from '../../helpers/buildMessages.js'
import { normalizeProjectKey, isProbablyProjectId } from '../../helpers/projectKeyUtils.js'
import { checkProjectKey, getProjectByKey } from '../../helpers/projectsApi.js'
import { promptProjectKey } from '../../helpers/projectPrompts.js'

export function ensureDir (dir) {
  try {
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
  } catch (_) {
    // ignore
  }
}

export function resolveAuthOrExit () {
  const cliConfig = loadCliConfig()
  const credManager = new CredentialManager()
  const authToken = credManager.ensureAuthToken(cliConfig.apiBaseUrl)
  if (!authToken) {
    showAuthRequiredMessages()
    process.exit(1)
  }
  return { cliConfig, authToken }
}

export function resolveMaybeAuth () {
  const cliConfig = loadCliConfig()
  const credManager = new CredentialManager()
  const authToken = credManager.getAuthToken(cliConfig.apiBaseUrl)
  return { cliConfig, authToken }
}

export function parseJsonArg (raw) {
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

export function readJsonFile (filePath) {
  const abs = path.resolve(filePath)
  const content = fs.readFileSync(abs, 'utf8')
  return JSON.parse(content)
}

export function pickProjectId (data) {
  return (
    data?.id ||
    data?._id ||
    data?.projectId ||
    data?.projectInfo?.id ||
    null
  )
}

export function pickProjectKey (data) {
  return data?.key || data?.projectKey || data?.projectInfo?.key || null
}

export async function resolveProjectIdOrExit ({ value, authToken }) {
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

export async function ensureAvailableKeyOrExit ({ projectKey, authToken }) {
  for (;;) {
    const info = await checkProjectKey(projectKey, authToken)
    if (info?.available) return projectKey
    console.log(chalk.yellow(`Key is not available: ${projectKey}`))
    const next = await promptProjectKey({ defaultKey: projectKey })
    projectKey = normalizeProjectKey(next)
  }
}
