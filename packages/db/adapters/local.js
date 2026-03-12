'use strict'

const matchesParams = (item, params) => {
  if (!params) return true
  for (const key in params) {
    const val = params[key]
    if (val === null) {
      if (item[key] !== null && item[key] !== undefined) return false
    } else if (Array.isArray(val)) {
      if (!val.includes(item[key])) return false
    } else if (typeof val === 'object') {
      for (const op in val) {
        if (op === 'gt' && !(item[key] > val[op])) return false
        if (op === 'gte' && !(item[key] >= val[op])) return false
        if (op === 'lt' && !(item[key] < val[op])) return false
        if (op === 'lte' && !(item[key] <= val[op])) return false
        if (op === 'neq' && item[key] === val[op]) return false
        if (op === 'like' && !String(item[key]).includes(val[op])) return false
      }
    } else if (item[key] !== val) {
      return false
    }
  }
  return true
}

const applyModifiers = (items, { order, limit, offset, single }) => {
  let result = [...items]

  if (order) {
    const by = typeof order === 'string' ? order : order.by
    const asc = order.asc !== false
    result.sort((a, b) => {
      if (a[by] < b[by]) return asc ? -1 : 1
      if (a[by] > b[by]) return asc ? 1 : -1
      return 0
    })
  }

  if (offset) result = result.slice(offset)
  if (limit) result = result.slice(0, limit)
  if (single) return { data: result[0] || null, error: null }

  return { data: result, error: null }
}

export const setup = async ({ data, ...options }) => localAdapter(data, options)

export const localAdapter = (initialData = {}, options = {}) => {
  const store = {}
  const listeners = {}
  const persist = options.persist !== false && typeof localStorage !== 'undefined'
  const prefix = options.prefix || 'smbls_db_'

  const getTable = (name) => {
    if (!store[name]) {
      if (persist) {
        try {
          const saved = localStorage.getItem(prefix + name)
          store[name] = saved ? JSON.parse(saved) : (initialData[name] || [])
        } catch { store[name] = initialData[name] || [] }
      } else {
        store[name] = initialData[name] || []
      }
    }
    return store[name]
  }

  const save = (name) => {
    if (persist) {
      try { localStorage.setItem(prefix + name, JSON.stringify(store[name])) } catch {}
    }
  }

  const notify = (name, event, newItem, oldItem) => {
    const fns = listeners[name]
    if (!fns) return
    for (const fn of fns) fn(newItem, oldItem, { event, table: name })
  }

  let idCounter = Date.now()

  return {
    name: 'local',
    store,

    select: async ({ from, params, ...modifiers }) => {
      const table = getTable(from)
      const filtered = table.filter(item => matchesParams(item, params))
      return applyModifiers(filtered, modifiers)
    },

    insert: async ({ from, data }) => {
      const table = getTable(from)
      const items = Array.isArray(data) ? data : [data]
      const inserted = items.map(item => {
        const row = { id: item.id || ++idCounter, ...item }
        table.push(row)
        return row
      })
      save(from)
      for (const row of inserted) notify(from, 'INSERT', row, null)
      return { data: Array.isArray(data) ? inserted : inserted[0], error: null }
    },

    update: async ({ from, data, params }) => {
      const table = getTable(from)
      const updated = []
      for (let i = 0; i < table.length; i++) {
        if (matchesParams(table[i], params)) {
          const old = { ...table[i] }
          Object.assign(table[i], data)
          updated.push(table[i])
          notify(from, 'UPDATE', table[i], old)
        }
      }
      save(from)
      return { data: updated, error: null }
    },

    delete: async ({ from, params }) => {
      const table = getTable(from)
      const removed = []
      for (let i = table.length - 1; i >= 0; i--) {
        if (matchesParams(table[i], params)) {
          removed.push(table[i])
          table.splice(i, 1)
          notify(from, 'DELETE', null, removed[removed.length - 1])
        }
      }
      save(from)
      return { data: removed, error: null }
    },

    subscribe: ({ from, on }, callback) => {
      if (!listeners[from]) listeners[from] = []
      const fn = (newItem, oldItem, payload) => {
        if (on && on !== '*' && on !== payload.event) return
        callback(newItem, oldItem, payload)
      }
      listeners[from].push(fn)
      return () => {
        const idx = listeners[from].indexOf(fn)
        if (idx > -1) listeners[from].splice(idx, 1)
      }
    }
  }
}
