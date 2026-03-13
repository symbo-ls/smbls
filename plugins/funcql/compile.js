'use strict'

import { evaluate } from './eval.js'

/**
 * Compile a funcql schema into a callable function.
 *
 * The returned function accepts arguments that become
 * the initial context keys (positional, mapped by argNames).
 *
 * @param {object} schema - funcql schema object
 * @param {string[]} [argNames] - argument names for the compiled function
 * @returns {Function}
 */
export const compile = (schema, argNames = []) => {
  const isAsync = schema.async === true

  const fn = isAsync
    ? async function (...args) {
        const ctx = buildCtx(argNames, args, this)
        return evaluate(schema, ctx)
      }
    : function (...args) {
        const ctx = buildCtx(argNames, args, this)
        return evaluate(schema, ctx)
      }

  return fn
}

/**
 * Build initial context from named arguments.
 */
const buildCtx = (argNames, args, thisRef) => {
  const ctx = {}
  if (thisRef) ctx.this = thisRef
  argNames.forEach((name, i) => {
    ctx[name] = args[i]
  })
  return ctx
}
