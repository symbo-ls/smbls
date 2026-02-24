'use strict'

import chalk from 'chalk'

import { program } from './program.js'
import { loadCliConfig } from '../helpers/config.js'
import { CredentialManager } from '../helpers/credentialManager.js'
import { refreshAuthTokens } from '../helpers/authEnsure.js'

async function getFetchImpl () {
  if (typeof globalThis.fetch === 'function') return globalThis.fetch
  return import('node-fetch').then((mod) => mod.default)
}

async function safeJson (res) {
  try {
    return await res.json()
  } catch (_) {
    return null
  }
}

async function postLogout ({ apiBaseUrl, authToken, refreshToken }) {
  const fetchImpl = await getFetchImpl()
  const base = apiBaseUrl.replace(/\/+$/, '')
  const url = `${base}/core/auth/logout`
  const res = await fetchImpl(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${authToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ refreshToken: refreshToken || null })
  })
  const data = await safeJson(res)

  return { ok: res.ok, status: res.status, data, url }
}

program
  .command('logout')
  .description('Sign out of Symbols (clears local credentials)')
  .action(async () => {
    const credManager = new CredentialManager()
    const cliConfig = loadCliConfig()

    const envApiBaseUrl = process.env.SYMBOLS_API_BASE_URL || process.env.SMBLS_API_URL
    const apiBaseUrl = envApiBaseUrl || cliConfig.apiBaseUrl || credManager.getCurrentApiBaseUrl()

    let authToken = credManager.getAuthToken(apiBaseUrl)
    let refreshToken = credManager.getRefreshToken(apiBaseUrl)

    try {
      if (authToken) {
        let res = await postLogout({ apiBaseUrl, authToken, refreshToken })

        if ((res.status === 401 || res.status === 403) && refreshToken) {
          try {
            const refreshed = await refreshAuthTokens({ apiBaseUrl, credManager })
            authToken = refreshed.authToken
            refreshToken = refreshed.refreshToken
            res = await postLogout({ apiBaseUrl, authToken, refreshToken })
          } catch (_) {
            // We'll still clear local credentials below.
          }
        }

        if (res.ok) {
          console.log(chalk.green('\n✅ Logged out successfully'))
        } else if (res.status !== 401 && res.status !== 403) {
          const msg = res.data?.message || res.data?.error || `Logout request failed (${res.status})`
          console.log(chalk.yellow(`\n⚠️  ${msg}`))
        }
      }
    } finally {
      credManager.clearCredentials(apiBaseUrl)
    }

    console.log(chalk.dim(`\nLocal credentials cleared for ${apiBaseUrl}`))
  })
