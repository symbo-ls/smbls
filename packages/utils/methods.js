'use strict'

import { triggerEventOn } from './triggerEvent.js'
import { DOMQ_PROPERTIES, METHODS, PARSED_DOMQ_PROPERTIES } from './keys.js'
import { isDefined, isFunction, isObject, isObjectLike } from './types.js'
import { deepClone } from './object.js'
import { isProduction } from './env.js'
import { removeValueFromArray } from './array.js'
import { OPTIONS } from './cache.js'
const ENV = process.env.NODE_ENV

// TODO: update these files
export function spotByPath (path) {
  const element = this
  const { __ref: ref } = element
  const arr = [].concat(path)
  let foundelement = ref.root[arr[0]]

  if (!arr || !arr.length) {
    return console.log(arr, 'on', element.key, 'is undefined')
  }

  while (foundelement.key === arr[0]) {
    arr.shift()
    if (!arr.length) break
    foundelement = foundelement[arr[0]]
    if (!foundelement) return
  }

  return foundelement
}

// TODO: update these files
export function lookup (param) {
  const el = this
  let { parent } = el

  if (isFunction(param)) {
    if (parent.state && param(parent, parent.state, parent.context)) {
      return parent
    } else if (parent.parent) return parent.lookup(param)
    else return
  }

  if (el[param]) return el[param]

  while (parent.param !== param) {
    if (parent[param]) return parent[param]
    parent = parent.parent
    if (!parent) return
  }

  return parent
}

export function lookdown (param) {
  const el = this
  const { __ref: ref } = el
  const children = ref?.__children

  if (!children) return

  for (let i = 0; i < children.length; i++) {
    const v = children[i]
    const childElem = el[v]

    if (v === param) return childElem
    else if (isFunction(param)) {
      const exec = param(childElem, childElem.state, childElem.context)
      if (childElem.state && exec) {
        return childElem
      }
    }
    const lookdown = childElem?.lookdown?.(param)
    if (lookdown) return lookdown
  }
}

export function lookdownAll (param, results = []) {
  const el = this
  const { __ref: ref } = el
  const children = ref?.__children

  if (!children) return

  for (let i = 0; i < children.length; i++) {
    const v = children[i]
    const childElem = el[v]

    if (v === param) results.push(childElem)
    else if (isFunction(param)) {
      const exec = param(childElem, childElem.state, childElem.context)
      if (childElem.state && exec) results.push(childElem)
    }
    childElem?.lookdownAll?.(param, results)
  }

  return results.length ? results : undefined
}

export function setNodeStyles (params = {}) {
  const el = this
  if (!el.node?.style) return

  for (const param in params) {
    const value = params[param]
    const childElem = el[param]
    if (isObject(value) && childElem) setNodeStyles.call(childElem, value)
    else el.node.style[param] = value
  }

  return el
}

export function remove (opts) {
  const element = this
  const beforeRemoveReturns = triggerEventOn('beforeRemove', element, opts)
  if (beforeRemoveReturns === false) return element
  if (isFunction(element.node.remove)) element.node.remove()
  else if (!isProduction()) {
    console.warn('This item cant be removed')
    element.log()
  }
  delete element.parent[element.key]
  if (element.parent.__ref) {
    element.parent.__ref.__children = removeValueFromArray(
      element.parent.__ref.__children,
      element.key
    )
  }
  triggerEventOn('remove', element, opts)
}

export function get (param) {
  const element = this
  return element[param]
}

export function setProps (param, options) {
  const element = this
  if (!param || !element.props) return
  element.update({ props: param }, options)
  return element
}

export function getRef (key) {
  if (key) return this.__ref && this.__ref[key]
  return this.__ref
}

export function getChildren () {
  const __children = this.getRef('__children')
  return __children.map(k => this[k])
}

export function getPath () {
  return this.getRef().path
}

export function getRootState (param) {
  let state = null
  const hasRootState = (obj) => obj.__element && obj.root?.isRootState
  if (!this) {
    state = window.platformState || window.smblsApp?.state
  } else if (hasRootState(this)) {
    state = this.root
  } else if (this.__ref && this.__ref.path) {
    const hasPlatformState = this.state && hasRootState(this.state)
    const hasPlatformStateOnParent =
      isFunction(this.state) &&
      this.parent.state &&
      hasRootState(this.parent.state)
    if (hasPlatformState || hasPlatformStateOnParent) {
      state = this.state.root || this.parent.state.root
    }
  }
  if (!state) {
    state = window.platformState || window.smblsApp?.state
  }
  return param ? state?.[param] : state
}

