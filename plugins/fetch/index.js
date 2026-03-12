'use strict'

import { isArray, isFunction, isObject, isString, exec } from '@domql/utils'

// --- Adapter resolution ---

const ADAPTER_METHODS = ['select', 'rpc', 'insert', 'update', 'delete', 'subscribe']

const BUILTIN_ADAPTERS = {
  supabase: () => import('./adapters/supabase.js'),
  rest: () => import('./adapters/rest.js'),
  local: () => import('./adapters/local.js')
}

export const createAdapter = (config) => {
  const adapter = {}
  for (const method of ADAPTER_METHODS) {
    if (config[method]) adapter[method] = config[method]
  }
  adapter.name = config.name || 'custom'
  return adapter
}

export const resolveDb = async (config) => {
  if (!config) return null
  if (typeof config.select === 'function') return config

  const { adapter, ...options } = config
  const name = typeof adapter === 'string' ? adapter : typeof config === 'string' ? config : null
  if (!name) return null

  const loader = BUILTIN_ADAPTERS[name]
  if (!loader) throw new Error(`Unknown db adapter: "${name}"`)

  const mod = await loader()
  return mod.setup(options)
}

// --- Duration parsing ---

const parseDuration = (val) => {
  if (!val) return 0
  if (typeof val === 'number') return val
  const match = val.match(/^(\d+)(ms|s|m|h)$/)
  if (!match) return 0
  const n = parseInt(match[1])
  const unit = match[2]
  if (unit === 'ms') return n
  if (unit === 's') return n * 1000
  if (unit === 'm') return n * 60000
  if (unit === 'h') return n * 3600000
  return 0
}

// --- Query cache ---

const cacheStore = new Map()
const querySubscribers = new Map() // key -> Set of elements
const activeQueries = new Map() // key -> Promise (deduplication)

const buildCacheKey = (config) => {
  if (config.cache?.key) return config.cache.key
  const params = resolveParamsSync(config.params)
  return `${config.from}:${config.method}:${JSON.stringify(params || '')}`
}

const getCacheEntry = (key) => cacheStore.get(key) || null

const setCacheEntry = (key, data, error) => {
  const existing = cacheStore.get(key)
  const entry = {
    data,
    error,
    time: Date.now(),
    stale: false
  }
  cacheStore.set(key, entry)

  // Notify all subscribers of this query
  const subs = querySubscribers.get(key)
  if (subs) {
    for (const sub of subs) {
      if (isFunction(sub)) sub(entry)
    }
  }

  return entry
}

const invalidateCache = (key) => {
  if (key) {
    const entry = cacheStore.get(key)
    if (entry) entry.stale = true
    return
  }
  // Invalidate all
  for (const [, entry] of cacheStore) {
    entry.stale = true
  }
}

const removeCache = (key) => {
  if (key) {
    cacheStore.delete(key)
    return
  }
  cacheStore.clear()
}

const subscribeToCacheKey = (key, callback) => {
  if (!querySubscribers.has(key)) querySubscribers.set(key, new Set())
  querySubscribers.get(key).add(callback)
  return () => {
    const subs = querySubscribers.get(key)
    if (subs) {
      subs.delete(callback)
      if (subs.size === 0) querySubscribers.delete(key)
    }
  }
}

// --- Cache config resolution ---

const parseCacheConfig = (cache) => {
  if (!cache && cache !== false) return { staleTime: 60000, gcTime: 300000 }
  if (cache === false) return null
  if (cache === true) return { staleTime: 60000, gcTime: 300000 }
  if (typeof cache === 'number') return { staleTime: cache, gcTime: Math.max(cache * 5, 300000) }
  if (isString(cache)) return { staleTime: parseDuration(cache), gcTime: 300000 }
  return {
    staleTime: parseDuration(cache.stale || cache.staleTime) || 60000,
    gcTime: parseDuration(cache.gc || cache.gcTime || cache.expire) || 300000,
    key: cache.key
  }
}

// --- GC ---

let gcTimer = null

