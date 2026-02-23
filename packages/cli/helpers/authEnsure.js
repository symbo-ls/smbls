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

function shouldForceReloginByExpiry ({ credManager, apiBaseUrl }) {
  try {
    const exp = getAuthTokenExpiresAt({ credManager, apiBaseUrl })
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
  const isExpiredSoon = token && shouldForceReloginByExpiry({ credManager, apiBaseUrl })

  if (!token || isExpiredSoon) {
    if (!interactive) {
      const err = new Error('Authentication required')
      err.code = 'AUTH_REQUIRED'
      err.response = { status: 401, data: { message: 'Missing or expired token' } }
      throw err
    }

    if (isExpiredSoon) {
      console.log(chalk.yellow('\nYour session is about to expire. Please sign in again.'))
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
