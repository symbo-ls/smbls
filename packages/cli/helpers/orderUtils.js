/**
 * Strip Symbols ordering metadata (`__order`) from a project object.
 *
 * We treat `__order` as platform/transport metadata and avoid persisting it
 * into local repositories (generated files or base snapshots).
 *
 * - Preserves functions and non-plain objects as-is
 * - Clones arrays and plain objects
 * - Handles cycles via WeakMap
 */
export function stripOrderFields(input) {
  const seen = new WeakMap()

  function isPlainObject(v) {
    return Object.prototype.toString.call(v) === '[object Object]'
  }

  function walk(value) {
    if (Array.isArray(value)) {
      if (seen.has(value)) return seen.get(value)
      const out = new Array(value.length)
      seen.set(value, out)
      for (let i = 0; i < value.length; i++) out[i] = walk(value[i])
      return out
    }

    if (value && typeof value === 'object') {
      // Keep non-plain objects (Date, Map, etc.) as-is
      if (!isPlainObject(value)) return value
      if (seen.has(value)) return seen.get(value)
      const out = {}
      seen.set(value, out)
      for (const k of Object.keys(value)) {
        if (k === '__order') continue
        out[k] = walk(value[k])
      }
      return out
    }

    return value
  }

  return walk(input)
}

/**
 * Apply Symbols ordering metadata (`__order`) to object key insertion order,
 * while removing the `__order` fields from the returned structure.
 *
 * This lets us generate deterministic file output (e.g. index.js exports) that
 * matches the platform ordering without persisting platform metadata into the
 * repository.
 *
 * - Preserves functions and non-plain objects as-is
 * - Clones arrays and plain objects
 * - Handles cycles via WeakMap
 */
export function applyOrderFields(input) {
  const seen = new WeakMap()

  function isPlainObject(v) {
    return Object.prototype.toString.call(v) === '[object Object]'
  }

  function walk(value) {
    if (Array.isArray(value)) {
      if (seen.has(value)) return seen.get(value)
      const out = new Array(value.length)
      seen.set(value, out)
      for (let i = 0; i < value.length; i++) out[i] = walk(value[i])
      return out
    }

    if (value && typeof value === 'object') {
      // Keep non-plain objects (Date, Map, etc.) as-is
      if (!isPlainObject(value)) return value
      if (seen.has(value)) return seen.get(value)

      const out = {}
      seen.set(value, out)

      const order = Array.isArray(value.__order) ? value.__order : null
      const keys = Object.keys(value).filter((k) => k !== '__order')
      const used = new Set()

      if (order) {
        for (let i = 0; i < order.length; i++) {
          const k = order[i]
          if (k === '__order') continue
          if (Object.prototype.hasOwnProperty.call(value, k) && !used.has(k)) {
            out[k] = walk(value[k])
            used.add(k)
          }
        }
      }

      for (let i = 0; i < keys.length; i++) {
        const k = keys[i]
        if (used.has(k)) continue
        out[k] = walk(value[k])
        used.add(k)
      }

      return out
    }

    return value
  }

  return walk(input)
}