const startGC = () => {
  if (gcTimer) return
  gcTimer = setInterval(() => {
    const now = Date.now()
    for (const [key, entry] of cacheStore) {
      const subs = querySubscribers.get(key)
      const hasSubscribers = subs && subs.size > 0
      if (!hasSubscribers && (now - entry.time) > (entry.gcTime || 300000)) {
        cacheStore.delete(key)
      }
    }
  }, 30000)
  if (gcTimer.unref) gcTimer.unref()
}

startGC()

// --- Retry logic ---

const DEFAULT_RETRY = 3
const DEFAULT_RETRY_DELAY = (attempt) => Math.min(1000 * 2 ** attempt, 30000)

const resolveRetryConfig = (config) => {
  const retry = config.retry
  if (retry === false) return { count: 0 }
  if (retry === true || retry === undefined) return { count: DEFAULT_RETRY, delay: DEFAULT_RETRY_DELAY }
  if (typeof retry === 'number') return { count: retry, delay: DEFAULT_RETRY_DELAY }
  return {
    count: retry.count ?? DEFAULT_RETRY,
    delay: isFunction(retry.delay) ? retry.delay : (typeof retry.delay === 'number' ? () => retry.delay : DEFAULT_RETRY_DELAY)
  }
}

const withRetry = async (fn, retryConfig) => {
  const { count, delay } = retryConfig
  let lastError
  for (let attempt = 0; attempt <= count; attempt++) {
    try {
      const result = await fn()
      if (result?.error) {
        lastError = result.error
        if (attempt < count) {
          const ms = isFunction(delay) ? delay(attempt, lastError) : delay
          await new Promise(r => setTimeout(r, ms))
          continue
        }
        return result
      }
      return result
    } catch (e) {
      lastError = e
      if (attempt < count) {
        const ms = isFunction(delay) ? delay(attempt, e) : delay
        await new Promise(r => setTimeout(r, ms))
        continue
      }
      throw e
    }
  }
  return { data: null, error: lastError }
}

// --- Refetch on window focus / reconnect ---

const globalListeners = { focus: new Set(), online: new Set() }
let globalListenersAttached = false

const attachGlobalListeners = () => {
  if (globalListenersAttached || typeof window === 'undefined') return
  globalListenersAttached = true

  const onFocus = () => {
    for (const fn of globalListeners.focus) fn()
  }
  const onOnline = () => {
    for (const fn of globalListeners.online) fn()
  }

  window.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') onFocus()
  })
  window.addEventListener('focus', onFocus)
  window.addEventListener('online', onOnline)
}

// --- Fetch config resolution ---

const resolveFetchConfig = (fetchProp, element) => {
  const ref = element.__ref

  if (fetchProp === true) {
    return { from: ref.__state || element.key, method: 'select', query: true, on: 'create' }
  }

  if (isString(fetchProp)) {
    return { from: fetchProp, method: 'select', query: true, on: 'create' }
  }

  if (isObject(fetchProp)) {
    const config = { ...fetchProp }
    config.from = config.from || ref.__state || element.key
    config.method = config.method || 'select'
    config.on = config.on || 'create'
    if (config.query === undefined) config.query = true
    return config
  }

  return null
}

const resolveParamsSync = (params) => {
  if (!params || isFunction(params)) return params
  return params
}

const resolveParams = (params, element) => {
  if (!params) return undefined
  if (isFunction(params)) return params(element, element.state)
  const resolved = {}
  for (const key in params) {
    const val = params[key]
    resolved[key] = isFunction(val) ? val(element, element.state) : val
  }
  return resolved
}

const resolveAdapter = async (db, context) => {
  if (isFunction(db.select)) return db
  if (db.__resolved) return db.__resolved
  if (db.__resolving) return db.__resolving

  db.__resolving = resolveDb(db)
  const resolved = await db.__resolving
  db.__resolved = resolved
  context.db = resolved
  delete db.__resolving
  return resolved
}

const triggerCallback = (element, name, ...args) => {
  const fn = isFunction(element[name]) ? element[name]
    : (element.props && isFunction(element.props[name])) ? element.props[name]
      : null
  if (fn) fn.call(element, ...args, element, element.state, element.context)
}

