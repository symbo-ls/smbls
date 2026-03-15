import fs from 'fs'
import path from 'path'
import { CredentialManager } from './credentialManager.js'

// Configuration layout
//
// symbols.json              -> project identity (key, branch, version, dir, sharedLibraries) — git-tracked
// .symbols_local/config.json -> tooling + API config (bundler, packageManager, runtime, deploy, apiBaseUrl, projectKey, projectId) — git-tracked
// .symbols_local/lock.json   -> snapshot metadata (etag, version, projectId, pulledAt) — gitignored
// .symbols_local/project.json -> full project snapshot — gitignored
// .symbols_local/libs/        -> scaffolded shared libraries (read-only) — gitignored
//
// Backward compatibility:
//  - Auto-migrate .symbols/ and .symbols_cache/ → .symbols_local/ on load
//  - Read legacy .smblsrc when present
//  - Read tooling fields from symbols.json when not yet in config.json

const CWD = process.cwd()

/**
 * Find the project root by walking up from CWD looking for symbols.json.
 * Falls back to CWD if not found.
 */
function findProjectRoot () {
  let dir = CWD
  while (true) {
    if (fs.existsSync(path.join(dir, 'symbols.json'))) return dir
    const parent = path.dirname(dir)
    if (parent === dir) break
    dir = parent
  }
  return CWD
}

const PROJECT_ROOT = findProjectRoot()
const SYMBOLS_LOCAL_DIR = path.join(PROJECT_ROOT, '.symbols_local')

// Auto-migrate legacy dirs → .symbols_local
const LEGACY_DIRS = [
  path.join(PROJECT_ROOT, '.symbols'),
  path.join(PROJECT_ROOT, '.symbols_cache')
]
for (const legacyDir of LEGACY_DIRS) {
  if (fs.existsSync(legacyDir) && !fs.existsSync(SYMBOLS_LOCAL_DIR)) {
    try { fs.renameSync(legacyDir, SYMBOLS_LOCAL_DIR) } catch (_) {}
  }
}

const CONFIG_PATH = path.join(SYMBOLS_LOCAL_DIR, 'config.json')
const LOCK_PATH = path.join(SYMBOLS_LOCAL_DIR, 'lock.json')
const PROJECT_JSON_PATH = path.join(SYMBOLS_LOCAL_DIR, 'project.json')
const LIBS_DIR = path.join(SYMBOLS_LOCAL_DIR, 'libs')
const LEGACY_RC_PATH = path.join(PROJECT_ROOT, '.smblsrc')
const LEGACY_SYMBOLS_JSON = path.join(PROJECT_ROOT, 'symbols.json')

function ensureDir (dir) {
  try {
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
  } catch (_) {}
}

function readJsonSafe (filePath) {
  try {
    if (!fs.existsSync(filePath)) return null
    const content = fs.readFileSync(filePath, 'utf8')
    return JSON.parse(content)
  } catch (_) {
    return null
  }
}

function writeJsonSafe (filePath, data) {
  ensureDir(path.dirname(filePath))
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2))
}

export function getConfigPaths () {
  return {
    projectRoot: PROJECT_ROOT,
    symbolsLocalDir: SYMBOLS_LOCAL_DIR,
    configPath: CONFIG_PATH,
    lockPath: LOCK_PATH,
    projectPath: PROJECT_JSON_PATH,
    libsDir: LIBS_DIR,
    legacySmblsrc: LEGACY_RC_PATH,
    legacySymbolsJson: LEGACY_SYMBOLS_JSON
  }
}

export function loadCliConfig () {
  // Env overrides first
  const envApi =
    process.env.SYMBOLS_API_BASE_URL ||
    process.env.SMBLS_API_URL // backward compat
  const envProjectKey = process.env.SYMBOLS_PROJECT_KEY
  const envProjectId = process.env.SYMBOLS_PROJECT_ID
  const envBranch = process.env.SYMBOLS_BRANCH

  // .symbols_local/config.json
  const localConfig = readJsonSafe(CONFIG_PATH) || {}

  // symbols.json (project identity + legacy tooling fields)
  const symbolsJson = readJsonSafe(LEGACY_SYMBOLS_JSON) || {}

  // Legacy rc might include apiUrl
  const legacyRc = readJsonSafe(LEGACY_RC_PATH) || {}

  // Prefer explicit env / config.json, then legacy rc, then global current server
  let apiBaseUrl =
    envApi ||
    localConfig.apiBaseUrl ||
    legacyRc.apiUrl

  if (!apiBaseUrl) {
    const credManager = new CredentialManager()
    apiBaseUrl = credManager.getCurrentApiBaseUrl()
  }

  if (!apiBaseUrl) {
    apiBaseUrl = 'https://api.symbols.app'
  }

  // Lock file for branch/version state
  const lock = readJsonSafe(LOCK_PATH) || {}

  const projectKey = envProjectKey || localConfig.projectKey || symbolsJson.key
  const projectId = envProjectId || localConfig.projectId || lock.projectId || null
  const branch = envBranch || lock.branch || localConfig.branch || symbolsJson.branch || 'main'
  const version = lock.version || symbolsJson.version || null

  // Tooling: prefer config.json, fall back to symbols.json for migration
  const bundler = localConfig.bundler || symbolsJson.bundler || null
  const packageManager = localConfig.packageManager || symbolsJson.packageManager || null
  const runtime = localConfig.runtime || symbolsJson.runtime || null
  const deploy = localConfig.deploy || symbolsJson.deploy || null

  return {
    apiBaseUrl,
    projectKey,
    projectId,
    branch,
    version,
    bundler,
    packageManager,
    runtime,
    deploy,
    _raw: {
      localConfig,
      symbolsJson,
      lock,
      legacyRc
    }
  }
}

export function saveCliConfig (partial) {
  const current = readJsonSafe(CONFIG_PATH) || {}
  const next = { ...current, ...partial }
  writeJsonSafe(CONFIG_PATH, next)
  return next
}

export function readLock () {
  return readJsonSafe(LOCK_PATH) || {}
}

export function writeLock (partial) {
  const current = readJsonSafe(LOCK_PATH) || {}
  const next = { ...current, ...partial }
  writeJsonSafe(LOCK_PATH, next)
  return next
}

export function getApiUrl () {
  const { apiBaseUrl } = loadCliConfig()
  return apiBaseUrl
}

export function getProjectKeyOrId () {
  const { projectKey, projectId } = loadCliConfig()
  return { projectKey, projectId }
}

export function getBranch () {
  const { branch } = loadCliConfig()
  return branch || 'main'
}

export function ensureSymbolsLocalDir () {
  ensureDir(SYMBOLS_LOCAL_DIR)
  return SYMBOLS_LOCAL_DIR
}

/**
 * Resolve the default shared libraries directory.
 * Default: .symbols_local/libs/
 * Can be overridden per-lib via sharedLibraries[].destDir in symbols.json.
 */
export function getLibsDir () {
  return LIBS_DIR
}

// Update symbols.json (project identity fields only)
export function updateSymbolsJson (partial) {
  const current = readJsonSafe(LEGACY_SYMBOLS_JSON) || {}
  const cleaned = Object.fromEntries(Object.entries(partial).filter(([, v]) => v != null))
  const next = { ...current, ...cleaned }
  writeJsonSafe(LEGACY_SYMBOLS_JSON, next)
  return next
}

// Backward compat alias
export const updateLegacySymbolsJson = updateSymbolsJson
export const ensureSymbolsDir = ensureSymbolsLocalDir
