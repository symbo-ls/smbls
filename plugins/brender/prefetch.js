/**
 * SSR data prefetching for brender.
 *
 * Walks a page definition tree, collects `fetch` declarations,
 * executes them against the configured DB adapter (e.g. Supabase),
 * and returns the fetched data keyed by element path + `as` field.
 *
 * This allows brender to inject fetched data into element state
 * before rendering, so the SSR output matches the client-side SPA.
 */

const isFunction = (v) => typeof v === 'function'
const isArray = (v) => Array.isArray(v)
const isObject = (v) => v !== null && typeof v === 'object' && !Array.isArray(v)

/**
 * Resolve a fetch config's params — if it's a function, call it with
 * a mock element and state to get static params for SSR.
 */
const resolveParams = (params, mockState) => {
  if (!params) return undefined
  if (isFunction(params)) {
    try {
      // Build a mock element with basic call() support
      const mockEl = {
        state: mockState || {},
        props: {},
        call: () => undefined,
        __ref: {}
      }
      return params(mockEl, mockState || {})
    } catch {
      return undefined
    }
  }
  return params
}

/**
 * Normalize a single fetch declaration to a standard config object.
 */
const normalizeFetchConfig = (cfg, elementState) => {
  if (!cfg) return null
  if (typeof cfg === 'string') return { from: cfg, method: 'select' }

  const resolved = isFunction(cfg) ? null : { ...cfg }
  if (!resolved) return null

  // Default method
  if (!resolved.method) resolved.method = 'select'

  // Resolve function params
  if (isFunction(resolved.params)) {
    resolved.params = resolveParams(resolved.params, elementState)
  }

  // Skip mutations and event-bound fetches
  const isMutation = resolved.method === 'insert' || resolved.method === 'update' ||
    resolved.method === 'upsert' || resolved.method === 'delete'
  if (isMutation) return null
  if (resolved.on && resolved.on !== 'create') return null

  return resolved
}

/**
 * Walk a page definition tree and collect all fetch declarations
 * along with the path to the element's state.
 *
 * Returns: [{ config, stateKey, path, elementState }]
 */
const collectFetchDeclarations = (def, path = '') => {
  if (!def || typeof def !== 'object') return []
  // Skip function values and arrays of primitives
  if (isFunction(def)) return []

  const results = []
  const elementState = def.state || {}

  if (def.fetch) {
    const fetchDefs = isArray(def.fetch) ? def.fetch : [def.fetch]
    for (const fd of fetchDefs) {
      const config = normalizeFetchConfig(fd, elementState)
      if (config) {
        results.push({
          config,
          stateKey: config.as,
          path,
          elementState
        })
      }
    }
  }

  // Recurse into child elements (capitalized keys = child elements)
  for (const key in def) {
    if (key === 'fetch' || key === 'state' || key === 'props' ||
        key === 'attr' || key === 'on' || key === 'define' ||
        key === 'childExtends' || key === 'childProps' || key === 'childrenAs') continue
    // Child elements have capitalized keys
    if (key.charAt(0) >= 'A' && key.charAt(0) <= 'Z' && isObject(def[key])) {
      results.push(...collectFetchDeclarations(def[key], path ? `${path}.${key}` : key))
    }
  }

  return results
}

/**
 * Create a Supabase adapter from project config for SSR use.
 */
const createSSRAdapter = async (dbConfig) => {
  if (!dbConfig) return null

  const { adapter, createClient, url, key, projectId } = dbConfig
  if (adapter !== 'supabase') return null

  const supabaseUrl = url || (projectId && `https://${projectId}.supabase.co`)
  if (!supabaseUrl || !key) return null

  let clientFactory = createClient
  if (!clientFactory) {
    try {
      const mod = await import('@supabase/supabase-js')
      clientFactory = mod.createClient
    } catch {
      return null
    }
  }

  const client = clientFactory(supabaseUrl, key)

  return {
    rpc: ({ from, params }) => client.rpc(from, params),
    select: async ({ from, select: sel, params, limit, offset, order, single }) => {
      let q = client.from(from).select(sel || '*')
      if (params) {
        for (const k in params) {
          const v = params[k]
          if (v === null) q = q.is(k, null)
          else if (Array.isArray(v)) q = q.in(k, v)
          else q = q.eq(k, v)
        }
      }
      if (order) {
        const orderBy = typeof order === 'string' ? order : order.by
        q = q.order(orderBy, { ascending: order.asc !== false })
      }
      if (limit) q = q.limit(limit)
      if (offset) q = q.range(offset, offset + (limit || 20) - 1)
      if (single) q = q.single()
      return q
    }
  }
}

/**
 * Execute a single fetch config against the adapter.
 * Returns the fetched data, or null on error.
 */
const executeSingle = async (adapter, config) => {
  try {
    const { method, from, params, transform, limit, offset, order, single } = config
    let result

    if (method === 'rpc') {
      result = await adapter.rpc({ from, params })
    } else {
      result = await adapter.select({ from, select: config.select, params, limit, offset, order, single })
    }

    let data = result?.data ?? null
    if (result?.error) {
      return null
    }

    // Apply transform
    if (data && transform && isFunction(transform)) {
      try { data = transform(data) } catch { /* skip transform errors */ }
    }

    return data
  } catch {
    return null
  }
}