export function getRoot (key) {
  const rootElem = this.getRootState()?.__element
  return rootElem && Object.keys(rootElem).length > 0 && key
    ? rootElem[key]
    : rootElem
}

export function getRootData (key) {
  return this.getRoot('data') &&
    Object.keys(this.getRoot('data')).length > 0 &&
    key
    ? this.getRoot('data')[key]
    : this.getRoot('data')
}

export function getRootContext (key) {
  const ctx = this.getRoot()?.context
  return key ? ctx[key] : ctx
}

export function getContext (key) {
  const ctx = this.context
  return key ? ctx[key] : ctx
}

export const defineSetter = (element, key, get, set) =>
  Object.defineProperty(element, key, { get, set })

export function keys () {
  const element = this
  const keys = []
  for (const param in element) {
    if (
      // (REGISTRY[param] && !DOMQ_PROPERTIES.has(param)) ||
      !Object.prototype.hasOwnProperty.call(element, param) ||
      (DOMQ_PROPERTIES.has(param) &&
        !PARSED_DOMQ_PROPERTIES.has(param))
    ) {
      continue
    }
    keys.push(param)
  }
  return keys
}

export function parse (excl = []) {
  const element = this
  const obj = {}
  const keyList = keys.call(element)
  const hasChildren = keyList.includes('children')
  const exclSet = excl.length ? new Set(excl) : null
  for (let i = 0; i < keyList.length; i++) {
    const v = keyList[i]
    if ((exclSet && exclSet.has(v)) || !Object.prototype.hasOwnProperty.call(element, v)) continue
    if (hasChildren && v === 'content') continue
    const val = element[v]
    if (v === 'state') {
      if (element.__ref && !element.__ref.__hasRootState) continue
      const parsedVal = isFunction(val && val.parse) ? val.parse() : val
      obj[v] = isFunction(parsedVal)
        ? parsedVal
        : JSON.parse(JSON.stringify(parsedVal || {}))
    } else if (v === 'scope') {
      if (element.__ref && !element.__ref.__hasRootScope) continue
      obj[v] = JSON.parse(JSON.stringify(val || {}))
    } else if (v === 'props') {
      const { __element, update, ...props } = element[v]
      obj[v] = props
    } else if (isDefined(val) && Object.prototype.hasOwnProperty.call(element, v)) {
      obj[v] = val
    }
  }
  return obj
}

export function parseDeep (excl = [], visited = new WeakSet()) {
  const element = this
  if (visited.has(element)) return undefined
  visited.add(element)
  const obj = parse.call(element, excl)
  const exclSet = excl.length ? new Set(excl) : null
  for (const v in obj) {
    if ((exclSet && exclSet.has(v)) || !Object.prototype.hasOwnProperty.call(element, v)) continue
    const val = obj[v]
    if (Array.isArray(val)) {
      obj[v] = val.map(item =>
        isObjectLike(item) ? parseDeep.call(item, excl, visited) : item
      )
    } else if (isObjectLike(val)) {
      obj[v] = parseDeep.call(val, excl, visited)
    }
  }
  return obj
}

export function verbose (...args) {
  if (ENV !== 'test' && ENV !== 'development') return

  const element = this
  const { __ref: ref } = element
  console.groupCollapsed(element.key)
  if (args.length) {
    args.forEach(v => console.log(`%c${v}:\n`, 'font-weight: bold', element[v]))
  } else {
    console.log(ref.path)
    const keys = element.keys()
    keys.forEach(v => console.log(`%c${v}:`, 'font-weight: bold', element[v]))
  }
  console.log(element)
  console.groupEnd(element.key)
  return element
}

export function log (...params) {
  if (ENV === 'test' || ENV === 'development') {
    console.log(...params)
  }
}

export function warn (...params) {
  if (ENV === 'test' || ENV === 'development') {
    console.warn(...params)
  }
}

export function error (...params) {
  if (ENV === 'test' || ENV === 'development') {
    if (params[params.length - 1]?.debugger) debugger // eslint-disable-line
    if (params[params.length - 1]?.verbose) verbose.call(this)
    throw new Error(...params)
  }
}

