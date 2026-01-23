import * as utils from '@domql/utils'
import { normalizeKeys } from './compareUtils.js'

const { objectToString } = utils.default || utils

// Keys managed by the CLI filesystem representation (exclude settings/schema/key/thumbnail/etc.)
export const DATA_KEYS = [
  'designSystem','components','state','pages','snippets',
  'methods','functions','dependencies','files'
]

const SCHEMA_CODE_TYPES = new Set(['pages', 'components', 'functions', 'methods', 'snippets'])
// Types that should auto-create a schema entry when a new key is added.
// NOTE: dependencies schema objects are not "code", but we still want them present for transport.
const SCHEMA_AUTO_CREATE_TYPES = new Set([...SCHEMA_CODE_TYPES, 'dependencies'])

function stripMetaDeep(val) {
  if (Array.isArray(val)) {
    return val.map(stripMetaDeep)
  }
  if (val && typeof val === 'object') {
    const out = {}
    for (const [k, v] of Object.entries(val)) {
      if (k === '__order') continue
      out[k] = stripMetaDeep(v)
    }
    return out
  }
  return val
}

function asPlain(obj) {
  // Ensure consistent comparison and strip meta keys (like __order)
  return stripMetaDeep(normalizeKeys(obj || {}))
}

function getPropCaseInsensitive(obj, key) {
  if (!obj || typeof obj !== 'object') return undefined
  // Prefer exact key first to avoid surprises.
  if (Object.prototype.hasOwnProperty.call(obj, key)) return obj[key]
  const lower = typeof key === 'string' ? key.toLowerCase() : key
  if (typeof lower === 'string' && Object.prototype.hasOwnProperty.call(obj, lower)) return obj[lower]
  return obj[key]
}

function equal(a, b) {
  // Coarse compare; sufficient for top-level merges
  try {
    return JSON.stringify(a) === JSON.stringify(b)
  } catch (_) {
    return a === b
  }
}

export function computeChangedKeys(base, local, keys = DATA_KEYS) {
  const changed = []
  const a = asPlain(base)
  const b = asPlain(local)
  // Only consider top-level data keys; ignore 'schema' entirely
  for (const key of [...keys]) {
    const ak = getPropCaseInsensitive(a, key)
    const bk = getPropCaseInsensitive(b, key)
    if (bk === undefined && ak !== undefined) {
      changed.push(key)
      continue
    }
    if (!equal(ak, bk)) {
      changed.push(key)
    }
  }
  return changed
}

export function computeCoarseChanges(base, local, keys = DATA_KEYS) {
  const changes = []
  const a = asPlain(base)
  const b = asPlain(local)

  // Generate per-item granular changes one level deeper for each data type.
  // Ignore 'schema' comparisons; manage schema side-effects below.
  const baseSchema = a?.schema || {}

  for (const typeKey of [...keys]) {
    const aSection = getPropCaseInsensitive(a, typeKey) || {}
    const bSection = getPropCaseInsensitive(b, typeKey) || {}
    const aSchemaSection = getPropCaseInsensitive(baseSchema, typeKey) || {}

    // If sections are not plain objects (or are arrays), fallback to coarse replacement on the section itself
    const aIsObject = aSection && typeof aSection === 'object' && !Array.isArray(aSection)
    const bIsObject = bSection && typeof bSection === 'object' && !Array.isArray(bSection)
    if (!aIsObject || !bIsObject) {
      const hasB = Object.prototype.hasOwnProperty.call(b, typeKey) || Object.prototype.hasOwnProperty.call(b, typeKey.toLowerCase())
      const hasA = Object.prototype.hasOwnProperty.call(a, typeKey) || Object.prototype.hasOwnProperty.call(a, typeKey.toLowerCase())
      if (!hasB && hasA) {
        changes.push(['delete', [typeKey]])
      } else if (!equal(aSection, bSection)) {
        changes.push(['update', [typeKey], bSection])
      }
      continue
    }

    // Handle deletions (items present in base but not in local)
    for (const itemKey of Object.keys(aSection)) {
      if (!(itemKey in bSection)) {
        changes.push(['delete', [typeKey, itemKey]])
        // When an item is deleted, also delete its schema entry
        changes.push(['delete', ['schema', typeKey, itemKey]])
      }
    }

    // Handle additions and updates (items present in local)
    for (const itemKey of Object.keys(bSection)) {
      const aVal = aSection[itemKey]
      const bVal = bSection[itemKey]
      const hadPrev = typeof aVal !== 'undefined'
      if (!hadPrev) {
        // New item
        changes.push(['update', [typeKey, itemKey], bVal])
        const hadSchema = aSchemaSection && Object.prototype.hasOwnProperty.call(aSchemaSection, itemKey)
        if (SCHEMA_AUTO_CREATE_TYPES.has(typeKey) && !hadSchema) {
          const schemaItem = buildSchemaItemFromData(typeKey, itemKey, bVal)
          if (schemaItem) {
            changes.push(['update', ['schema', typeKey, itemKey], schemaItem])
          }
        }
      } else if (!equal(aVal, bVal)) {
        // Updated item
        changes.push(['update', [typeKey, itemKey], bVal])
        // When a code-backed item changes, drop its schema.code to be regenerated
        if (SCHEMA_CODE_TYPES.has(typeKey)) {
          changes.push(['delete', ['schema', typeKey, itemKey, 'code']])
        }
      }
    }
  }

  return changes
}

