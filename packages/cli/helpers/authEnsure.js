import { spawn } from 'child_process'
import { fileURLToPath } from 'url'

import chalk from 'chalk'
import { CredentialManager } from './credentialManager.js'
import { loadCliConfig } from './config.js'

async function getFetchImpl () {
  if (typeof globalThis.fetch === 'function') return globalThis.fetch
  return import('node-fetch').then((mod) => mod.default)
}

function isInteractive ({ nonInteractive } = {}) {
  return !!process.stdin.isTTY && !!process.stdout.isTTY && !nonInteractive
}

async function safeJson (res) {
  try {
    return await res.json()
  } catch (_) {
    return null
  }
}

function base64UrlToUtf8 (input) {
  const s = String(input || '')
    .replace(/-/g, '+')
    .replace(/_/g, '/')
  const padLen = (4 - (s.length % 4)) % 4
  const padded = s + '='.repeat(padLen)
  return Buffer.from(padded, 'base64').toString('utf8')
}

function tryGetJwtExpDate (token) {
  try {
    const parts = String(token || '').split('.')
    if (parts.length < 2) return null
    const payload = JSON.parse(base64UrlToUtf8(parts[1]))
    const exp = payload && typeof payload.exp === 'number' ? payload.exp : null
    if (!exp || !Number.isFinite(exp)) return null
    return new Date(exp * 1000)
  } catch (_) {
    return null
  }
}

async function fetchMe ({ apiBaseUrl, authToken }) {
  const fetchImpl = await getFetchImpl()
  const candidates = [
    // Preferred: matches other CLI endpoints (`/core/auth/login`, `/core/auth/session`, etc.)
    `${apiBaseUrl.replace(/\/+$/, '')}/core/auth/me`,
    // Fallback: some servers mount auth at `/auth/*` (webapp style)
    `${apiBaseUrl.replace(/\/+$/, '')}/auth/me`
  ]

  let last = null
  for (const url of candidates) {
    const res = await fetchImpl(url, {
      method: 'GET',
      headers: { Authorization: `Bearer ${authToken}` }
    })
    const data = await safeJson(res)

    // If the endpoint doesn't exist, try the next candidate.
    if (res.status === 404) {
      last = { ok: false, status: res.status, data, url }
      continue
    }

    if (!res.ok) {
      const err = new Error(data?.message || data?.error || `Failed to get user (${res.status})`)
      err.response = { status: res.status, data, url }
      throw err
    }

    const payload = data?.data || data
    return {
      ok: true,
      url,
      user: payload?.user || payload
    }
  }

  const err = new Error('Unable to validate login status (missing /me endpoint)')
  err.response = { status: last?.status || 404, data: last?.data, url: last?.url }
  throw err
}

function isAuthFailure (err) {
  const status = err?.response?.status
  if (status === 401 || status === 403) return true
  const msg = String(err?.message || '').toLowerCase()
  return msg.includes('invalid token') || msg.includes('jwt expired') || msg.includes('token expired')
}

function extractTokensFromResponse (data) {
  const tokens = data?.data?.tokens || data?.tokens || {}
  const accessToken =
    tokens?.accessToken ||
    data?.token ||
    data?.accessToken ||
    data?.jwt ||
    data?.data?.token ||
    data?.data?.accessToken ||
    data?.data?.jwt
  const refreshToken = tokens?.refreshToken || null
  const accessTokenExp = tokens?.accessTokenExp?.expiresAt || tokens?.accessTokenExp || null
  const refreshTokenExp = tokens?.refreshTokenExp?.expiresAt || tokens?.refreshTokenExp || null
  return { accessToken, refreshToken, accessTokenExp, refreshTokenExp }
}

