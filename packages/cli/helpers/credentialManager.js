import fs from 'fs'
import path from 'path'
import os from 'os'

const RC_FILE = '.smblsrc'
const DEFAULT_API = 'https://api.symbols.app'
const DEFAULT_LOCAL_CLI_SESSION_KEY = 'supersecret...change-in-production!!!'
const DEFAULT_PROD_CLI_SESSION_KEY =
  'r5jMdknqYjuGeWAsApTvPjaYHjWkdyw70veJye11Mb_vInBmsBZ9RM4GKU2_rm17Z2qvNahbyIV5gQVXY0V9DlUYdflLKd1jYCKSuc9r_xreC9hVEovfbZqmfbOl-JFCN1w1MXEsPNWkWj48nfF6IFfoWH-0hsdQlPBFjW1mv10'

export class CredentialManager {
  constructor() {
    this.rcPath = path.join(os.homedir(), RC_FILE)
  }

  static defaultCliSessionKeyForApiBaseUrl(apiBaseUrl) {
    const baseUrl = (apiBaseUrl || '').trim()
    if (!baseUrl) return null

    // Match the environments used by login.js's websiteFromApi:
    // - production: api.symbols.app -> production session key by default
    // - everything else (dev/staging/test/local/custom): local key by default
    try {
      const u = new URL(baseUrl)
      if (u.host === 'api.symbols.app') return DEFAULT_PROD_CLI_SESSION_KEY
      return DEFAULT_LOCAL_CLI_SESSION_KEY
    } catch (_) {
      // Best-effort fallback if apiBaseUrl is malformed
      if (baseUrl.includes('api.symbols.app')) return DEFAULT_PROD_CLI_SESSION_KEY
      return DEFAULT_LOCAL_CLI_SESSION_KEY
    }
  }

  // --- Low-level helpers ----------------------------------------------------

  loadRaw() {
    try {
      const data = fs.readFileSync(this.rcPath, 'utf8')
      return JSON.parse(data)
    } catch (_) {
      return {}
    }
  }

  saveRaw(obj) {
    try {
      fs.writeFileSync(this.rcPath, JSON.stringify(obj, null, 2))
      return true
    } catch (err) {
      console.error('Failed to save credentials:', err)
      return false
    }
  }

  // Ensure we always work with a "profiles" structure and migrate legacy files
  loadState() {
    const raw = this.loadRaw()
    if (raw && typeof raw === 'object' && raw.profiles) return raw

    // Legacy shape: single set of credentials at the top level
    const {
      authToken,
      token,
      accessToken,
      jwt,
      refreshToken,
      authTokenExpiresAt,
      userId,
      email,
      apiBaseUrl,
      ...rest
    } = raw || {}

    const legacyToken = authToken || token || accessToken || jwt
    const hasLegacyCreds =
      legacyToken || refreshToken || authTokenExpiresAt || userId || email

    if (!hasLegacyCreds) {
      // Nothing to migrate
      return raw || {}
    }

    const baseUrl = apiBaseUrl || DEFAULT_API
    const profileCreds = {
      authToken: legacyToken || null,
      refreshToken: refreshToken || null,
      authTokenExpiresAt: authTokenExpiresAt || null,
      userId: userId || null,
      email: email || null,
      apiBaseUrl: baseUrl
    }

    const migrated = {
      ...rest,
      profiles: { [baseUrl]: profileCreds },
      currentApiBaseUrl: baseUrl
    }

    this.saveRaw(migrated)
    return migrated
  }

  getProfiles() {
    const state = this.loadState()
    return state.profiles || {}
  }

  getCurrentApiBaseUrl() {
    const state = this.loadState()
    return state.currentApiBaseUrl || DEFAULT_API
  }

  getCliSessionKey(apiBaseUrl) {
    // Allow overriding via env (useful for CI / debugging)
    const envKey =
      process.env.SYMBOLS_CLI_SESSION_KEY ||
      process.env.SMBLS_CLI_SESSION_KEY ||
      process.env.PLUGIN_CLI_SESSION_KEY
    if (envKey) return envKey

    const state = this.loadState() || {}
    const baseUrl = apiBaseUrl || state.currentApiBaseUrl || DEFAULT_API

    // Prefer explicit mapping, then per-profile field
    const mapped = state.cliSessionKeys && typeof state.cliSessionKeys === 'object'
      ? state.cliSessionKeys[baseUrl]
      : null
    if (mapped) return mapped

    const profileKey =
      state.profiles && typeof state.profiles === 'object'
        ? state.profiles[baseUrl]?.cliSessionKey
        : null
    if (profileKey) return profileKey

    // Fall back to environment defaults (e.g. localhost)
    return CredentialManager.defaultCliSessionKeyForApiBaseUrl(baseUrl)
  }