const collectFormData = (element) => {
  const data = {}
  const node = element.node
  if (!node) return data

  if (node.tagName === 'FORM') {
    const formData = new FormData(node)
    for (const [key, value] of formData.entries()) {
      data[key] = value
    }
    return data
  }

  const inputs = node.querySelectorAll('input, textarea, select')
  for (let i = 0; i < inputs.length; i++) {
    const input = inputs[i]
    const name = input.name || input.getAttribute('name')
    if (!name) continue
    if (input.type === 'checkbox') {
      data[name] = input.checked
    } else if (input.type === 'file') {
      data[name] = input.files
    } else {
      data[name] = input.value
    }
  }
  return data
}

// --- State update helpers ---

const updateElementState = (element, data, stateKey, options = {}) => {
  const stateData = stateKey ? { [stateKey]: data } : data
  if (element.state?.update) {
    element.state.update(stateData, { preventFetch: true, ...options })
  }
}

const setFetchStatus = (element, status) => {
  const ref = element.__ref
  ref.__fetchStatus = status
  ref.__fetching = status.isFetching
  ref.__fetchError = status.error
}

// --- Core fetch runner ---

const runFetch = async (config, element, context, opts = {}) => {
  const db = context?.db
  if (!db) return

  // enabled check
  if (config.enabled === false) return
  if (isFunction(config.enabled) && !config.enabled(element, element.state)) return

  const adapter = await resolveAdapter(db, context)
  if (!adapter) return

  const ref = element.__ref
  const {
    from, method, query, params: rawParams, cache: cacheRaw, transform,
    single, auth, fields, as: stateKey, limit, offset, order,
    headers, baseUrl,
    // Pagination
    page, cursor, getNextPageParam, getPreviousPageParam, infinite,
    // TanStack-style options
    placeholderData, initialData, select: selectTransform,
    keepPreviousData
  } = config

  let select
  if (query && isFunction(element.getQuery)) {
    const q = element.getQuery(adapter.name || 'paths')
    if (q) select = q.select || (q.length && q.join(',')) || undefined
  }

  const params = resolveParams(rawParams, element)
  const cacheConfig = parseCacheConfig(cacheRaw)
  const retryConfig = resolveRetryConfig(config)

  // Build cache key
  const cacheKey = cacheConfig
    ? (cacheRaw?.key || `${from}:${method}:${JSON.stringify(params || '')}${infinite ? ':infinite' : ''}${page ? ':p' + JSON.stringify(page) : ''}`)
    : null

  // Apply initial/placeholder data on first mount
  if (!ref.__fetchInitialized && cacheKey) {
    ref.__fetchInitialized = true
    if (initialData !== undefined) {
      const initData = isFunction(initialData) ? initialData() : initialData
      setCacheEntry(cacheKey, initData, null)
    }
  }

  // Check cache (stale-while-revalidate)
  if ((method === 'select' || method === 'rpc') && cacheKey && cacheConfig) {
    const cached = getCacheEntry(cacheKey)
    if (cached && !cached.error) {
      const age = Date.now() - cached.time
      const isStale = cached.stale || age > (cacheConfig.staleTime || 0)
      let data = cached.data
      if (selectTransform) data = selectTransform(data, element, element.state)
      if (transform) data = transform(data, element, element.state)
      updateElementState(element, data, stateKey)
      if (!isStale) {
        setFetchStatus(element, { isFetching: false, isLoading: false, isStale: false, isSuccess: true, error: null, status: 'success', fetchStatus: 'idle' })
        return
      }
      // Stale — continue to background refetch
    } else if (placeholderData !== undefined) {
      const phData = isFunction(placeholderData) ? placeholderData(element, element.state) : placeholderData
      if (phData !== undefined) {
        updateElementState(element, phData, stateKey)
      }
    }
  }

  // Deduplication — if same query is already in-flight, share the promise
  if (cacheKey && activeQueries.has(cacheKey) && !opts.force) {
    const existing = activeQueries.get(cacheKey)
    try {
      const result = await existing
      if (result?.data !== undefined) {
        let finalData = result.data
        if (selectTransform) finalData = selectTransform(finalData, element, element.state)
        if (transform) finalData = transform(finalData, element, element.state)
        updateElementState(element, finalData, stateKey)
        triggerCallback(element, 'onFetchComplete', finalData)
      }
    } catch (e) {
      // Error handled by the original caller
    }
    return
  }

  // Set loading status
  const isFirstLoad = !getCacheEntry(cacheKey)?.data
  setFetchStatus(element, {
    isFetching: true,
    isLoading: isFirstLoad,
    isStale: false,
    isSuccess: false,
    error: null,
    status: 'pending',
    fetchStatus: 'fetching'
  })
  triggerCallback(element, 'onFetchStart')

  const doFetch = async () => {
    if (auth !== false && adapter.getSession) {
      const session = await adapter.getSession()
      if (auth === true && !session) {
        const err = { message: 'Not authenticated' }
        setFetchStatus(element, { isFetching: false, isLoading: false, isStale: false, isSuccess: false, error: err, status: 'error', fetchStatus: 'idle' })
        triggerCallback(element, 'onFetchError', err)
        return { data: null, error: err }
      }
    }

    const fn = adapter[method]
    if (!isFunction(fn)) return { data: null, error: { message: `Method "${method}" not found on adapter` } }

    const request = { from, select, params, single, limit, offset, order, headers, baseUrl }

    // Pagination support
    if (page !== undefined) {
      if (isObject(page)) {
        if (page.offset !== undefined) request.offset = page.offset
        if (page.limit !== undefined) request.limit = page.limit
        if (page.cursor !== undefined) request.params = { ...request.params, cursor: page.cursor }
      } else if (typeof page === 'number') {
        const pageSize = config.pageSize || limit || 20
        request.offset = (page - 1) * pageSize
        request.limit = pageSize
      }
    }

    if (cursor !== undefined) {
      request.params = { ...request.params, cursor }
    }

    if (method === 'insert' || method === 'update' || method === 'upsert') {
      let data
      if (fields === true || config.on === 'submit') {
        data = collectFormData(element)
      } else if (isArray(fields)) {
        const formData = collectFormData(element)
        data = {}
        for (const f of fields) data[f] = formData[f]
      } else if (element.state?.parse) {
        data = element.state.parse()
      } else if (isObject(element.state)) {
        data = { ...element.state }
      }

      if (transform) data = transform(data, element, element.state)
      request.data = data
    }

    if (method === 'rpc') {
      let rpcParams = params
      if (config.on === 'submit') {
        const formData = collectFormData(element)
        rpcParams = config.transformParams
          ? config.transformParams(formData, element, element.state)
          : formData
      }
      request.params = rpcParams
    }

    if (method === 'subscribe') {
      const unsubscribe = adapter.subscribe(
        { from, params, on: config.subscribeOn },
        (newData, oldData, payload) => {
          updateElementState(element, newData, stateKey)
          triggerCallback(element, 'onFetchComplete', newData)
        }
      )
      ref.__unsubscribe = unsubscribe
      return { data: null, error: null, subscribed: true }
    }

    return fn(request)
  }

  // Execute with retry
  const fetchPromise = withRetry(doFetch, retryConfig)

  // Store for deduplication
  if (cacheKey) activeQueries.set(cacheKey, fetchPromise)

  try {
    const result = await fetchPromise
    if (result?.subscribed) return

    const { data, error } = result || {}

    if (error) {
      if (cacheKey) setCacheEntry(cacheKey, null, error)
      setFetchStatus(element, { isFetching: false, isLoading: false, isStale: false, isSuccess: false, error, status: 'error', fetchStatus: 'idle' })
      triggerCallback(element, 'onFetchError', error)
      return
    }

    if (data !== undefined) {
      // Update cache
      if ((method === 'select' || method === 'rpc') && cacheKey) {
        const entry = setCacheEntry(cacheKey, data, null)
        entry.gcTime = cacheConfig?.gcTime || 300000
      }

      let finalData = data

      // Infinite query — append pages
      if (infinite && isArray(data)) {
        if (!ref.__pages) ref.__pages = []
        if (opts.direction === 'previous') {
          ref.__pages.unshift(data)
        } else {
          ref.__pages.push(data)
        }
        finalData = ref.__pages.flat()

        // Resolve pagination cursors
        if (getNextPageParam) {
          ref.__nextPageParam = getNextPageParam(data, ref.__pages)
          ref.__hasNextPage = ref.__nextPageParam != null
        }
        if (getPreviousPageParam) {
          ref.__prevPageParam = getPreviousPageParam(data, ref.__pages)
          ref.__hasPreviousPage = ref.__prevPageParam != null
        }
      }

      if (selectTransform) finalData = selectTransform(finalData, element, element.state)
      if (transform) finalData = transform(finalData, element, element.state)

      // keepPreviousData — don't clear state while fetching new page
      if (!keepPreviousData || finalData !== undefined) {
        updateElementState(element, finalData, stateKey)
      }

      setFetchStatus(element, { isFetching: false, isLoading: false, isStale: false, isSuccess: true, error: null, status: 'success', fetchStatus: 'idle' })
      triggerCallback(element, 'onFetchComplete', finalData)
    }
  } catch (e) {
    setFetchStatus(element, { isFetching: false, isLoading: false, isStale: false, isSuccess: false, error: e, status: 'error', fetchStatus: 'idle' })
    triggerCallback(element, 'onFetchError', e)
  } finally {
    if (cacheKey) activeQueries.delete(cacheKey)
  }
}