export function threeWayRebase(base, local, remote, keys = DATA_KEYS) {
  const oursKeys = computeChangedKeys(base, local, keys)
  const theirsKeys = computeChangedKeys(base, remote, keys)
  const conflicts = oursKeys.filter(k => theirsKeys.includes(k))

  const allOurs = computeCoarseChanges(base, local, keys)
  const allTheirs = computeCoarseChanges(base, remote, keys)

  const ownsKey = (path, set) => {
    if (!Array.isArray(path) || !path.length) return false
    const [rootKey, typeKey] = path
    const primary = rootKey === 'schema' ? typeKey : rootKey
    return set.includes(primary)
  }

  const ours = allOurs.filter(([, path]) => ownsKey(path, oursKeys))
  const theirs = allTheirs.filter(([, path]) => ownsKey(path, theirsKeys))

  let finalChanges = []
  if (conflicts.length === 0) {
    // Safe to apply our edited keys onto remote
    finalChanges = ours
  }

  return {
    ours,
    theirs,
    conflicts,
    finalChanges
  }
}

// -------------------- Orders computation (adapted for CLI plain objects) --------------------
function isObjectLike(val) {
  return val && typeof val === 'object' && !Array.isArray(val)
}

function normalizePath(path) {
  if (Array.isArray(path)) return path
  if (typeof path === 'string') return [path]
  return []
}

function getByPathPlain(root, path = []) {
  if (!root) return null
  try {
    let cur = root
    for (let i = 0; i < path.length; i++) {
      const seg = path[i]
      if (cur == null || typeof cur !== 'object') return null
      cur = cur[seg]
    }
    return cur
  } catch (_) {
    return null
  }
}

function getParentPathsFromTuples(tuples = []) {
  const seen = new Set()
  const parents = []
  const META_KEYS = new Set([
    'style', 'class', 'text', 'html', 'content', 'data', 'attr', 'state', 'scope',
    'define', 'on', 'extend', 'extends', 'childExtend', 'childExtends',
    'children', 'component', 'context', 'tag', 'key', '__order', 'if'
  ])
  for (let i = 0; i < tuples.length; i++) {
    const tuple = tuples[i]
    if (!Array.isArray(tuple) || tuple.length < 2) continue
    const path = normalizePath(tuple[1])
    if (!path.length) continue
    if (path[0] === 'schema') continue
    const immediateParent = path.slice(0, -1)
    if (immediateParent.length) {
      const key = JSON.stringify(immediateParent)
      if (!seen.has(key)) {
        seen.add(key)
        parents.push(immediateParent)
      }
    }
    const last = path[path.length - 1]
    if (META_KEYS.has(last) && path.length >= 2) {
      const containerParent = path.slice(0, -2)
      if (containerParent.length) {
        const key2 = JSON.stringify(containerParent)
        if (!seen.has(key2)) {
          seen.add(key2)
          parents.push(containerParent)
        }
      }
    }
    for (let j = 0; j < path.length; j++) {
      const seg = path[j]
      if (!META_KEYS.has(seg)) continue
      const containerParent2 = path.slice(0, j)
      if (!containerParent2.length) continue
      const key3 = JSON.stringify(containerParent2)
      if (!seen.has(key3)) {
        seen.add(key3)
        parents.push(containerParent2)
      }
    }
  }
  return parents
}

function computeOrdersFromStatePlain(root, parentPaths = []) {
  const orders = []
  const EXCLUDE_KEYS = new Set(['__order'])
  for (let i = 0; i < parentPaths.length; i++) {
    const parentPath = parentPaths[i]
    const obj = getByPathPlain(root, parentPath)
    if (!isObjectLike(obj)) continue
    const keys = Object.keys(obj).filter(k => !EXCLUDE_KEYS.has(k))
    orders.push({ path: parentPath, keys })
  }
  return orders
}

// --- Schema `code` parsing helpers (adapted) ---
function normaliseSchemaCode(code) {
  if (typeof code !== 'string' || !code.length) return ''
  return code
    .replaceAll('/////n', '\n')
    .replaceAll('/////tilde', '`')
}

