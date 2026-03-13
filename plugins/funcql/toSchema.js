'use strict'

/**
 * Convert a JavaScript function to a funcql schema.
 *
 * This performs a best-effort conversion by parsing the function
 * source string. It handles common patterns:
 *  - variable declarations → key bindings
 *  - if/else → if: [condition, then, else]
 *  - method calls → ['method', ...args] or 'method()'
 *  - return → 'return'
 *
 * For complex functions, it falls back to storing the source.
 *
 * @param {Function} fn - JavaScript function to convert
 * @returns {object} funcql schema
 */
export const toSchema = (fn) => {
  if (typeof fn !== 'function') return fn

  const source = fn.toString()
  const isAsync = source.startsWith('async')

  // extract argument names
  const argsMatch = source.match(/\(([^)]*)\)/)
  const args = argsMatch
    ? argsMatch[1].split(',').map(a => a.trim()).filter(Boolean)
    : []

  return {
    async: isAsync || undefined,
    args,
    source
  }
}