  setCliSessionKey(apiBaseUrl, cliSessionKey) {
    const state = this.loadState() || {}
    const baseUrl = apiBaseUrl || state.currentApiBaseUrl || DEFAULT_API
    const nextKey = (cliSessionKey || '').trim()

    const next = { ...state }

    // Store in a dedicated map keyed by API base URL
    const prevMap = (state.cliSessionKeys && typeof state.cliSessionKeys === 'object')
      ? state.cliSessionKeys
      : {}
    const nextMap = { ...prevMap }

    if (!nextKey) {
      delete nextMap[baseUrl]
    } else {
      nextMap[baseUrl] = nextKey
    }

    next.cliSessionKeys = nextMap

    // Also mirror into the profile (handy for humans inspecting ~/.smblsrc)
    const profiles = (state.profiles && typeof state.profiles === 'object') ? state.profiles : {}
    const existing = profiles[baseUrl] || {}
    const updatedProfile = { ...existing }
    if (!nextKey) delete updatedProfile.cliSessionKey
    else updatedProfile.cliSessionKey = nextKey
    next.profiles = { ...profiles, [baseUrl]: updatedProfile }

    this.saveRaw(next)
    return next
  }

  setCurrentApiBaseUrl(apiBaseUrl) {
    const state = this.loadState()
    const next = { ...state, currentApiBaseUrl: apiBaseUrl || DEFAULT_API }
    this.saveRaw(next)
    return next
  }

  // --- High-level token helpers ---------------------------------------------

  // Get stored auth token for a specific API base URL (or current if omitted)
  getAuthToken(apiBaseUrl) {
    const envToken = process.env.SYMBOLS_TOKEN || process.env.SMBLS_TOKEN
    if (envToken) return envToken

    const state = this.loadState() || {}
    const baseUrl = apiBaseUrl || state.currentApiBaseUrl || DEFAULT_API

    if (state.profiles && typeof state.profiles === 'object') {
      const profile = state.profiles[baseUrl] || {}
      return (
        profile.authToken ||
        profile.token ||
        profile.accessToken ||
        profile.jwt ||
        null
      )
    }

    // Fallback: legacy flat shape
    return (
      state.authToken ||
      state.token ||
      state.accessToken ||
      state.jwt ||
      null
    )
  }

  // Ensure token presence; returns token or null
  ensureAuthToken(apiBaseUrl) {
    const token = this.getAuthToken(apiBaseUrl)
    return token || null
  }

  // Optional: get refresh token if present
  getRefreshToken(apiBaseUrl) {
    const envToken = process.env.SYMBOLS_REFRESH_TOKEN
    if (envToken) return envToken

    const state = this.loadState() || {}
    const baseUrl = apiBaseUrl || state.currentApiBaseUrl || DEFAULT_API

    if (state.profiles && typeof state.profiles === 'object') {
      return state.profiles[baseUrl]?.refreshToken || null
    }

    return state.refreshToken || null
  }

  // Save credentials for a specific API base URL
  saveCredentials(credentials) {
    const state = this.loadState() || {}
    const baseUrl = credentials.apiBaseUrl || state.currentApiBaseUrl || DEFAULT_API
    const profiles = state.profiles || {}
    const existing = profiles[baseUrl] || {}

    const mergedProfile = { ...existing, ...credentials, apiBaseUrl: baseUrl }

    const next = {
      ...state,
      profiles: { ...profiles, [baseUrl]: mergedProfile },
      currentApiBaseUrl: baseUrl
    }

    return this.saveRaw(next)
  }

  // Clear stored credentials; if apiBaseUrl provided, clear only that profile
  clearCredentials(apiBaseUrl) {
    const state = this.loadState() || {}

    if (!state.profiles || typeof state.profiles !== 'object') {
      // Legacy: remove entire file
      try {
        fs.unlinkSync(this.rcPath)
        return true
      } catch (_) {
        return false
      }
    }

    const baseUrl = apiBaseUrl || state.currentApiBaseUrl
    if (!baseUrl) return false

    const { [baseUrl]: _, ...restProfiles } = state.profiles
    const next = { ...state, profiles: restProfiles }
    this.saveRaw(next)
    return true
  }
}
