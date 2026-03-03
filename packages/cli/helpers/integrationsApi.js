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

function buildUrl (apiBaseUrl, pathname) {
  const base = (apiBaseUrl || getApiUrl()).replace(/\/+$/, '')
  return `${base}${pathname.startsWith('/') ? '' : '/'}${pathname}`
}

export async function createIntegration (body, authToken, apiBaseUrl) {
  const fetchImpl = await getFetchImpl()
  const url = buildUrl(apiBaseUrl, '/core/integrations')
  const res = await fetchImpl(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authToken}`
    },
    body: JSON.stringify(body || {})
  })
  if (!res.ok) {
    const data = await safeJson(res)
    const err = new Error(data?.message || `Failed to create integration (${res.status})`)
    err.response = { status: res.status, data }
    throw err
  }
  const json = await res.json()
  return json?.data || json
}

export async function createIntegrationApiKey (integrationId, body, authToken, apiBaseUrl) {
  if (!integrationId) throw new Error('Missing integrationId')
  const fetchImpl = await getFetchImpl()
  const url = buildUrl(apiBaseUrl, `/core/integrations/${encodeURIComponent(integrationId)}/api-keys`)
  const res = await fetchImpl(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authToken}`
    },
    body: JSON.stringify(body || {})
  })
  if (!res.ok) {
    const data = await safeJson(res)
    const err = new Error(data?.message || `Failed to create API key (${res.status})`)
    err.response = { status: res.status, data }
    throw err
  }
  const json = await res.json()
  return json?.data || json
}