// --- Event binding ---

const bindEvent = (config, element, context) => {
  const on = config.on
  const ref = element.__ref
  if (!ref.__fetchListeners) ref.__fetchListeners = []
  const runner = config.__runner || runFetch

  if (on === 'submit') {
    const handler = (e) => {
      e.preventDefault()
      runner(config, element, context)
    }
    const node = element.node
    if (node) {
      node.addEventListener('submit', handler)
      ref.__fetchListeners.push(() => node.removeEventListener('submit', handler))
    }
  } else if (on === 'click') {
    const handler = () => runner(config, element, context)
    const node = element.node
    if (node) {
      node.addEventListener('click', handler)
      ref.__fetchListeners.push(() => node.removeEventListener('click', handler))
    }
  } else if (on === 'stateChange') {
    ref.__fetchOnStateChange = () => runner(config, element, context)
  }
}

// --- Refetch interval / focus / reconnect binding ---

const bindAutoRefetch = (config, element, context) => {
  const ref = element.__ref
  if (!ref.__fetchCleanups) ref.__fetchCleanups = []

  attachGlobalListeners()

  // refetchInterval
  const interval = config.refetchInterval
  if (interval) {
    const ms = typeof interval === 'number' ? interval : parseDuration(interval)
    if (ms > 0) {
      const timer = setInterval(() => {
        // Only refetch if visible (unless refetchIntervalInBackground is set)
        if (config.refetchIntervalInBackground || typeof document === 'undefined' || document.visibilityState === 'visible') {
          runFetch(config, element, context, { force: true })
        }
      }, ms)
      ref.__fetchCleanups.push(() => clearInterval(timer))
    }
  }

  // refetchOnWindowFocus
  if (config.refetchOnWindowFocus !== false) {
    const onFocus = () => {
      const cacheKey = buildCacheKey(config)
      const entry = getCacheEntry(cacheKey)
      const cacheConfig = parseCacheConfig(config.cache)
      if (!entry || entry.stale || (Date.now() - entry.time) > (cacheConfig?.staleTime || 0)) {
        runFetch(config, element, context, { force: true })
      }
    }
    globalListeners.focus.add(onFocus)
    ref.__fetchCleanups.push(() => globalListeners.focus.delete(onFocus))
  }

  // refetchOnReconnect
  if (config.refetchOnReconnect !== false) {
    const onOnline = () => runFetch(config, element, context, { force: true })
    globalListeners.online.add(onOnline)
    ref.__fetchCleanups.push(() => globalListeners.online.delete(onOnline))
  }
}

