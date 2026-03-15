'use strict'

export const setup = async ({ url, key, projectId, createClient, ...options }) => {
  const supabaseUrl = url || (projectId && `https://${projectId}.supabase.co`)
  if (!supabaseUrl || !key) {
    throw new Error('@symbo.ls/fetch supabase: url (or projectId) and key are required')
  }
  if (!createClient) {
    const pkg = '@supabase/' + 'supabase-js'
    const mod = await import(/* webpackIgnore: true */ pkg)
    createClient = mod.createClient
  }
  const client = createClient(supabaseUrl, key, options)
  // Guard against no-op createClient (e.g. deserialized placeholder from SSR)
  if (!client || !client.auth) return null
  return supabaseAdapter(client)
}

const applyFilters = (query, params) => {
  if (!params) return query
  for (const key in params) {
    const val = params[key]
    if (val === null) {
      query = query.is(key, null)
    } else if (Array.isArray(val)) {
      query = query.in(key, val)
    } else if (typeof val === 'object') {
      for (const op in val) {
        if (op === 'gt') query = query.gt(key, val[op])
        else if (op === 'gte') query = query.gte(key, val[op])
        else if (op === 'lt') query = query.lt(key, val[op])
        else if (op === 'lte') query = query.lte(key, val[op])
        else if (op === 'neq') query = query.neq(key, val[op])
        else if (op === 'like') query = query.like(key, val[op])
        else if (op === 'ilike') query = query.ilike(key, val[op])
        else if (op === 'in') query = query.in(key, val[op])
        else if (op === 'is') query = query.is(key, val[op])
        else if (op === 'contains') query = query.contains(key, val[op])
        else if (op === 'containedBy') query = query.containedBy(key, val[op])
        else if (op === 'textSearch') query = query.textSearch(key, val[op])
      }
    } else {
      query = query.eq(key, val)
    }
  }
  return query
}

const applyModifiers = (query, { limit, offset, order, single } = {}) => {
  if (order) {
    if (Array.isArray(order)) {
      for (const o of order) {
        const by = typeof o === 'string' ? o : o.by
        query = query.order(by, { ascending: o.asc !== false })
      }
    } else {
      const orderBy = typeof order === 'string' ? order : order.by
      query = query.order(orderBy, { ascending: order.asc !== false })
    }
  }
  if (limit) query = query.limit(limit)
  if (offset) query = query.range(offset, offset + (limit || 20) - 1)
  if (single) query = query.single()
  return query
}

export const supabaseAdapter = (client) => ({
  name: 'supabase',
  client,

  // Auth
  getSession: async () => {
    const { data } = await client.auth.getSession()
    return data?.session || null
  },

  getUser: async () => {
    const { data } = await client.auth.getUser()
    return data?.user || null
  },

  signIn: (credentials) => {
    if (credentials.provider) {
      return client.auth.signInWithOAuth({ provider: credentials.provider })
    }
    if (credentials.token) {
      return client.auth.signInWithIdToken(credentials)
    }
    return client.auth.signInWithPassword(credentials)
  },

  signUp: (credentials) => client.auth.signUp(credentials),

  signOut: () => client.auth.signOut(),

  onAuthStateChange: (callback) => {
    const { data: { subscription } } = client.auth.onAuthStateChange(
      (event, session) => callback(event, session)
    )
    return () => subscription.unsubscribe()
  },

  // CRUD
  select: async ({ from, select, params, ...modifiers }) => {
    let q = client.from(from).select(select || '*')
    q = applyFilters(q, params)
    q = applyModifiers(q, modifiers)
    return q
  },

  rpc: ({ from, params }) => client.rpc(from, params),

  insert: ({ from, data, select }) =>
    client.from(from).insert(data).select(select || '*'),

  update: ({ from, data, params, select }) => {
    let q = client.from(from).update(data)
    q = applyFilters(q, params)
    return q.select(select || '*')
  },

  upsert: ({ from, data, select }) =>
    client.from(from).upsert(data).select(select || '*'),

  delete: ({ from, params }) => {
    let q = client.from(from).delete()
    q = applyFilters(q, params)
    return q
  },

  // Realtime
  subscribe: ({ from, params, on }, callback) => {
    const event = on || '*'
    const channel = client
      .channel(`db-${from}-${Date.now()}`)
      .on('postgres_changes', {
        event,
        schema: 'public',
        table: from,
        ...(params?.id ? { filter: `id=eq.${params.id}` } : {})
      }, (payload) => callback(payload.new, payload.old, payload))
      .subscribe()

    return () => client.removeChannel(channel)
  },

  // Storage
  upload: ({ bucket, path, file, options }) =>
    client.storage.from(bucket).upload(path, file, options),

  download: ({ bucket, path }) =>
    client.storage.from(bucket).download(path),

  getPublicUrl: ({ bucket, path }) =>
    client.storage.from(bucket).getPublicUrl(path)
})