export function nextElement () {
  const element = this
  const { key, parent } = element
  const { __children } = parent.__ref

  const currentIndex = __children.indexOf(key)
  const nextChild = __children[currentIndex + 1]

  return parent[nextChild]
}

export function previousElement (el) {
  const element = el || this
  const { key, parent } = element
  const { __children } = parent.__ref

  if (!__children) return

  const currentIndex = __children.indexOf(key)
  return parent[__children[currentIndex - 1]]
}

export function variables (obj = {}) {
  const element = this
  if (!element.data) element.data = {}
  if (!element.data.varCaches) element.data.varCaches = {}
  const varCaches = element.data.varCaches
  const changes = {}
  let changed
  for (const key in obj) {
    if (obj[key] !== varCaches[key]) {
      changed = true
      changes[key] = obj[key]
    }
  }
  return {
    changed: cb => {
      if (!changed) return
      const returns = cb(changes, deepClone(varCaches))
      for (const key in changes) {
        varCaches[key] = changes[key]
      }
      return returns
    },
    timeout: (cb, timeout) => {
      if (!changed) return
      const t = setTimeout(() => {
        cb(changes)
        clearTimeout(t)
      }, timeout)
    }
  }
}

/**
 * A unified call function that detects the calling context and adapts accordingly.
 * - When called in an async context (with await), it fully resolves promises
 * - When called in a sync context, it returns sync results directly and handles promises appropriately
 *
 * @param {string} fnKey - The name of the function to call
 * @param {...any} args - Arguments to pass to the function
 * @returns {any|Promise} - The result or a Promise to the result
 */
export function call (fnKey, ...args) {
  const context = this.context
  const fn = (
    context.utils?.[fnKey] ||
    context.functions?.[fnKey] ||
    context.methods?.[fnKey] ||
    context.snippets?.[fnKey]
  )
  if (!fn) return
  try {
    const result = fn.call(this, ...args)
    if (result && typeof result.then === 'function') {
      result.catch((err) => {
        this.error = err
      })
    }
    return result
  } catch (err) {
    this.error = err
    if (context?.strictMode) throw err
  }
}

export async function getDB () {
  const element = this
  const db = element.context?.fetch
  if (!db) return null
  if (typeof db.select === 'function') {
    if (!db.__authInitialized && db.getSession) {
      const { initAdapterAuth } = await import('@symbo.ls/fetch')
      await initAdapterAuth(db, element.context)
    }
    return db
  }
  if (db.__resolved) {
    if (!db.__resolved.__authInitialized && db.__resolved.getSession) {
      const { initAdapterAuth } = await import('@symbo.ls/fetch')
      await initAdapterAuth(db.__resolved, element.context)
    }
    return db.__resolved
  }
  if (db.__resolving) return db.__resolving
  // Set __resolving synchronously BEFORE the async import to prevent
  // resolveAdapter() from starting a parallel resolveDb() during the yield
  const resolvePromise = import('@symbo.ls/fetch').then(({ resolveDb }) => resolveDb(db))
  db.__resolving = resolvePromise
  const resolved = await resolvePromise
  db.__resolved = resolved
  element.context.fetch = resolved
  delete db.__resolving
  if (resolved.getSession) {
    const { initAdapterAuth } = await import('@symbo.ls/fetch')
    await initAdapterAuth(resolved, element.context)
  }
  return resolved
}

export function getQuery (format) {
  const element = this
  const useStateQuery = format || OPTIONS.useStateQuery || element.context?.useStateQuery
  if (!useStateQuery) return null

  const query = {}
  buildQueryFromElement(element, query)

  if (useStateQuery === true) return query
  const formatter = QUERY_FORMATTERS[useStateQuery]
  return formatter ? formatter(query) : query
}

const buildQueryFromElement = (element, query) => {
  const ref = element.__ref
  if (!ref) return

  const stateKey = ref.__state
  if (stateKey && typeof stateKey === 'string') {
    setQueryPath(query, stateKey)
  }

  const children = ref.__children
  if (children) {
    for (let i = 0; i < children.length; i++) {
      const child = element[children[i]]
      if (child && child.__ref) {
        buildQueryFromElement(child, query)
      }
    }
  }

  const contentKey = ref.contentElementKey || 'content'
  const content = element[contentKey]
  if (content && content.__ref) {
    buildQueryFromElement(content, query)
  }
}

