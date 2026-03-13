'use strict'

import { get, set } from './resolve.js'
import { exec, RETURN } from './exec.js'

/**
 * Evaluate a funcql schema node.
 *
 * Schema can be:
 *  - string   → expression (exec)
 *  - array    → sequence of steps or [fnName, ...args] call
 *  - object   → bindings, conditionals, loops, await blocks
 *
 * @param {*} node - funcql schema node
 * @param {object} ctx - evaluation context
 * @returns {Promise<*>}
 */
export const evaluate = async (node, ctx = {}) => {
  if (node == null) return node

  // string → execute expression
  if (typeof node === 'string') {
    const result = exec(node, ctx)
    return result
  }

  // array → sequence or function call
  if (Array.isArray(node)) {
    return evaluateArray(node, ctx)
  }

  // object → walk keys
  if (typeof node === 'object') {
    return evaluateObject(node, ctx)
  }

  return node
}

/**
 * Evaluate an array node.
 *
 * If first element is a string and rest are args, it's a call:
 *   ['setProps', { text: 'Play' }]
 *   ['sdk.updateData', [...]]
 *
 * If first element is an array or object, it's a sequence:
 *   ['audio.pause()', ['setProps', { text: 'Play' }]]
 */
const evaluateArray = async (arr, ctx) => {
  if (!arr.length) return

  const first = arr[0]

  // sequence of steps: each element is its own statement
  if (Array.isArray(first) || (typeof first === 'object' && first !== null && !Array.isArray(first))) {
    return evaluateSequence(arr, ctx)
  }

  // if first is a string, check if it looks like a call
  if (typeof first === 'string') {
    // pure sequence: all elements are strings or arrays
    const isSequence = arr.every(item =>
      typeof item === 'string' || Array.isArray(item)
    )
    // if it starts with a path that resolves to a function, it's a call
    const fn = get(first, ctx)
    if (typeof fn === 'function') {
      const args = await resolveArgs(arr.slice(1), ctx)
      const thisObj = getCallThis(first, ctx)
      return fn.apply(thisObj, args)
    }

    // otherwise treat as sequence
    if (isSequence) return evaluateSequence(arr, ctx)
  }

  return evaluateSequence(arr, ctx)
}

/**
 * Execute array items in sequence, stopping on RETURN.
 */
const evaluateSequence = async (arr, ctx) => {
  let lastResult
  for (const step of arr) {
    lastResult = await evaluate(step, ctx)
    if (lastResult === RETURN) return RETURN
  }
  return lastResult
}

/**
 * Resolve an array of arguments, evaluating each.
 */
const resolveArgs = async (args, ctx) => {
  const resolved = []
  for (const arg of args) {
    if (typeof arg === 'string') {
      // try to resolve as variable, fall back to literal
      const val = get(arg, ctx)
      resolved.push(val !== undefined ? val : arg)
    } else if (Array.isArray(arg)) {
      // nested array passed as-is (e.g. batch operations)
      resolved.push(await resolveArgArray(arg, ctx))
    } else if (typeof arg === 'object' && arg !== null) {
      // object arg — resolve any string values within it
      resolved.push(await resolveArgObject(arg, ctx))
    } else {
      resolved.push(arg)
    }
  }
  return resolved
}

/**
 * Resolve string values inside an object argument.
 */
const resolveArgObject = async (obj, ctx) => {
  const result = {}
  for (const [key, val] of Object.entries(obj)) {
    if (typeof val === 'string') {
      const resolved = get(val, ctx)
      result[key] = resolved !== undefined ? resolved : val
    } else if (Array.isArray(val)) {
      result[key] = await resolveArgArray(val, ctx)
    } else if (typeof val === 'object' && val !== null) {
      result[key] = await resolveArgObject(val, ctx)
    } else {
      result[key] = val
    }
  }
  return result
}

/**
 * Resolve a nested array argument.
 */
const resolveArgArray = async (arr, ctx) => {
  const result = []
  for (const item of arr) {
    if (Array.isArray(item)) {
      result.push(await resolveArgArray(item, ctx))
    } else if (typeof item === 'string') {
      const val = get(item, ctx)
      result.push(val !== undefined ? val : item)
    } else if (typeof item === 'object' && item !== null) {
      result.push(await resolveArgObject(item, ctx))
    } else {
      result.push(item)
    }
  }
  return result
}

/**
 * Get `this` for a function call path.
 */
const getCallThis = (path, ctx) => {
  const parts = path.split('.')
  if (parts.length <= 1) return ctx
  parts.pop()
  return get(parts.join('.'), ctx)
}

/**
 * Evaluate an object schema.
 *
 * Reserved keys:
 *  - if: [condition, then, else?]  or  [[cond1, then1], [cond2, then2, else2]]
 *  - await: [...steps]
 *  - for: [varName, 'in', iterablePath, body]
 *  - async: true (marker, no-op)
 *  - else: block (runs if previous `if` was falsy — pairs with `if`)
 *
 * All other keys are variable bindings:
 *  - audio: 'scope.audio'  → ctx.audio = resolve('scope.audio')
 */
const evaluateObject = async (obj, ctx) => {
  const entries = Object.entries(obj)

  let lastIfResult = undefined

  for (const [key, val] of entries) {
    // skip marker keys
    if (key === 'async') continue

    // conditional
    if (key === 'if') {
      // support chained ifs: if value is array-of-arrays
      if (Array.isArray(val) && val.length && Array.isArray(val[0])) {
        for (const clause of val) {
          const result = await evaluateIf(clause, ctx)
          if (result === RETURN) return RETURN
        }
        lastIfResult = undefined
        continue
      }
      lastIfResult = await evaluateIf(val, ctx)
      if (lastIfResult === RETURN) return RETURN
      continue
    }

    // else: runs when previous `if` condition was falsy
    if (key === 'else') {
      if (!lastIfResult) {
        const result = await evaluate(val, ctx)
        if (result === RETURN) return RETURN
      }
      lastIfResult = undefined
      continue
    }

    // await block
    if (key === 'await') {
      await evaluate(val, ctx)
      continue
    }

    // for loop: ['item', 'in', 'items', body]
    if (key === 'for') {
      const result = await evaluateFor(val, ctx)
      if (result === RETURN) return RETURN
      continue
    }

    // reset if tracking on non-control keys
    lastIfResult = undefined

    // variable binding
    const resolved = exec(val, ctx)
    if (resolved === RETURN) return RETURN
    ctx[key] = resolved
  }
}

/**
 * Evaluate if: [condition, thenBlock, elseBlock?]
 * Returns the condition result (truthy/falsy) so `else` can use it,
 * or RETURN if a branch returned early.
 */
const evaluateIf = async (val, ctx) => {
  if (!Array.isArray(val) || val.length < 2) return undefined

  const [condition, thenBlock, elseBlock] = val
  const test = await evaluate(condition, ctx)

  if (test) {
    const result = await evaluate(thenBlock, ctx)
    if (result === RETURN) return RETURN
    return true
  } else if (elseBlock !== undefined) {
    const result = await evaluate(elseBlock, ctx)
    if (result === RETURN) return RETURN
    return false
  }
  return false
}

/**
 * Evaluate for: [varName, 'in', iterablePath, body]
 */
const evaluateFor = async (val, ctx) => {
  if (!Array.isArray(val) || val.length < 4) return

  const [varName, , iterablePath, body] = val
  const iterable = get(iterablePath, ctx)
  if (!iterable || !iterable[Symbol.iterator]) return

  for (const item of iterable) {
    ctx[varName] = item
    const result = await evaluate(body, ctx)
    if (result === RETURN) return RETURN
  }
}