function encodeSchemaCode(code) {
  if (typeof code !== 'string' || !code.length) return ''
  return code
    .replaceAll('\n', '/////n')
    .replaceAll('`', '/////tilde')
}

function parseExportedObject(code) {
  const src = normaliseSchemaCode(code)
  if (!src) return null
  const body = src.replace(/^\s*export\s+default\s*/u, 'return ')
  try {
    // eslint-disable-next-line no-new-func
    return new Function(body)()
  } catch {
    return null
  }
}

export function buildSchemaCodeFromObject(obj) {
  if (!obj || typeof obj !== 'object') return ''
  const body = objectToString(obj, 2)
  const src = `export default ${body}`
  return encodeSchemaCode(src)
}

function buildSchemaItemFromData(type, key, value) {
  const schemaType = type

  if (schemaType === 'dependencies') {
    const version =
      typeof value === 'string' && value.length
        ? value
        : (value && typeof value === 'object' && typeof value.version === 'string' ? value.version : 'latest')
    return {
      key,
      resolvedVersion: version,
      type: 'dependency',
      version,
      status: 'done'
    }
  }

  const base = {
    title: key,
    key,
    type: schemaType
  }

  if (['pages', 'components'].includes(schemaType)) {
    base.settings = {
      gridOptions: {}
    }
    base.props = {}
    base.interactivity = []
    base.dataTypes = []
    base.error = null
  }

  if (SCHEMA_CODE_TYPES.has(schemaType)) {
    try {
      const code = buildSchemaCodeFromObject(value)
      if (code) {
        base.code = code
      }
    } catch (_) {
      // Fallback: omit code field if serialisation fails
    }
  }

  return base
}

function extractTopLevelKeysFromCode(code) {
  const obj = parseExportedObject(code)
  if (!obj || typeof obj !== 'object') return []
  return Object.keys(obj)
}

/**
 * Compute ordered key arrays for each parent path using a plain root object and granular tuples.
 */
export function computeOrdersForTuples(root, tuples = []) {
  const pendingChildrenByContainer = new Map()
  for (let i = 0; i < tuples.length; i++) {
    const t = tuples[i]
    if (!Array.isArray(t)) continue
    const [action, path] = t
    const p = normalizePath(path)
    if (!Array.isArray(p) || p.length < 3) continue
    if (p[0] === 'schema') continue
    const [typeName, containerKey, childKey] = p
    const containerPath = [typeName, containerKey]
    const key = JSON.stringify(containerPath)
    if (!pendingChildrenByContainer.has(key)) {
      pendingChildrenByContainer.set(key, new Set())
    }
    if (action === 'update' || action === 'set') {
      pendingChildrenByContainer.get(key).add(childKey)
    }
  }

  const preferredOrderMap = new Map()
  for (let i = 0; i < tuples.length; i++) {
    const t = tuples[i]
    if (!Array.isArray(t)) continue
    const [action, path, value] = t
    const p = normalizePath(path)
    if (action !== 'update' || !Array.isArray(p) || p.length < 3) continue
    if (p[0] !== 'schema') continue
    const [, type, key] = p
    const containerPath = [type, key]

    const obj = getByPathPlain(root, containerPath)
    if (!obj) continue

    const present = new Set(Object.keys(obj))
    const EXCLUDE_KEYS = new Set(['__order'])
    const uses = value && Array.isArray(value.uses) ? value.uses : null
    const code = value && value.code
    const codeKeys = extractTopLevelKeysFromCode(code)
    let resolved = []

    const pendingKey = JSON.stringify(containerPath)
    const pendingChildren = pendingChildrenByContainer.get(pendingKey) || new Set()
    const eligible = new Set([...present, ...pendingChildren])

    if (Array.isArray(codeKeys) && codeKeys.length) {
      resolved = codeKeys.filter(k => eligible.has(k) && !EXCLUDE_KEYS.has(k))
    }
    if (Array.isArray(uses) && uses.length) {
      for (let u = 0; u < uses.length; u++) {
        const keyName = uses[u]
        if (eligible.has(keyName) && !EXCLUDE_KEYS.has(keyName) && !resolved.includes(keyName)) {
          resolved.push(keyName)
        }
      }
    }
    if (pendingChildren.size) {
      for (const child of pendingChildren) {
        if (!EXCLUDE_KEYS.has(child) && !resolved.includes(child)) {
          resolved.push(child)
        }
      }
    }
    if (resolved.length) {
      preferredOrderMap.set(JSON.stringify(containerPath), { path: containerPath, keys: resolved })
    }
  }

  const parents = getParentPathsFromTuples(tuples)
  const orders = []
  const seen = new Set()
  preferredOrderMap.forEach(v => {
    const k = JSON.stringify(v.path)
    if (!seen.has(k)) { seen.add(k); orders.push(v) }
  })
  const fallbackOrders = computeOrdersFromStatePlain(root, parents)
  for (let i = 0; i < fallbackOrders.length; i++) {
    const v = fallbackOrders[i]
    const k = JSON.stringify(v.path)
    if (seen.has(k)) continue
    const pending = pendingChildrenByContainer.get(k)
    if (pending && pending.size) {
      const existing = new Set(v.keys)
      for (const child of pending) {
        if (existing.has(child)) continue
        v.keys.push(child)
      }
    }
    seen.add(k)
    orders.push(v)
  }
  return orders
}