/**
 * Prefetch all data for a page route.
 *
 * @param {object} data - Full project data (from loadProject)
 * @param {string} route - Route to prefetch for (e.g. '/', '/blog')
 * @param {object} [options]
 * @returns {Promise<Map<string, object>>} Map of element path → { [stateKey]: data }
 */
export const prefetchPageData = async (data, route = '/', options = {}) => {
  const pages = data.pages || {}
  const pageDef = pages[route]
  if (!pageDef) return new Map()

  const config = data.config || data.settings || {}
  const dbConfig = config.fetch || config.db || data.db
  if (!dbConfig) return new Map()

  const adapter = await createSSRAdapter(dbConfig)
  if (!adapter) return new Map()

  const declarations = collectFetchDeclarations(pageDef)
  if (!declarations.length) return new Map()

  const stateUpdates = new Map()

  // Execute all fetches in parallel
  const results = await Promise.allSettled(
    declarations.map(async ({ config, stateKey, path }) => {
      const fetchedData = await executeSingle(adapter, config)
      if (fetchedData !== null) {
        const existing = stateUpdates.get(path) || {}
        if (stateKey) {
          // Named: store under the `as` key
          existing[stateKey] = fetchedData
        } else if (isObject(fetchedData)) {
          // No `as` key + transform returned an object: spread into state
          Object.assign(existing, fetchedData)
        }
        stateUpdates.set(path, existing)
      }
    })
  )

  return stateUpdates
}

/**
 * Inject prefetched data into a page definition's state objects.
 * Mutates the definition in place (caller should deep-clone first).
 *
 * @param {object} pageDef - Page definition (will be mutated)
 * @param {Map<string, object>} stateUpdates - Map from prefetchPageData
 */
/**
 * Fetch polyglot translations from the DB for SSR use.
 * Returns a map of { [lang]: { key: text, ... } } for all configured languages.
 *
 * @param {object} data - Full project data (from loadProject)
 * @returns {Promise<object|null>} Translation map keyed by language, or null on failure
 */
export const fetchSSRTranslations = async (data) => {
  const config = data.config || data.settings || {}
  const polyglot = config.polyglot
  if (!polyglot?.fetch) return null

  const dbConfig = config.fetch || config.db || data.db
  if (!dbConfig) return null

  const adapter = await createSSRAdapter(dbConfig)
  if (!adapter) return null

  const fetchConfig = polyglot.fetch
  const rpcName = fetchConfig.rpc || fetchConfig.from || 'get_translations_if_changed'
  const languages = polyglot.languages || [polyglot.defaultLang || 'en']

  const translations = {}

  // Fetch translations for all languages in parallel
  const results = await Promise.allSettled(
    languages.map(async (lang) => {
      try {
        const res = await adapter.rpc({
          from: rpcName,
          params: { p_lang: lang, p_cached_version: 0 }
        })
        if (res.error || !res.data) return
        const result = res.data
        if (result.translations) {
          translations[lang] = result.translations
        }
      } catch {}
    })
  )

  return Object.keys(translations).length ? translations : null
}

/**
 * Pre-evaluate children functions and replace them with static results.
 * During SSR, DOMQL's runtime state cascading and async re-render cycle
 * may not work correctly (trackSourcemapDeep stack overflows, etc.).
 * By pre-evaluating the children functions, we produce static element
 * definitions that DOMQL can render directly.
 */
const preEvaluateChildren = (def, inheritedState) => {
  if (!def || typeof def !== 'object') return
  for (const key in def) {
    if (key === 'state' || key === 'fetch' || key === 'props' ||
        key === 'attr' || key === 'on' || key === 'define' ||
        key === 'childExtends' || key === 'childProps' || key === 'childrenAs') continue
    if (key.charAt(0) >= 'A' && key.charAt(0) <= 'Z' && isObject(def[key])) {
      const child = def[key]
      // Determine effective state for this element (own state or inherited)
      const effectiveState = child.state && typeof child.state === 'object'
        ? { ...inheritedState, ...child.state }
        : inheritedState

      // Pre-evaluate children function
      if (isFunction(child.children)) {
        try {
          const mockEl = {
            state: effectiveState,
            props: {},
            call: (fn) => {
              if (fn === 'getActiveLang' || fn === 'getLang') return effectiveState?.lang || 'ka'
              if (fn === 'polyglot') return arguments[1] || ''
              return undefined
            },
            __ref: {}
          }
          const result = child.children(mockEl, effectiveState)
          if (isArray(result) && result.length > 0) {
            // Replace children function with static array
            child.children = result
          }
        } catch {
          // If evaluation fails, leave the function as-is
        }
      }

      // Recurse deeper
      preEvaluateChildren(child, effectiveState)
    }
  }
}

export const injectPrefetchedState = (pageDef, stateUpdates) => {
  if (!stateUpdates || !stateUpdates.size) return

  for (const [path, data] of stateUpdates) {
    // Navigate to the element at the path
    let target = pageDef
    if (path) {
      const parts = path.split('.')
      for (const part of parts) {
        if (!target || typeof target !== 'object') break
        target = target[part]
      }
    }

    if (target && typeof target === 'object') {
      // Merge fetched data into the element's state
      if (!target.state || typeof target.state !== 'object') {
        target.state = {}
      }
      Object.assign(target.state, data)

      // Pre-evaluate children functions with the injected state
      // so DOMQL gets static element definitions instead of functions
      preEvaluateChildren(target, target.state)
    }
  }
}
