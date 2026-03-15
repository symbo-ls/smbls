'use strict'

/**
 * Resolve a dot-path string against multiple context layers.
 * Looks in ctx first, then ctx.el, then globalThis.
 *
 * @param {string} path - Dot-separated path like 'scope.audio'
 * @param {object} ctx - Evaluation context
 * @returns {*} Resolved value or undefined
 */
export const get = (path, ctx) => {
  if (typeof path !== 'string') return path
  if (path === 'true') return true
  if (path === 'false') return false
  if (path === 'null') return null
  if (path === 'undefined') return undefined

  const num = Number(path)
  if (!isNaN(num) && path !== '') return num

  const candidates = [ctx, ctx?.el, globalThis]
  for (const base of candidates) {
    if (!base) continue
    const val = walk(path, base)
    if (val !== undefined) return val
  }
  return undefined
}

/**
 * Walk a dot path on a single object.
 */
const walk = (path, obj) => {
  const parts = path.split('.')
  let current = obj
  for (const part of parts) {
    if (current == null) return undefined
    current = current[part]
  }
  return current
}

/**
 * Set a value at a dot path on ctx.
 */
export const set = (path, value, ctx) => {
  const parts = path.split('.')
  const last = parts.pop()
  let target = ctx
  for (const part of parts) {
    if (target[part] == null) target[part] = {}
    target = target[part]
  }
  target[last] = value
}

/**
 * Resolve the `this` binding for a method call path.
 * e.g. 'audio.pause' → resolves 'audio'
 */
export const resolveThis = (path, ctx) => {
  const parts = path.split('.')
  parts.pop()
  if (!parts.length) return ctx
  return get(parts.join('.'), ctx)
}
