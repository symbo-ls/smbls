'use strict'

import { get, resolveThis } from './resolve.js'

/**
 * Execute a string expression in context.
 *
 * Handles:
 *  - 'return'          → sentinel to break execution
 *  - 'audio.pause()'   → method call
 *  - '!audio'          → negation
 *  - 'scope.audio'     → property access
 *
 * @param {string} expr
 * @param {object} ctx
 * @returns {*}
 */
export const exec = (expr, ctx) => {
  if (typeof expr !== 'string') return expr
  if (expr === 'return') return RETURN

  // negation: '!audio', '!audio.paused'
  if (expr[0] === '!' && /^!\w/.test(expr)) {
    return !get(expr.slice(1), ctx)
  }

  // method call: 'audio.pause()', 'sdk.updateData()'
  const callMatch = expr.match(/^([\w$.]+)\(\s*\)$/)
  if (callMatch) {
    const fnPath = callMatch[1]
    const fn = get(fnPath, ctx)
    const thisObj = resolveThis(fnPath, ctx)
    if (typeof fn === 'function') return fn.call(thisObj)
    return undefined
  }

  // property access
  return get(expr, ctx)
}

/**
 * Sentinel value for early return.
 */
export const RETURN = Symbol('funcql.return')
