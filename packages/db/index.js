'use strict'

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

  // Already a resolved adapter (has methods like select/insert)
  if (typeof config.select === 'function') return config

  const { adapter, ...options } = config

  // String shorthand: db: 'supabase' (needs key/url from env or separate config)
  const name = typeof adapter === 'string' ? adapter : typeof config === 'string' ? config : null

  if (!name) return null

  const loader = BUILTIN_ADAPTERS[name]
  if (!loader) throw new Error(`Unknown db adapter: "${name}"`)

  const mod = await loader()
  return mod.setup(options)
}