const setQueryPath = (query, path) => {
  const clean = path.replaceAll('../', '').replaceAll('~/', '')
  const parts = clean.split('/')
  let current = query
  for (let i = 0; i < parts.length; i++) {
    const part = parts[i]
    if (i === parts.length - 1) {
      if (!current[part]) current[part] = true
    } else {
      if (current[part] === true) current[part] = {}
      if (!current[part]) current[part] = {}
      current = current[part]
    }
  }
}

// --- Query formatters ---

const queryToGraphQL = (query, indent = 0) => {
  const pad = '  '.repeat(indent)
  const entries = Object.entries(query)
  if (!entries.length) return ''
  const fields = entries.map(([key, value]) => {
    if (value === true) return `${pad}${key}`
    return `${pad}${key} {\n${queryToGraphQL(value, indent + 1)}\n${pad}}`
  })
  return fields.join('\n')
}

const formatGraphQL = query => {
  return `{\n${queryToGraphQL(query, 1)}\n}`
}

const formatJsonApi = query => {
  const result = { fields: {}, include: [] }
  const walk = (obj, prefix) => {
    const fields = []
    for (const key in obj) {
      if (obj[key] === true) {
        fields.push(key)
      } else {
        const nested = prefix ? `${prefix}.${key}` : key
        result.include.push(nested)
        walk(obj[key], nested)
      }
    }
    if (fields.length) {
      result.fields[prefix || '_root'] = fields
    }
  }
  walk(query, '')
  return result
}

const formatOData = query => {
  const build = obj => {
    const select = []
    const expand = []
    for (const key in obj) {
      if (obj[key] === true) {
        select.push(key)
      } else {
        const nested = build(obj[key])
        const parts = []
        if (nested.select) parts.push(`$select=${nested.select}`)
        if (nested.expand) parts.push(`$expand=${nested.expand}`)
        expand.push(parts.length ? `${key}(${parts.join(';')})` : key)
      }
    }
    return {
      select: select.length ? select.join(',') : '',
      expand: expand.length ? expand.join(',') : ''
    }
  }
  const { select, expand } = build(query)
  const parts = []
  if (select) parts.push(`$select=${select}`)
  if (expand) parts.push(`$expand=${expand}`)
  return parts.join('&')
}

const formatSQL = (query, options) => {
  const columns = []
  const joins = []
  const tables = new Set()

  const walk = (obj, table, parentTable) => {
    tables.add(table)
    if (parentTable) {
      joins.push(
        `LEFT JOIN ${table} ON ${table}.${parentTable}_id = ${parentTable}.id`
      )
    }
    for (const key in obj) {
      if (obj[key] === true) {
        columns.push(`${table}.${key}`)
      } else {
        walk(obj[key], key, table)
      }
    }
  }

  const roots = Object.keys(query)
  if (roots.length === 1 && query[roots[0]] !== true) {
    walk(query[roots[0]], roots[0], null)
  } else {
    walk(query, '_root', null)
  }

  const from = [...tables][0] || '_root'
  const select = columns.length ? columns.join(', ') : '*'
  const joinStr = joins.length ? '\n' + joins.join('\n') : ''
  return `SELECT ${select}\nFROM ${from}${joinStr}`
}

const formatPaths = query => {
  const paths = []
  const walk = (obj, prefix) => {
    for (const key in obj) {
      const path = prefix ? `${prefix}/${key}` : key
      if (obj[key] === true) {
        paths.push(path)
      } else {
        walk(obj[key], path)
      }
    }
  }
  walk(query, '')
  return paths
}

const formatSupabase = query => {
  const build = obj => {
    const parts = []
    for (const key in obj) {
      if (obj[key] === true) {
        parts.push(key)
      } else {
        parts.push(`${key}(${build(obj[key])})`)
      }
    }
    return parts.join(', ')
  }
  const roots = Object.keys(query)
  if (roots.length === 1 && query[roots[0]] !== true) {
    return { from: roots[0], select: build(query[roots[0]]) }
  }
  return { from: null, select: build(query) }
}

const QUERY_FORMATTERS = {
  graphql: formatGraphQL,
  'json-api': formatJsonApi,
  odata: formatOData,
  sql: formatSQL,
  supabase: formatSupabase,
  paths: formatPaths
}

export function isMethod (param, element) {
  return Boolean(METHODS.has(param) || element?.context?.methods?.[param])
}
