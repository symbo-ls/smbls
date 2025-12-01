import { getApiUrl } from './config.js'

// New API (adds ETag and new endpoints)
function buildProjectDataUrl({ projectKey, projectId, branch, includePending = true, version }) {
  const base = getApiUrl()
  let url
  if (projectId) {
    url = new URL(`${base}/core/projects/${encodeURIComponent(projectId)}/data`)
  } else if (projectKey) {
    url = new URL(`${base}/core/projects/key/${encodeURIComponent(projectKey)}/data`)
  } else {
    throw new Error('Missing project identifier (projectId or projectKey)')
  }
  if (branch) url.searchParams.set('branch', branch)
  if (includePending !== undefined) url.searchParams.set('includePending', includePending ? 'true' : 'false')
  if (version) url.searchParams.set('version', version)
  return url.toString()
}

export async function getCurrentProjectData(project, authToken, opts = {}) {
  const { branch, includePending = true, etag, version } = opts
  const url = buildProjectDataUrl({ projectKey: project.projectKey, projectId: project.projectId, branch, includePending, version })
  const headers = {
    'Authorization': `Bearer ${authToken}`
  }
  if (etag) headers['If-None-Match'] = etag
  const response = await fetch(url, { method: 'GET', headers })
  if (response.status === 304) {
    return { notModified: true, etag: etag }
  }
  if (!response.ok) {
    const data = await safeJson(response)
    const err = new Error(data?.message || `Failed to fetch project data (${response.status})`)
    err.response = { status: response.status, data }
    throw err
  }
  const json = await response.json()
  return {
    notModified: false,
    etag: response.headers.get('ETag') || response.headers.get('Etag') || null,
    data: json?.data || json
  }
}

export async function postProjectChanges(projectId, authToken, body) {
  const base = getApiUrl()
  const url = `${base}/core/projects/${encodeURIComponent(projectId)}/changes`
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${authToken}`
    },
    body: JSON.stringify(body)
  })
  if (response.status === 204) {
    return { noOp: true }
  }
  if (!response.ok) {
    const data = await safeJson(response)
    const err = new Error(data?.message || `Failed to post changes (${response.status})`)
    err.response = { status: response.status, data }
    throw err
  }
  const json = await response.json()
  return { noOp: false, data: json?.data || json }
}

async function safeJson(res) {
  try {
    return await res.json()
  } catch (_) {
    return null
  }
}