// -------------------- Granular expansion (preprocess) --------------------
function isPlainObject(val) {
  return val && typeof val === 'object' && !Array.isArray(val)
}

function diffJsonPlain(prev, next, basePath = []) {
  const ops = []
  const prevIsObj = isPlainObject(prev)
  const nextIsObj = isPlainObject(next)
  if (!prevIsObj || !nextIsObj) {
    if (!equal(prev, next)) {
      ops.push({ action: 'set', path: [], value: next })
    }
    return ops
  }
  const prevKeys = new Set(Object.keys(prev || {}))
  const nextKeys = new Set(Object.keys(next || {}))
  // deletions
  prevKeys.forEach((k) => {
    if (!nextKeys.has(k)) {
      ops.push({ action: 'del', path: [k] })
    }
  })
  // additions/updates
  nextKeys.forEach((k) => {
    const pv = prev[k]
    const nv = next[k]
    if (!prevKeys.has(k)) {
      ops.push({ action: 'set', path: [k], value: nv })
    } else if (!equal(pv, nv)) {
      if (isPlainObject(pv) && isPlainObject(nv)) {
        const child = diffJsonPlain(pv, nv, [...basePath, k])
        if (child.length === 0) {
          ops.push({ action: 'set', path: [k], value: nv })
        } else {
          for (let i = 0; i < child.length; i++) {
            const c = child[i]
            ops.push({ action: c.action, path: [k, ...c.path], value: c.value })
          }
        }
      } else {
        ops.push({ action: 'set', path: [k], value: nv })
      }
    }
  })
  return ops
}

export function preprocessChanges(root, tuples = [], options = {}) {
  const META_FILES = 'files'

  const getByPath = (path) => getByPathPlain(root, path)

  const expandTuple = (t) => {
    const [action, path, value] = t || []
    const isSchemaPath = Array.isArray(path) && path[0] === 'schema'
    const isFilesPath = Array.isArray(path) && path[0] === META_FILES
    if (action === 'delete') return [t]
    const canConsiderExpansion = (
      action === 'update' &&
      Array.isArray(path) &&
      (
        path.length === 1 ||
        path.length === 2 ||
        (isSchemaPath && path.length === 3)
      ) &&
      isPlainObject(value)
    )
    if (!canConsiderExpansion || isFilesPath || (value && value.type === META_FILES)) return [t]

    const prevRaw = getByPath(path)
    const isCreatePath = (
      Array.isArray(path) &&
      action === 'update' &&
      ((!isSchemaPath && path.length === 2) || (isSchemaPath && path.length === 3)) &&
      (prevRaw === null || typeof prevRaw === 'undefined')
    )
    if (isCreatePath) return [t]

    const prev = prevRaw || {}
    const next = value || {}
    if (!isPlainObject(prev) || !isPlainObject(next)) return [t]

    const ops = diffJsonPlain(prev, next, [])
    if (!ops.length) return [t]

    const out = []
    for (let i = 0; i < ops.length; i++) {
      const op = ops[i]
      const fullPath = [...path, ...op.path]
      const last = fullPath[fullPath.length - 1]
      if (op.action === 'set') {
        out.push(['update', fullPath, op.value])
      } else if (op.action === 'del') {
        if (last !== '__order') out.push(['delete', fullPath])
      }
    }
    return out
  }

  const minimizeTuples = (input) => {
    const out = []
    const seen = new Set()
    for (let i = 0; i < input.length; i++) {
      const expanded = expandTuple(input[i])
      for (let k = 0; k < expanded.length; k++) {
        const tuple = expanded[k]
        const isDelete = Array.isArray(tuple) && tuple[0] === 'delete'
        const isOrderKey = isDelete && Array.isArray(tuple[1]) && tuple[1][tuple[1].length - 1] === '__order'
        if (!isOrderKey) {
          const key = JSON.stringify(tuple)
          if (!seen.has(key)) { seen.add(key); out.push(tuple) }
        }
      }
    }
    return out
  }

  const granularChanges = (() => {
    try {
      const res = minimizeTuples(tuples || [])
      if (options.append && options.append.length) res.push(...options.append)
      return res
    } catch {
      return Array.isArray(tuples) ? tuples.slice() : []
    }
  })()

  const orders = computeOrdersForTuples(root || {}, granularChanges)
  return { granularChanges, orders }
}