// --- Optimistic updates ---

const applyOptimisticUpdate = (element, config, mutationData) => {
  if (!config.optimistic) return null
  const ref = element.__ref
  const stateKey = config.as

  // Snapshot current state for rollback
  const snapshot = element.state?.parse ? element.state.parse() : (isObject(element.state) ? { ...element.state } : element.state)
  ref.__optimisticSnapshot = snapshot

  const optimisticData = isFunction(config.optimistic)
    ? config.optimistic(mutationData, snapshot, element)
    : config.optimistic

  if (optimisticData !== undefined) {
    updateElementState(element, optimisticData, stateKey)
  }

  return snapshot
}

const rollbackOptimistic = (element, config) => {
  const ref = element.__ref
  const snapshot = ref.__optimisticSnapshot
  if (snapshot !== undefined) {
    updateElementState(element, snapshot, config.as)
    delete ref.__optimisticSnapshot
  }
}

// --- Mutation runner (insert/update/delete with optimistic + invalidation) ---

const runMutation = async (config, element, context) => {
  const db = context?.db
  if (!db) return

  const adapter = await resolveAdapter(db, context)
  if (!adapter) return

  const ref = element.__ref
  const { method, from, fields, transform, as: stateKey, on: trigger, auth, headers, baseUrl, invalidates, optimistic, onMutate, onSuccess, onError, onSettled } = config

  // Collect mutation data
  let mutationData
  if (fields === true || trigger === 'submit') {
    mutationData = collectFormData(element)
  } else if (isArray(fields)) {
    const formData = collectFormData(element)
    mutationData = {}
    for (const f of fields) mutationData[f] = formData[f]
  } else if (element.state?.parse) {
    mutationData = element.state.parse()
  } else if (isObject(element.state)) {
    mutationData = { ...element.state }
  }

  if (transform) mutationData = transform(mutationData, element, element.state)

  // onMutate callback (runs before fetch)
  if (isFunction(onMutate)) onMutate(mutationData, element, element.state)

  // Apply optimistic update
  const snapshot = optimistic ? applyOptimisticUpdate(element, config, mutationData) : null

  ref.__fetching = true
  setFetchStatus(element, { isFetching: true, isLoading: false, isStale: false, isSuccess: false, error: null, status: 'pending', fetchStatus: 'fetching' })
  triggerCallback(element, 'onFetchStart')

  try {
    if (auth !== false && adapter.getSession) {
      const session = await adapter.getSession()
      if (auth === true && !session) {
        if (snapshot !== undefined) rollbackOptimistic(element, config)
        const err = { message: 'Not authenticated' }
        triggerCallback(element, 'onFetchError', err)
        return
      }
    }

    const fn = adapter[method]
    if (!isFunction(fn)) return

    const request = { from, data: mutationData, headers, baseUrl }
    if (config.params) request.params = resolveParams(config.params, element)

    const retryConfig = resolveRetryConfig(config)
    const result = await withRetry(() => fn(request), retryConfig)
    const { data, error } = result || {}

    if (error) {
      if (snapshot !== undefined) rollbackOptimistic(element, config)
      setFetchStatus(element, { isFetching: false, isLoading: false, isStale: false, isSuccess: false, error, status: 'error', fetchStatus: 'idle' })
      triggerCallback(element, 'onFetchError', error)
      if (isFunction(onError)) onError(error, mutationData, element)
      if (isFunction(onSettled)) onSettled(null, error, mutationData, element)
      return
    }

    delete ref.__optimisticSnapshot

    if (data !== undefined) {
      const finalData = stateKey ? { [stateKey]: data } : data
      if (element.state?.update) element.state.update(finalData, { preventFetch: true })
    }

    setFetchStatus(element, { isFetching: false, isLoading: false, isStale: false, isSuccess: true, error: null, status: 'success', fetchStatus: 'idle' })
    triggerCallback(element, 'onFetchComplete', data)
    if (isFunction(onSuccess)) onSuccess(data, mutationData, element)
    if (isFunction(onSettled)) onSettled(data, null, mutationData, element)

    // Invalidate related queries
    if (invalidates) {
      const keys = isArray(invalidates) ? invalidates : [invalidates]
      for (const k of keys) {
        if (k === true || k === '*') {
          // Invalidate all queries matching this `from`
          for (const [ck] of cacheStore) {
            if (ck.startsWith(from + ':')) invalidateCache(ck)
          }
        } else {
          invalidateCache(k)
        }
      }
    }
  } catch (e) {
    if (snapshot !== undefined) rollbackOptimistic(element, config)
    setFetchStatus(element, { isFetching: false, isLoading: false, isStale: false, isSuccess: false, error: e, status: 'error', fetchStatus: 'idle' })
    triggerCallback(element, 'onFetchError', e)
    if (isFunction(onError)) onError(e, mutationData, element)
    if (isFunction(onSettled)) onSettled(null, e, mutationData, element)
  } finally {
    ref.__fetching = false
  }
}

