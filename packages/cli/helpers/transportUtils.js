// Utilities for preparing data for transport to the Symbols API.
// Mirrors the behaviour used in the web app for serialising functions.

// Keys that should be skipped entirely when cloning for transport.
// These typically contain non-serialisable metadata or runtime-only values.
// NOTE: This list can be extended to stay in sync with the webapp if needed.
export const FUNCTION_META_KEYS = [
  // Internal / meta fields that should not be transported
  '__fn',
  '__fnMeta',
  '__handler',
  '__meta'
]

/**
 * Recursively clones a value and stringifies any functions so that the
 * result is JSON-serialisable and safe to send over the wire.
 *
 * This intentionally skips keys listed in FUNCTION_META_KEYS to avoid
 * leaking internal runtime metadata.
 *
 * @param {any} value
 * @param {WeakMap<object, any>} [seen]
 * @returns {any}
 */
export function stringifyFunctionsForTransport (value, seen = new WeakMap()) {
  // Primitive values or functions
  if (value === null || typeof value !== 'object') {
    return typeof value === 'function' ? value.toString() : value
  }

  // Handle circular references
  if (seen.has(value)) {
    return seen.get(value)
  }

  const clone = Array.isArray(value) ? [] : {}
  seen.set(value, clone)

  if (Array.isArray(value)) {
    for (let i = 0; i < value.length; i++) {
      clone[i] = stringifyFunctionsForTransport(value[i], seen)
    }
    return clone
  }

  const keys = Object.keys(value)
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i]
    if (!FUNCTION_META_KEYS.includes(key)) {
      clone[key] = stringifyFunctionsForTransport(value[key], seen)
    }
  }

  return clone
}


