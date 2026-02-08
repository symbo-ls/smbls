import fs from 'fs'
import path from 'path'
import { getApiUrl } from './config.js'

function getFetchImpl () {
  if (typeof globalThis.fetch === 'function') {
    return {
      fetch: globalThis.fetch,
      FormData: globalThis.FormData,
      Blob: globalThis.Blob
    }
  }
  // Fallback for older Node versions.
  // node-fetch v3 exports fetch as default + web-compatible types.
  // eslint-disable-next-line no-undef
  return import('node-fetch').then((mod) => ({
    fetch: mod.default,
    FormData: mod.FormData,
    Blob: mod.Blob
  }))
}

function buildFilesUrl (pathname, query = {}) {
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

export async function listFiles ({ authToken, query = {} }) {
  const impl = await getFetchImpl()
  const url = buildFilesUrl('/core/files', query)
  const res = await impl.fetch(url, {
    method: 'GET',
    headers: { Authorization: `Bearer ${authToken}` }
  })
  if (!res.ok) {
    const data = await safeJson(res)
    const err = new Error(data?.message || `Failed to list files (${res.status})`)
    err.response = { status: res.status, data }
    throw err
  }
  const json = await res.json()
  return json?.data || json
}

function extToMime (ext) {
  const e = String(ext || '').replace(/^\./u, '').toLowerCase()
  if (!e) return null
  if (e === 'png') return 'image/png'
  if (e === 'jpg' || e === 'jpeg') return 'image/jpeg'
  if (e === 'webp') return 'image/webp'
  if (e === 'gif') return 'image/gif'
  if (e === 'svg') return 'image/svg+xml'
  if (e === 'pdf') return 'application/pdf'
  if (e === 'txt') return 'text/plain'
  if (e === 'json') return 'application/json'
  return null
}

export async function uploadFile ({
  authToken,
  filePath,
  fieldName = 'file',
  endpoint = '/core/files/upload',
  projectId,
  projectKey,
  visibility = 'public',
  tags = [],
  metadata = {},
  mimeType
}) {
  if (!filePath) throw new Error('Missing filePath')

  const impl = await getFetchImpl()
  const FormDataImpl = impl.FormData
  const BlobImpl = impl.Blob
  if (typeof FormDataImpl !== 'function') {
    throw new Error('FormData is not available in this Node runtime')
  }
  if (typeof BlobImpl !== 'function') {
    throw new Error('Blob is not available in this Node runtime')
  }

  const url = buildFilesUrl(endpoint)
  const form = new FormDataImpl()

  if (projectId) form.set('projectId', String(projectId))
  if (projectKey) form.set('projectKey', String(projectKey))
  if (visibility) form.set('visibility', String(visibility))

  // These are multipart fields (strings). The API middleware typically parses JSON-like values.
  form.set('tags', JSON.stringify(Array.isArray(tags) ? tags : []))
  form.set('metadata', JSON.stringify(metadata && typeof metadata === 'object' ? metadata : {}))

  const stat = await fs.promises.stat(filePath)
  if (!stat.isFile()) throw new Error(`Not a file: ${filePath}`)
  const buf = await fs.promises.readFile(filePath)

  const filename = path.basename(filePath)
  const inferredMime = mimeType || extToMime(path.extname(filename))
  const blob = new BlobImpl([buf], { type: inferredMime || 'application/octet-stream' })
  form.set(fieldName, blob, filename)

  const res = await impl.fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${authToken}`
    },
    body: form
  })

  if (!res.ok) {
    const data = await safeJson(res)
    const err = new Error(data?.message || `Failed to upload file (${res.status})`)
    err.response = { status: res.status, data }
    throw err
  }

  const json = await res.json()
  return json?.data || json
}

export async function downloadFile ({ authToken, fileId, endpoint }) {
  const impl = await getFetchImpl()
  const id = String(fileId || '').trim()
  if (!id) throw new Error('Missing fileId')

  const url = endpoint
    ? buildFilesUrl(endpoint)
    : buildFilesUrl(`/core/files/${encodeURIComponent(id)}/download`)

  const res = await impl.fetch(url, {
    method: 'GET',
    headers: authToken ? { Authorization: `Bearer ${authToken}` } : {}
  })
  if (!res.ok) {
    const data = await safeJson(res)
    const err = new Error(data?.message || `Failed to download file (${res.status})`)
    err.response = { status: res.status, data }
    throw err
  }

  const arrayBuffer = await res.arrayBuffer()
  const content = Buffer.from(arrayBuffer)
  return {
    content,
    headers: {
      contentType: res.headers.get('content-type'),
      contentLength: res.headers.get('content-length'),
      contentDisposition: res.headers.get('content-disposition')
    }
  }
}
