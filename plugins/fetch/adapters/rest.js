'use strict'

const buildUrl = (base, from, params) => {
  const slash = from && !from.startsWith('/') ? '/' : ''
  const url = new URL(`${base}${slash}${from}`)
  if (params) {
    for (const key in params) {
      const val = params[key]
      if (val !== undefined && val !== null) {
        url.searchParams.set(key, typeof val === 'object' ? JSON.stringify(val) : val)
      }
    }
  }
  return url.toString()
}

const request = async (url, options) => {
  const res = await globalThis.fetch(url, options)
  const contentType = res.headers.get('content-type')
  const data = contentType && contentType.includes('json')
    ? await res.json()
    : await res.text()
  return { data, error: res.ok ? null : (data?.message || data?.error || res.statusText), status: res.status }
}

export const setup = async ({ url, headers, auth, fetchOptions }) => {
  if (!url) throw new Error('@symbo.ls/fetch rest: url is required')
  return restAdapter(url, headers, auth, fetchOptions)
}

export const restAdapter = (baseUrl, defaultHeaders = {}, authConfig, defaultFetchOptions = {}) => {
  let token = authConfig?.token || null

  const getHeaders = (extra) => {
    const h = { ...defaultHeaders, ...extra }
    if (token) h.Authorization = `Bearer ${token}`
    return h
  }

  const getJsonHeaders = (extra) => ({ ...getHeaders(extra), 'Content-Type': 'application/json' })

  const getFetchOptions = (opts) => ({ ...defaultFetchOptions, ...opts })

  const resolveUrl = (from, base) => {
    const b = base || baseUrl
    if (from && (from.startsWith('http://') || from.startsWith('https://'))) return from
    const slash = from && !from.startsWith('/') ? '/' : ''
    return `${b}${slash}${from || ''}`
  }

  const adapter = {
    name: 'rest',

    // Auth
    setToken: (t) => { token = t },

    getSession: async () => {
      if (!authConfig?.sessionUrl) {
        return token ? { token } : null
      }
      const result = await request(
        resolveUrl(authConfig.sessionUrl, authConfig.baseUrl),
        getFetchOptions({ headers: getHeaders() })
      )
      return result.error ? null : result.data
    },

    signIn: async (credentials) => {
      if (!authConfig?.signInUrl) throw new Error('rest: auth.signInUrl not configured')
      const result = await request(resolveUrl(authConfig.signInUrl, authConfig.baseUrl), getFetchOptions({
        method: 'POST',
        headers: getJsonHeaders(),
        body: JSON.stringify(credentials)
      }))
      if (result.data?.token) token = result.data.token
      return result
    },

    signOut: async () => {
      if (authConfig?.signOutUrl) {
        await request(resolveUrl(authConfig.signOutUrl, authConfig.baseUrl), getFetchOptions({
          method: 'POST',
          headers: getHeaders()
        }))
      }
      token = null
      return { error: null }
    },

    // CRUD
    select: ({ from, params, select, limit, offset, order, single, headers, baseUrl: fromBase }) => {
      const allParams = { ...params }
      if (select) allParams.select = select
      if (limit) allParams.limit = limit
      if (offset) allParams.offset = offset
      if (single) allParams.single = true
      if (order) {
        if (typeof order === 'string') {
          allParams.order = order
        } else if (Array.isArray(order)) {
          allParams.order = order.map(o => `${o.by}:${o.asc === false ? 'desc' : 'asc'}`).join(',')
        } else if (order.by) {
          allParams.order = `${order.by}:${order.asc === false ? 'desc' : 'asc'}`
        }
      }
      return request(
        buildUrl(fromBase || baseUrl, from || '', allParams),
        getFetchOptions({ headers: getHeaders(headers) })
      )
    },

    rpc: ({ from, params, headers, baseUrl: fromBase }) =>
      request(resolveUrl(`rpc/${from}`, fromBase), getFetchOptions({
        method: 'POST',
        headers: getJsonHeaders(headers),
        body: JSON.stringify(params)
      })),

    insert: ({ from, data, headers, baseUrl: fromBase }) =>
      request(resolveUrl(from, fromBase), getFetchOptions({
        method: 'POST',
        headers: getJsonHeaders(headers),
        body: JSON.stringify(data)
      })),

    update: ({ from, data, params, method, headers, baseUrl: fromBase }) => {
      const id = params?.id || data?.id
      const path = id ? `${from}/${id}` : from
      return request(resolveUrl(path, fromBase), getFetchOptions({
        method: method || 'PATCH',
        headers: getJsonHeaders(headers),
        body: JSON.stringify(data)
      }))
    },

    delete: ({ from, params, headers, baseUrl: fromBase }) => {
      const id = params?.id
      const path = id ? `${from}/${id}` : from
      return request(resolveUrl(path, fromBase), getFetchOptions({
        method: 'DELETE',
        headers: getHeaders(headers)
      }))
    }
  }

  return adapter
}