export async function refreshAuthTokens ({ apiBaseUrl, credManager } = {}) {
  const cm = credManager || new CredentialManager()
  const state = cm.loadState ? cm.loadState() : {}
  const baseUrl = apiBaseUrl || state.currentApiBaseUrl
  if (!baseUrl) {
    const err = new Error('API base URL is required to refresh tokens')
    err.code = 'NO_API_BASE_URL'
    throw err
  }

  const refreshToken = cm.getRefreshToken(baseUrl)
  if (!refreshToken) {
    const err = new Error('Refresh token missing')
    err.code = 'NO_REFRESH_TOKEN'
    throw err
  }

  const fetchImpl = await getFetchImpl()
  const url = `${baseUrl.replace(/\/+$/, '')}/core/auth/refresh`
  const res = await fetchImpl(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ refreshToken })
  })
  const data = await safeJson(res)

  if (res.status === 404) {
    const err = new Error('Unable to refresh token (missing /core/auth/refresh endpoint)')
    err.response = { status: res.status, data, url }
    throw err
  }

  if (!res.ok) {
    const err = new Error(data?.message || data?.error || `Failed to refresh token (${res.status})`)
    err.response = { status: res.status, data, url }
    throw err
  }

  const tokens = extractTokensFromResponse(data)
  const nextAccess = tokens.accessToken
  const nextRefresh = tokens.refreshToken || refreshToken
  if (!nextAccess) {
    throw new Error('Token refresh succeeded but no access token was returned by the server')
  }

  cm.saveCredentials({
    apiBaseUrl: baseUrl,
    authToken: nextAccess,
    refreshToken: nextRefresh,
    authTokenExpiresAt: tokens.accessTokenExp || null,
    refreshTokenExpiresAt: tokens.refreshTokenExp || null
  })

  return {
    apiBaseUrl: baseUrl,
    authToken: nextAccess,
    refreshToken: nextRefresh,
    authTokenExpiresAt: tokens.accessTokenExp || null
  }
}

async function runLoginSubprocess () {
  const indexPath = fileURLToPath(new URL('../bin/index.js', import.meta.url))
  return await new Promise((resolve, reject) => {
    const child = spawn(process.execPath, [indexPath, 'login'], {
      stdio: 'inherit',
      env: process.env
    })
    child.on('error', reject)
    child.on('exit', (code) => {
      if (code === 0) resolve()
      else reject(new Error(`Login process exited with code ${code}`))
    })
  })
}

function getBestEffortTokenExpiresAt ({ credManager, apiBaseUrl, authToken }) {
  return getAuthTokenExpiresAt({ credManager, apiBaseUrl }) || tryGetJwtExpDate(authToken)
}

function shouldRefreshOrReloginByExpiry ({ credManager, apiBaseUrl, authToken }) {
  try {
    const exp = getBestEffortTokenExpiresAt({ credManager, apiBaseUrl, authToken })
    if (!exp) return false
    const ms = exp.getTime()
    if (!Number.isFinite(ms)) return false
    // Small skew so we don't start commands with a token that's about to expire.
    return ms - Date.now() < 30_000
  } catch (_) {
    return false
  }
}

function getAuthTokenExpiresAt ({ credManager, apiBaseUrl }) {
  const state = credManager.loadState ? credManager.loadState() : {}
  const baseUrl = apiBaseUrl || state.currentApiBaseUrl
  if (!baseUrl) return null

  let raw = null
  if (state && typeof state === 'object' && state.profiles && typeof state.profiles === 'object') {
    raw = state.profiles[baseUrl]?.authTokenExpiresAt ?? null
  } else if (state && typeof state === 'object') {
    raw = state.authTokenExpiresAt ?? null
  }

  if (!raw) return null

  if (typeof raw === 'number') return new Date(raw)
  if (typeof raw === 'string') {
    const t = Date.parse(raw)
    if (!Number.isNaN(t)) return new Date(t)
    const n = Number(raw)
    if (Number.isFinite(n)) return new Date(n)
    return null
  }
  if (typeof raw === 'object') {
    const v = raw.expiresAt ?? raw.exp ?? null
    if (typeof v === 'number') return new Date(v)
    if (typeof v === 'string') {
      const t = Date.parse(v)
      if (!Number.isNaN(t)) return new Date(t)
    }
  }
  return null
}

