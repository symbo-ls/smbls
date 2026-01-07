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


