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

// --- Fetch handler internals ---

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

const parseCache = (cache) => {
  if (!cache) return null
  if (cache === true) return { stale: 60000 }
  if (typeof cache === 'number') return { stale: cache }
  if (isString(cache)) return { stale: parseDuration(cache) }
  return {
    stale: parseDuration(cache.stale),
    expire: parseDuration(cache.expire),
    key: cache.key
  }
}

const cacheStore = new Map()

const getCached = (key, cacheConfig) => {
  if (!cacheConfig || !key) return null
  const entry = cacheStore.get(key)
  if (!entry) return null
  const age = Date.now() - entry.time
  if (cacheConfig.expire && age > cacheConfig.expire) {
    cacheStore.delete(key)
    return null
  }
  return { data: entry.data, isStale: age > (cacheConfig.stale || 0) }
}

const setCache = (key, data) => {
  if (!key) return
  cacheStore.set(key, { data, time: Date.now() })
}

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

const runFetch = async (config, element, context) => {
  const db = context?.db
  if (!db) return

  const adapter = await resolveAdapter(db, context)
  if (!adapter) return

  const ref = element.__ref
  const { from, method, query, params: rawParams, cache: cacheConfig, transform, single, auth, fields, as: stateKey, limit, offset, order, headers, baseUrl } = config

  let select
  if (query && isFunction(element.getQuery)) {
    const q = element.getQuery(adapter.name || 'paths')
    if (q) select = q.select || (q.length && q.join(',')) || undefined
  }

  const params = resolveParams(rawParams, element)
  const parsedCache = parseCache(cacheConfig)
  const cacheKey = parsedCache
    ? (cacheConfig?.key || `${from}:${method}:${JSON.stringify(params || '')}`)
    : null

  if (method === 'select' || method === 'rpc') {
    const cached = getCached(cacheKey, parsedCache)
    if (cached) {
      const data = transform ? transform(cached.data, element, element.state) : cached.data
      const stateData = stateKey ? { [stateKey]: data } : data
      if (element.state?.update) element.state.update(stateData, { preventFetch: true })
      if (!cached.isStale) return
    }
  }

  ref.__fetching = true
  triggerCallback(element, 'onFetchStart')

  try {
    if (auth !== false && adapter.getSession) {
      const session = await adapter.getSession()
      if (auth === true && !session) {
        triggerCallback(element, 'onFetchError', { message: 'Not authenticated' })
        return
      }
    }

    const fn = adapter[method]
    if (!isFunction(fn)) return

    const request = { from, select, params, single, limit, offset, order, headers, baseUrl }

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
          if (element.state?.update) {
            element.state.update(newData, { preventFetch: true })
          }
          triggerCallback(element, 'onFetchComplete', newData)
        }
      )
      ref.__unsubscribe = unsubscribe
      return
    }

    const result = await fn(request)
    const { data, error } = result || {}

    if (error) {
      ref.__fetchError = error
      triggerCallback(element, 'onFetchError', error)
      return
    }

    if (data !== undefined) {
      if (method === 'select' || method === 'rpc') setCache(cacheKey, data)
      const finalData = transform
        ? transform(data, element, element.state)
        : data
      const stateData = stateKey ? { [stateKey]: finalData } : finalData
      if (element.state?.update) {
        element.state.update(stateData, { preventFetch: true })
      }
      triggerCallback(element, 'onFetchComplete', finalData)
    }
  } catch (e) {
    ref.__fetchError = e
    triggerCallback(element, 'onFetchError', e)
  } finally {
    ref.__fetching = false
  }
}

const bindEvent = (config, element, context) => {
  const on = config.on
  const ref = element.__ref
  if (!ref.__fetchListeners) ref.__fetchListeners = []

  if (on === 'submit') {
    const handler = (e) => {
      e.preventDefault()
      runFetch(config, element, context)
    }
    const node = element.node
    if (node) {
      node.addEventListener('submit', handler)
      ref.__fetchListeners.push(() => node.removeEventListener('submit', handler))
    }
  } else if (on === 'click') {
    const handler = () => runFetch(config, element, context)
    const node = element.node
    if (node) {
      node.addEventListener('click', handler)
      ref.__fetchListeners.push(() => node.removeEventListener('click', handler))
    }
  } else if (on === 'stateChange') {
    ref.__fetchOnStateChange = () => runFetch(config, element, context)
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
    if (config.on === 'create') {
      runFetch(config, element, context)
    } else {
      Promise.resolve().then(() => bindEvent(config, element, context))
    }
  }
}

export default executeFetch