async function ensureTokenPresent ({ apiBaseUrl, nonInteractive }) {
  const credManager = new CredentialManager()
  const interactive = isInteractive({ nonInteractive })

  let token = credManager.getAuthToken(apiBaseUrl)
  const refreshToken = credManager.getRefreshToken(apiBaseUrl)
  const isExpiredSoon = token && shouldRefreshOrReloginByExpiry({ credManager, apiBaseUrl, authToken: token })

  if (!token || isExpiredSoon) {
    if (refreshToken) {
      try {
        const refreshed = await refreshAuthTokens({ apiBaseUrl, credManager })
        token = refreshed.authToken
        return { authToken: token, apiBaseUrl: refreshed.apiBaseUrl, cliConfig: loadCliConfig() }
      } catch (_) {
        // Fall back to login (interactive) or AUTH_REQUIRED (non-interactive)
      }
    }

    if (!interactive) {
      const err = new Error('Authentication required')
      err.code = 'AUTH_REQUIRED'
      err.response = { status: 401, data: { message: 'Missing or expired token' } }
      throw err
    }

    if (isExpiredSoon) {
      console.log(chalk.yellow('\nYour session is about to expire. Refreshing failed; please sign in again.'))
    }
    await runLoginSubprocess()
    const updatedConfig = loadCliConfig()
    const updatedBaseUrl = updatedConfig.apiBaseUrl || apiBaseUrl
    token = credManager.getAuthToken(updatedBaseUrl)
    return { authToken: token, apiBaseUrl: updatedBaseUrl, cliConfig: updatedConfig }
  }

  return { authToken: token, apiBaseUrl, cliConfig: loadCliConfig() }
}

export async function ensureAuthenticated ({ apiBaseUrl, nonInteractive } = {}) {
  const initialConfig = loadCliConfig()
  const baseUrl = apiBaseUrl || initialConfig.apiBaseUrl
  const interactive = isInteractive({ nonInteractive })

  const first = await ensureTokenPresent({ apiBaseUrl: baseUrl, nonInteractive })
  if (!first.authToken) {
    const err = new Error('Authentication required')
    err.code = 'AUTH_REQUIRED'
    throw err
  }

  try {
    const me = await fetchMe({ apiBaseUrl: first.apiBaseUrl, authToken: first.authToken })
    return { cliConfig: first.cliConfig, apiBaseUrl: first.apiBaseUrl, authToken: first.authToken, user: me.user }
  } catch (err) {
    if (isAuthFailure(err)) {
      const credManager = new CredentialManager()
      const refreshToken = credManager.getRefreshToken(first.apiBaseUrl)
      if (refreshToken) {
        try {
          const refreshed = await refreshAuthTokens({ apiBaseUrl: first.apiBaseUrl, credManager })
          const me = await fetchMe({ apiBaseUrl: refreshed.apiBaseUrl, authToken: refreshed.authToken })
          return {
            cliConfig: loadCliConfig(),
            apiBaseUrl: refreshed.apiBaseUrl,
            authToken: refreshed.authToken,
            user: me.user
          }
        } catch (_) {
          // Fall back to re-login below (interactive) or surface original error (non-interactive)
        }
      }
    }

    if (!interactive || !isAuthFailure(err)) throw err

    console.log(chalk.yellow('\nYour session is expired or invalid. Please sign in again.'))
    await runLoginSubprocess()

    const updatedConfig = loadCliConfig()
    const updatedBaseUrl = updatedConfig.apiBaseUrl || first.apiBaseUrl
    const credManager = new CredentialManager()
    const token = credManager.getAuthToken(updatedBaseUrl)
    if (!token) {
      const e = new Error('Authentication required')
      e.code = 'AUTH_REQUIRED'
      throw e
    }

    const me = await fetchMe({ apiBaseUrl: updatedBaseUrl, authToken: token })
    return { cliConfig: updatedConfig, apiBaseUrl: updatedBaseUrl, authToken: token, user: me.user }
  }
}

export function isAuthError (err) {
  return err?.code === 'AUTH_REQUIRED' || isAuthFailure(err)
}