// --- Public API ---

export const executeFetch = (param, element, state, context) => {
  if (!param) return
  const db = context?.db
  if (!db) return

  const fetchProp = exec(param, element)
  if (!fetchProp) return

  const configs = isArray(fetchProp)
    ? fetchProp.map(c => resolveFetchConfig(exec(c, element), element)).filter(Boolean)
    : [resolveFetchConfig(fetchProp, element)].filter(Boolean)

  for (const config of configs) {
    const isMutation = config.method === 'insert' || config.method === 'update' || config.method === 'upsert' || config.method === 'delete'
    const runner = isMutation ? runMutation : runFetch

    if (config.on === 'create') {
      runner(config, element, context)
    } else {
      Promise.resolve().then(() => {
        bindEvent({ ...config, __runner: runner }, element, context)
      })
    }

    // Bind auto-refetch for queries
    if (!isMutation && config.on === 'create') {
      if (config.refetchInterval || config.refetchOnWindowFocus !== false || config.refetchOnReconnect !== false) {
        bindAutoRefetch(config, element, context)
      }
    }
  }

  // Expose imperative methods on element
  const ref = element.__ref
  ref.refetch = (opts) => {
    for (const config of configs) {
      runFetch(config, element, context, { force: true, ...opts })
    }
  }

  ref.fetchNextPage = () => {
    const config = configs[0]
    if (!config || !config.infinite) return
    const nextParam = ref.__nextPageParam
    if (nextParam == null) return
    const nextConfig = { ...config, cursor: nextParam }
    runFetch(nextConfig, element, context, { direction: 'next', force: true })
  }

  ref.fetchPreviousPage = () => {
    const config = configs[0]
    if (!config || !config.infinite) return
    const prevParam = ref.__prevPageParam
    if (prevParam == null) return
    const prevConfig = { ...config, cursor: prevParam }
    runFetch(prevConfig, element, context, { direction: 'previous', force: true })
  }
}

