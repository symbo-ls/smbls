import path from 'path'
import chalk from 'chalk'
import { loadModule } from '../bin/require.js'
import { getConfigPaths } from './config.js'

const RC_PATH = getConfigPaths().legacySymbolsJson

export const loadSymbolsConfig = async (options = {}) => {
  const {
    required = true,
    validateKey = true,
    silent = false
  } = options

  try {
    const config = await loadModule(RC_PATH, { json: true })

    if (validateKey && (!config || !config.key)) {
      throw new Error('Missing app key in symbols.json')
    }

    return config
  } catch (error) {
    if (error.message.includes('Missing app key')) {
      console.error(chalk.bold.red('\nInvalid symbols.json configuration:'))
      console.error(chalk.white('The file must contain a valid app key.'))
      console.error(chalk.bold.yellow('\nExample symbols.json:'))
      console.error(chalk.cyan(JSON.stringify({ key: 'your.app.key' }, null, 2)))
    } else if (!silent) {
      console.error(chalk.bold.red('Please include symbols.json in your repository root'))
    }

    if (required) process.exit(1)
    return null
  }
}

/**
 * Resolve the effective dist directory for the current workspace.
 *
 * Precedence:
 *  - explicit override (e.g. CLI flag)
 *  - symbols.json.distDir
 *
 * Returns an absolute path when possible; null when no distDir
 * configuration is available so callers can decide on a default.
 */
export function resolveDistDir (symbolsConfig, options = {}) {
  const cfg = symbolsConfig || {}
  const {
    // Prefer explicit override from callers (e.g. CLI flag)
    distDirOverride,
    distDir: overrideDistDir,
    cwd = process.cwd()
  } = options

  const raw =
    distDirOverride ||
    overrideDistDir ||
    cfg.distDir ||
    cfg.dir

  if (!raw) return null

  // If already absolute, return as-is; otherwise resolve against cwd
  if (path.isAbsolute(raw)) return raw
  return path.resolve(cwd, raw)
}

/**
 * Resolve the effective libraries directory for shared libraries.
 *
 * Default: .symbols_local/libs/
 * Can be overridden via symbols.json.librariesDir or CLI flag.
 *
 * Returns an absolute path.
 */
export function resolveLibrariesDir (symbolsConfig, options = {}) {
  const cfg = symbolsConfig || {}
  const {
    librariesDirOverride,
    cwd = getConfigPaths().projectRoot
  } = options

  const raw = librariesDirOverride || cfg.librariesDir || './.symbols_local/libs'

  if (path.isAbsolute(raw)) return raw
  return path.resolve(cwd, raw)
}

/**
 * Normalize shared libraries config from symbols.json into a uniform array.
 *
 * Supported formats in symbols.json:
 *   1. Array of keys:     ["one", "two"]
 *   2. Object key:version: { one: "1.0.0", two: "latest" }
 *   3. Object key:config:  { one: { version: "1.0.0", destDir: "./custom" } }
 *
 * Returns: [{ key: "one", version: "1.0.0", destDir: null }, ...]
 */

// ── KV helpers ────────────────────────────────────────────────────────────────

const KV_BASE_URLS = {
  development: 'https://smbls-kv-dev.nika-980.workers.dev',
  staging: 'https://smbls-kv-staging.nika-980.workers.dev',
  production: 'https://smbls-kv.nika-980.workers.dev'
}

/**
 * Resolve whether KV mode is active.
 * Can be set via CLI flag --use-kv or symbols.json { "useKV": true }
 */
export function resolveUseKV (symbolsConfig, options = {}) {
  if (options.useKv) return true
  const cfg = symbolsConfig || {}
  return !!(cfg.useKV)
}

/**
 * Get the KV service base URL for the current environment.
 */
export function getKvBaseUrl (env) {
  const kvUrl = process.env.SMBLS_KV_URL
  if (kvUrl) return kvUrl
  return KV_BASE_URLS[env] || KV_BASE_URLS.production
}

/**
 * Fetch project JSON from KV by key.
 */
export async function kvGet (projectKey, opts = {}) {
  const baseUrl = getKvBaseUrl(opts.env || 'development')
  const url = `${baseUrl}/kv/${encodeURIComponent(projectKey)}`
  const response = await fetch(url, { method: 'GET' })
  if (response.status === 404) return null
  if (!response.ok) {
    const data = await response.json().catch(() => null)
    throw new Error(data?.error || `KV fetch failed (${response.status})`)
  }
  const json = await response.json()
  return json?.value || null
}

/**
 * Store project JSON in KV by key.
 */
export async function kvPut (projectKey, value, opts = {}) {
  const baseUrl = getKvBaseUrl(opts.env || 'development')
  const url = `${baseUrl}/kv/${encodeURIComponent(projectKey)}`
  const response = await fetch(url, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ value })
  })
  if (!response.ok) {
    const data = await response.json().catch(() => null)
    throw new Error(data?.error || `KV put failed (${response.status})`)
  }
  return await response.json()
}

/**
 * Deep merge where `ours` (local) takes priority.
 * Only fills in keys from `theirs` (remote) that are missing in `ours`.
 * Works recursively on plain objects; for non-object values, `ours` always wins.
 */
export function deepMergeOurs (ours, theirs) {
  if (!theirs || typeof theirs !== 'object' || Array.isArray(theirs)) return ours
  if (!ours || typeof ours !== 'object' || Array.isArray(ours)) return ours

  const result = { ...ours }
  for (const key of Object.keys(theirs)) {
    if (!Object.prototype.hasOwnProperty.call(result, key)) {
      // Key missing locally — take from remote
      result[key] = theirs[key]
    } else if (
      result[key] && typeof result[key] === 'object' && !Array.isArray(result[key]) &&
      theirs[key] && typeof theirs[key] === 'object' && !Array.isArray(theirs[key])
    ) {
      // Both are objects — recurse
      result[key] = deepMergeOurs(result[key], theirs[key])
    }
    // Otherwise local wins, do nothing
  }
  return result
}

export function normalizeSharedLibrariesConfig (raw) {
  if (!raw) return []

  // Format 1: array of strings (or objects with key)
  if (Array.isArray(raw)) {
    return raw.map(item => {
      if (typeof item === 'string') return { key: item, version: null, destDir: null }
      if (item && typeof item === 'object') return { key: item.key || item.name, version: item.version || null, destDir: item.destDir || null }
      return null
    }).filter(Boolean)
  }

  // Formats 2 & 3: object
  if (typeof raw === 'object') {
    return Object.entries(raw).map(([key, value]) => {
      if (typeof value === 'string') return { key, version: value, destDir: null }
      if (value && typeof value === 'object') return { key, version: value.version || null, destDir: value.destDir || null, ...value }
      return { key, version: null, destDir: null }
    })
  }

  return []
}
