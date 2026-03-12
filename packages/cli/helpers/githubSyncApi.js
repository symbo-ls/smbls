import { getApiUrl } from './config.js'

function getFetchImpl () {
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

function buildUrl (apiBaseUrl, connectorId) {
  const base = (apiBaseUrl || getApiUrl()).replace(/\/+$/, '')
  return `${base}/core/connectors/github/${encodeURIComponent(connectorId)}/sync`
}

export async function postGitHubConnectorSync ({ apiBaseUrl, connectorId, apiKey, payload }) {
  if (!connectorId) throw new Error('Missing connectorId')
  if (!apiKey) throw new Error('Missing apiKey')
  const fetchImpl = await getFetchImpl()
  const url = buildUrl(apiBaseUrl, connectorId)
  const res = await fetchImpl(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `ApiKey ${apiKey}`
    },
    body: JSON.stringify(payload || {})
  })
  if (!res.ok) {
    const data = await safeJson(res)
    const err = new Error(data?.message || data?.error || `Sync request failed (${res.status})`)
    err.response = { status: res.status, data }
    throw err
  }
  const json = await res.json()
  return json
}