// --- Query client (global cache management) ---

export const queryClient = {
  invalidateQueries: (keyOrPattern) => {
    if (!keyOrPattern) {
      invalidateCache()
      return
    }
    if (isString(keyOrPattern)) {
      for (const [key] of cacheStore) {
        if (key.startsWith(keyOrPattern) || key.includes(keyOrPattern)) {
          invalidateCache(key)
        }
      }
    } else if (isArray(keyOrPattern)) {
      const pattern = keyOrPattern.join(':')
      for (const [key] of cacheStore) {
        if (key.includes(pattern)) invalidateCache(key)
      }
    }
  },

  removeQueries: (keyOrPattern) => {
    if (!keyOrPattern) {
      removeCache()
      return
    }
    if (isString(keyOrPattern)) {
      for (const [key] of cacheStore) {
        if (key.startsWith(keyOrPattern) || key.includes(keyOrPattern)) {
          removeCache(key)
        }
      }
    }
  },

  getQueryData: (key) => {
    const entry = getCacheEntry(key)
    return entry?.data ?? undefined
  },

  setQueryData: (key, updater) => {
    const existing = getCacheEntry(key)
    const data = isFunction(updater) ? updater(existing?.data) : updater
    setCacheEntry(key, data, null)
  },

  prefetchQuery: async (config, context) => {
    const db = context?.db
    if (!db) return

    const adapter = await resolveAdapter(db, context)
    if (!adapter) return

    const cacheKey = config.cache?.key || `${config.from}:${config.method || 'select'}:${JSON.stringify(config.params || '')}`
    const fn = adapter[config.method || 'select']
    if (!isFunction(fn)) return

    const result = await fn({
      from: config.from,
      params: config.params,
      limit: config.limit,
      offset: config.offset,
      order: config.order,
      single: config.single
    })

    if (result?.data !== undefined && !result?.error) {
      const entry = setCacheEntry(cacheKey, result.data, null)
      entry.gcTime = parseCacheConfig(config.cache)?.gcTime || 300000
    }

    return result
  },

  getCache: () => cacheStore,
  clear: () => removeCache()
}

export { parseDuration }
export default executeFetch
