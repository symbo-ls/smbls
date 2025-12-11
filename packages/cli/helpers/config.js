import fs from 'fs'
import path from 'path'
import { CredentialManager } from './credentialManager.js'

// New configuration layout
// .symbols/config.json  -> project runtime configuration (apiBaseUrl, projectKey|projectId, branch)
// .symbols/lock.json    -> last pulled snapshot metadata (etag, version, projectId, branch, pulledAt)
// Backward compatibility:
//  - Keep reading legacy .smblsrc and symbols.json when present

const CWD = process.cwd()
const SYMBOLS_DIR = path.join(CWD, '.symbols')
const CONFIG_PATH = path.join(SYMBOLS_DIR, 'config.json')
const LOCK_PATH = path.join(SYMBOLS_DIR, 'lock.json')
const PROJECT_JSON_PATH = path.join(SYMBOLS_DIR, 'project.json')
const LEGACY_RC_PATH = path.join(CWD, '.smblsrc')
const LEGACY_SYMBOLS_JSON = path.join(CWD, 'symbols.json')

function ensureDir(dir) {
  try {
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
  } catch (_) {
    // ignore
  }
}

function readJsonSafe(filePath) {
  try {
    if (!fs.existsSync(filePath)) return null
    const content = fs.readFileSync(filePath, 'utf8')
    return JSON.parse(content)
  } catch (_) {
    return null
  }
}

function writeJsonSafe(filePath, data) {
  ensureDir(path.dirname(filePath))
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2))
}

export function getConfigPaths() {
  return {
    symbolsDir: SYMBOLS_DIR,
    configPath: CONFIG_PATH,
    lockPath: LOCK_PATH,
    projectPath: PROJECT_JSON_PATH,
    legacySmblsrc: LEGACY_RC_PATH,
    legacySymbolsJson: LEGACY_SYMBOLS_JSON
  }
}

export function loadCliConfig() {
  // Env overrides first
  const envApi =
    process.env.SYMBOLS_API_BASE_URL ||
    process.env.SMBLS_API_URL // backward compat
  const envProjectKey = process.env.SYMBOLS_PROJECT_KEY
  const envProjectId = process.env.SYMBOLS_PROJECT_ID
  const envBranch = process.env.SYMBOLS_BRANCH

  // New config layout
  const symbolsConfig = readJsonSafe(CONFIG_PATH) || {}

  // Legacy project identifiers and defaults from symbols.json
  const legacySymbols = readJsonSafe(LEGACY_SYMBOLS_JSON) || {}

  // Legacy rc might include apiUrl
  const legacyRc = readJsonSafe(LEGACY_RC_PATH) || {}

  // Prefer explicit env / project config, then legacy rc, then global current server
  let apiBaseUrl =
    envApi ||
    symbolsConfig.apiBaseUrl ||
    legacyRc.apiUrl

  if (!apiBaseUrl) {
    const credManager = new CredentialManager()
    apiBaseUrl = credManager.getCurrentApiBaseUrl()
  }

  if (!apiBaseUrl) {
    // default to production if nothing set anywhere
    apiBaseUrl = 'https://api.symbols.app'
  }

  const projectKey = envProjectKey || symbolsConfig.projectKey || legacySymbols.key
  const projectId = envProjectId || symbolsConfig.projectId || null
  const branch = envBranch || symbolsConfig.branch || legacySymbols.branch || 'main'

  return {
    apiBaseUrl,
    projectKey,
    projectId,
    branch,
    // expose raw sources for advanced usage
    _raw: {
      symbolsConfig,
      legacySymbols,
      legacyRc
    }
  }
}

export function saveCliConfig(partial) {
  const current = readJsonSafe(CONFIG_PATH) || {}
  const next = { ...current, ...partial }
  writeJsonSafe(CONFIG_PATH, next)
  return next
}

export function readLock() {
  return readJsonSafe(LOCK_PATH) || {}
}

export function writeLock(partial) {
  const current = readJsonSafe(LOCK_PATH) || {}
  const next = { ...current, ...partial }
  writeJsonSafe(LOCK_PATH, next)
  return next
}

export function getApiUrl() {
  // Prefer new env var and config
  const { apiBaseUrl } = loadCliConfig()
  return apiBaseUrl
}

export function getProjectKeyOrId() {
  const { projectKey, projectId } = loadCliConfig()
  return { projectKey, projectId }
}

export function getBranch() {
  const { branch } = loadCliConfig()
  return branch || 'main'
}

export function ensureSymbolsDir() {
  ensureDir(SYMBOLS_DIR)
  return SYMBOLS_DIR
}

// Helper for legacy projects to keep version/branch updates in symbols.json
export function updateLegacySymbolsJson(partial) {
  const current = readJsonSafe(LEGACY_SYMBOLS_JSON) || {}
  const next = { ...current, ...partial }
  writeJsonSafe(LEGACY_SYMBOLS_JSON, next)
  return next
}
