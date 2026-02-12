import { getApiUrl } from './config.js'
import { postProjectChanges as postProjectChangesInternal } from './apiUtils.js'

function getFetchImpl () {
  if (typeof globalThis.fetch === 'function') return globalThis.fetch
  return import('node-fetch').then((mod) => mod.default)
}

function buildUrl (pathname, query = {}) {
  const base = getApiUrl()
  const url = new URL(`${base}${pathname.startsWith('/') ? '' : '/'}${pathname}`)
  for (const [k, v] of Object.entries(query || {})) {
    if (v === undefined || v === null || v === '') continue
    url.searchParams.set(k, String(v))
  }
  return url.toString()
}

async function safeJson (res) {
  try {
    return await res.json()
  } catch (_) {
    return null
  }
}

function authHeaders (authToken) {
  if (!authToken) return {}
  return { Authorization: `Bearer ${authToken}` }
}

export async function listProjects (query = {}, authToken) {
  const fetchImpl = await getFetchImpl()
  const url = buildUrl('/core/projects', query)
  const res = await fetchImpl(url, { method: 'GET', headers: authHeaders(authToken) })
  if (!res.ok) {
    const data = await safeJson(res)
    const err = new Error(data?.message || `Failed to list projects (${res.status})`)
    err.response = { status: res.status, data }
    throw err
  }
  const json = await res.json()
  return json?.data || json
}

export async function listAvailableLibraries (query = {}, authToken) {
  const fetchImpl = await getFetchImpl()
  const url = buildUrl('/core/projects/libraries/available', query)
  const res = await fetchImpl(url, { method: 'GET', headers: authHeaders(authToken) })
  if (!res.ok) {
    const data = await safeJson(res)
    const err = new Error(data?.message || `Failed to list available libraries (${res.status})`)
    err.response = { status: res.status, data }
    throw err
  }
  const json = await res.json()
  return json?.data || json
}

export async function checkProjectKey (key, authToken, opts = {}) {
  if (!key) throw new Error('Missing key')
  const fetchImpl = await getFetchImpl()
  const url = buildUrl(`/core/projects/check-key/${encodeURIComponent(key)}`, {
    returnId: opts.returnId ? 'true' : undefined
  })
  const res = await fetchImpl(url, { method: 'GET', headers: authHeaders(authToken) })
  if (!res.ok) {
    const data = await safeJson(res)
    const err = new Error(data?.message || `Failed to check project key (${res.status})`)
    err.response = { status: res.status, data }
    throw err
  }
  const json = await res.json()
  return json?.data || json
}

export async function createProject (body, authToken) {
  const fetchImpl = await getFetchImpl()
  const url = buildUrl('/core/projects')
  const res = await fetchImpl(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...authHeaders(authToken)
    },
    body: JSON.stringify(body || {})
  })
  if (!res.ok) {
    const data = await safeJson(res)
    const err = new Error(data?.message || `Failed to create project (${res.status})`)
    err.response = { status: res.status, data }
    throw err
  }
  const json = await res.json()
  return json?.data || json
}

export async function getProjectByKey (projectKey, authToken) {
  if (!projectKey) throw new Error('Missing projectKey')
  const fetchImpl = await getFetchImpl()
  const url = buildUrl(`/core/projects/key/${encodeURIComponent(projectKey)}`)
  const res = await fetchImpl(url, { method: 'GET', headers: authHeaders(authToken) })
  if (!res.ok) {
    const data = await safeJson(res)
    const err = new Error(data?.message || `Failed to fetch project (${res.status})`)
    err.response = { status: res.status, data }
    throw err
  }
  const json = await res.json()
  return json?.data || json
}

export async function deleteProject (projectId, authToken) {
  if (!projectId) throw new Error('Missing projectId')
  const fetchImpl = await getFetchImpl()
  const url = buildUrl(`/core/projects/${encodeURIComponent(projectId)}`)
  const res = await fetchImpl(url, { method: 'DELETE', headers: authHeaders(authToken) })
  if (res.status === 204) return { success: true }
  if (!res.ok) {
    const data = await safeJson(res)
    const err = new Error(data?.message || `Failed to delete project (${res.status})`)
    err.response = { status: res.status, data }
    throw err
  }
  const json = await res.json()
  return json?.data || json
}

export async function patchProject (projectId, body, authToken) {
  if (!projectId) throw new Error('Missing projectId')
  const fetchImpl = await getFetchImpl()
  const url = buildUrl(`/core/projects/${encodeURIComponent(projectId)}`)
  const res = await fetchImpl(url, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      ...authHeaders(authToken)
    },
    body: JSON.stringify(body || {})
  })
  if (!res.ok) {
    const data = await safeJson(res)
    const err = new Error(data?.message || `Failed to update project (${res.status})`)
    err.response = { status: res.status, data }
    throw err
  }
  const json = await res.json()
  return json?.data || json
}

export async function postChanges (projectId, authToken, body) {
  return await postProjectChangesInternal(projectId, authToken, body)
}

export async function duplicateProject (projectId, body, authToken) {
  if (!projectId) throw new Error('Missing projectId')
  const fetchImpl = await getFetchImpl()
  const url = buildUrl(`/core/projects/${encodeURIComponent(projectId)}/duplicate`)
  const res = await fetchImpl(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...authHeaders(authToken)
    },
    body: JSON.stringify(body || {})
  })
  if (!res.ok) {
    const data = await safeJson(res)
    const err = new Error(data?.message || `Failed to duplicate project (${res.status})`)
    err.response = { status: res.status, data }
    throw err
  }
  const json = await res.json()
  return json?.data || json
}
