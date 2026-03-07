'use strict'

import { window } from './globals.js'
import {
  isFunction,
  isObjectLike,
  isObject,
  isArray,
  isString,
  is
} from './types.js'
import { unstackArrayOfObjects } from './array.js'
import { stringIncludesAny } from './string.js'
import { isDOMNode } from './node.js'
import { METHODS_EXL } from './keys.js'

const ENV = process.env.NODE_ENV

const _startsWithDunder = e => e.charCodeAt(0) === 95 && e.charCodeAt(1) === 95

export const exec = (param, element, state, context) => {
  if (isFunction(param)) {
    if (!element) return
    const result = param.call(
      element,
      element,
      state || element.state,
      context || element.context
    )
    if (result && typeof result.then === 'function') {
      let resolved
      result.then(value => {
        resolved = value
      })
      return resolved
    }
    return result
  }
  return param
}

export const map = (obj, extention, element) => {
  for (const e in extention) {
    obj[e] = exec(extention[e], element)
  }
}

export const merge = (element, obj, excludeFrom = []) => {
  const useSet = excludeFrom instanceof Set
  for (const e in obj) {
    if (!Object.prototype.hasOwnProperty.call(obj, e)) continue
    if (_startsWithDunder(e)) continue
    if (useSet ? excludeFrom.has(e) : excludeFrom.includes(e)) continue
    if (element[e] === undefined) {
      element[e] = obj[e]
    }
  }
  return element
}

export const deepMerge = (element, extend, excludeFrom = METHODS_EXL) => {
  const useSet = excludeFrom instanceof Set
  for (const e in extend) {
    if (!Object.prototype.hasOwnProperty.call(extend, e)) continue
    if (_startsWithDunder(e)) continue
    if (useSet ? excludeFrom.has(e) : excludeFrom.includes(e)) continue
    const elementProp = element[e]
    const extendProp = extend[e]
    if (isObjectLike(elementProp) && isObjectLike(extendProp)) {
      deepMerge(elementProp, extendProp, excludeFrom)
    } else if (elementProp === undefined) {
      element[e] = extendProp
    }
  }
  return element
}

export const clone = (obj, excludeFrom = []) => {
  const useSet = excludeFrom instanceof Set
  const o = {}
  for (const prop in obj) {
    if (!Object.prototype.hasOwnProperty.call(obj, prop)) continue
    if (_startsWithDunder(prop)) continue
    if (useSet ? excludeFrom.has(prop) : excludeFrom.includes(prop)) continue
    o[prop] = obj[prop]
  }
  return o
}

/**
 * Enhanced deep clone function that combines features from multiple implementations
 * @param {any} obj - Object to clone
 * @param {Object} options - Configuration options
 * @param {string[]} options.exclude - Properties to exclude from cloning
 * @param {boolean} options.cleanUndefined - Remove undefined values
 * @param {boolean} options.cleanNull - Remove null values
 * @param {Window} options.window - Window object for cross-frame cloning
 * @param {WeakMap} options.visited - WeakMap for tracking circular references
 * @param {boolean} options.handleExtends - Whether to handle 'extends' arrays specially
 * @returns {any} Cloned object
 */
export const deepClone = (obj, options = {}) => {
  const {
    exclude = [],
    cleanUndefined = false,
    cleanNull = false,
    window: targetWindow,
    visited = new WeakMap(),
    handleExtends = false
  } = options

  const contentWindow = targetWindow || window || globalThis

  // Handle non-object types and special cases
  if (!isObjectLike(obj) || isDOMNode(obj)) {
    return obj
  }

  // Handle circular references
  if (visited.has(obj)) {
    return visited.get(obj)
  }

  // Create appropriate container based on type and window context
  const isArr = isArray(obj)
  const clone = isArr ? [] : {}

  // Store the clone to handle circular references
  visited.set(obj, clone)

  // Convert exclude to Set for O(1) lookups when list is non-trivial
  const excludeSet = exclude instanceof Set ? exclude : (exclude.length > 3 ? new Set(exclude) : null)

  // Clone properties
  for (const key in obj) {
    if (!Object.prototype.hasOwnProperty.call(obj, key)) continue

    // Skip excluded properties
    if (_startsWithDunder(key) || key === '__proto__') continue
    if (excludeSet ? excludeSet.has(key) : exclude.includes(key)) continue

    const value = obj[key]

    // Skip based on cleanup options
    if (cleanUndefined && value === undefined) continue
    if (cleanNull && value === null) continue

    // Handle special cases
    if (isDOMNode(value)) {
      clone[key] = value
      continue
    }

    // Handle 'extends' array if enabled
    if (handleExtends && key === 'extends' && isArray(value)) {
      clone[key] = unstackArrayOfObjects(value, exclude)
      continue
    }

    // Handle functions in cross-frame scenario
    if (isFunction(value) && options.window) {
      clone[key] = contentWindow.eval('(' + value.toString() + ')')
      continue
    }

    // Recursively clone objects
    if (isObjectLike(value)) {
      clone[key] = deepClone(value, {
        ...options,
        visited
      })
    } else {
      clone[key] = value
    }
  }

  return clone
}

/**
 * Stringify object
 */
export const deepStringifyFunctions = (obj, stringified = {}) => {
  if (obj.node || obj.__ref || obj.parent || obj.__element || obj.parse) {
    ;(obj.__element || obj.parent?.__element).warn(
      'Trying to clone element or state at',
      obj
    )
    obj = obj.parse?.()
  }

  for (const prop in obj) {
    const objProp = obj[prop]
    if (isFunction(objProp)) {
      stringified[prop] = objProp.toString()
    } else if (isObject(objProp)) {
      stringified[prop] = {}
      deepStringifyFunctions(objProp, stringified[prop])
    } else if (isArray(objProp)) {
      const arr = stringified[prop] = []
      for (let i = 0; i < objProp.length; i++) {
        const v = objProp[i]
        if (isObject(v)) {
          arr[i] = {}
          deepStringifyFunctions(v, arr[i])
        } else if (isFunction(v)) {
          arr[i] = v.toString()
        } else {
          arr[i] = v
        }
      }
    } else {
      stringified[prop] = objProp
    }
  }
  return stringified
}

const OBJ_TO_STR_SPECIAL_CHARS = new Set([
  '&', '*', '-', ':', '%', '{', '}', '>', '<', '@', '.', '/', '!', ' '
])

export const objectToString = (obj = {}, indent = 0) => {
  // Handle empty object case
  if (obj === null || typeof obj !== 'object') {
    return String(obj)
  }

  // Handle empty object case - avoid Object.keys allocation
  let hasKeys = false
  for (const _k in obj) { hasKeys = true; break } // eslint-disable-line
  if (!hasKeys) return '{}'

  const spaces = '  '.repeat(indent)
  let str = '{\n'

  for (const key in obj) {
    if (!Object.prototype.hasOwnProperty.call(obj, key)) continue
    const value = obj[key]
    let keyNeedsQuotes = false
    for (let i = 0; i < key.length; i++) {
      if (OBJ_TO_STR_SPECIAL_CHARS.has(key[i])) { keyNeedsQuotes = true; break }
    }
    const stringedKey = keyNeedsQuotes ? `'${key}'` : key
    str += `${spaces}  ${stringedKey}: `

    if (isArray(value)) {
      str += '[\n'
      for (const element of value) {
        if (isObjectLike(element) && element !== null) {
          str += `${spaces}    ${objectToString(element, indent + 2)},\n`
        } else if (isString(element)) {
          str += `${spaces}    '${element}',\n`
        } else {
          str += `${spaces}    ${element},\n`
        }
      }
      str += `${spaces}  ]`
    } else if (isObjectLike(value)) {
      str += objectToString(value, indent + 1)
    } else if (isString(value)) {
      str += stringIncludesAny(value, ['\n', "'"])
        ? `\`${value}\``
        : `'${value}'`
    } else {
      str += value
    }

    str += ',\n'
  }

  str += `${spaces}}`
  return str
}

const FN_PATTERNS = [
  /^\(\s*\{[^}]*\}\s*\)\s*=>/,
  /^(\([^)]*\)|[^=]*)\s*=>/,
  /^function[\s(]/,
  /^async\s+/,
  /^\(\s*function/,
  /^[a-zA-Z_$][a-zA-Z0-9_$]*\s*=>/
]
const RE_JSON_LIKE = /^["[{]/

export const hasFunction = str => {
  if (!str) return false

  const trimmed = str.trim().replace(/\n\s*/g, ' ').trim()

  if (trimmed === '' || trimmed === '{}' || trimmed === '[]') return false

  const isFn = FN_PATTERNS.some(pattern => pattern.test(trimmed))
  if (!isFn) return false

  const firstChar = trimmed.charCodeAt(0)
  const hasArrow = trimmed.includes('=>')
  // '{' = 123, '[' = 91
  if (firstChar === 123 && !hasArrow) return false // object literal
  if (firstChar === 91) return false // array literal
  if (RE_JSON_LIKE.test(trimmed) && !hasArrow) return false

  return true
}

export const deepDestringifyFunctions = (obj, destringified = {}) => {
  for (const prop in obj) {
    if (!Object.prototype.hasOwnProperty.call(obj, prop)) continue

    const objProp = obj[prop]

    if (isString(objProp)) {
      if (hasFunction(objProp)) {
        try {
          destringified[prop] = window.eval(`(${objProp})`)
        } catch (e) {
          if (e) destringified[prop] = objProp
        }
      } else {
        destringified[prop] = objProp
      }
    } else if (isArray(objProp)) {
      const arr = destringified[prop] = []
      for (let i = 0; i < objProp.length; i++) {
        const arrProp = objProp[i]
        if (isString(arrProp)) {
          if (hasFunction(arrProp)) {
            try {
              arr.push(window.eval(`(${arrProp})`))
            } catch (e) {
              if (e) arr.push(arrProp)
            }
          } else {
            arr.push(arrProp)
          }
        } else if (isObject(arrProp)) {
          arr.push(deepDestringifyFunctions(arrProp))
        } else {
          arr.push(arrProp)
        }
      }
    } else if (isObject(objProp)) {
      destringified[prop] = deepDestringifyFunctions(objProp, destringified[prop])
    } else {
      destringified[prop] = objProp
    }
  }
  return destringified
}

export const stringToObject = (str, opts = { verbose: true }) => {
  try {
    return str ? window.eval('(' + str + ')') : {} // eslint-disable-line
  } catch (e) {
    if (opts.verbose) console.warn(e)
  }
}

export const hasOwnProperty = (o, ...args) =>
  Object.prototype.hasOwnProperty.call(o, ...args)

export const isEmpty = o => {
  for (const _ in o) return false // eslint-disable-line
  return true
}

export const isEmptyObject = o => isObject(o) && isEmpty(o)

export const makeObjectWithoutPrototype = () => Object.create(null)

/**
 * Overwrites object properties with another
 */
export const overwrite = (element, params, opts = {}) => {
  const excl = opts.exclude || []
  const allowUnderscore = opts.preventUnderscore

  for (const e in params) {
    if (excl.includes(e) || (!allowUnderscore && _startsWithDunder(e))) continue
    if (params[e] !== undefined) {
      element[e] = params[e]
    }
  }

  return element
}

export const overwriteShallow = (obj, params, excludeFrom = []) => {
  const useSet = excludeFrom instanceof Set
  for (const e in params) {
    if (_startsWithDunder(e)) continue
    if (useSet ? excludeFrom.has(e) : excludeFrom.includes(e)) continue
    obj[e] = params[e]
  }
  return obj
}

/**
 * Overwrites DEEPLY object properties with another
 */
export const overwriteDeep = (
  obj,
  params,
  opts = {},
  visited = new WeakMap()
) => {
  if (
    !isObjectLike(obj) ||
    !isObjectLike(params) ||
    isDOMNode(obj) ||
    isDOMNode(params)
  ) {
    return params
  }

  if (visited.has(obj)) return visited.get(obj)
  visited.set(obj, obj)

  const excl = opts.exclude
  const exclSet = excl ? (excl instanceof Set ? excl : new Set(excl)) : null
  const forcedExclude = !opts.preventForce

  for (const e in params) {
    if (!Object.prototype.hasOwnProperty.call(params, e)) continue
    if ((exclSet && exclSet.has(e)) || (forcedExclude && _startsWithDunder(e))) continue

    const objProp = obj[e]
    const paramsProp = params[e]

    if (isDOMNode(paramsProp)) {
      obj[e] = paramsProp
    } else if (isObjectLike(objProp) && isObjectLike(paramsProp)) {
      obj[e] = overwriteDeep(objProp, paramsProp, opts, visited)
    } else if (paramsProp !== undefined) {
      obj[e] = paramsProp
    }
  }

  return obj
}

/**
 * Recursively compares two values to determine if they are deeply equal.
 */
export const isEqualDeep = (param, element, visited = new Set()) => {
  if (
    typeof param !== 'object' ||
    typeof element !== 'object' ||
    param === null ||
    element === null
  ) {
    return param === element
  }

  if (visited.has(param) || visited.has(element)) {
    return true
  }

  visited.add(param)
  visited.add(element)

  const keysParam = Object.keys(param)
  const keysElement = Object.keys(element)

  if (keysParam.length !== keysElement.length) {
    return false
  }

  for (let i = 0; i < keysParam.length; i++) {
    const key = keysParam[i]
    if (!Object.prototype.hasOwnProperty.call(element, key)) {
      return false
    }
    if (!isEqualDeep(param[key], element[key], visited)) {
      return false
    }
  }

  return true
}

const DEEP_CONTAINS_IGNORED = new Set(['node', '__ref'])

export const deepContains = (obj1, obj2, ignoredKeys = DEEP_CONTAINS_IGNORED) => {
  if (obj1 === obj2) return true
  if (!isObjectLike(obj1) || !isObjectLike(obj2)) return obj1 === obj2
  if (isDOMNode(obj1) || isDOMNode(obj2)) return obj1 === obj2

  const ignored = ignoredKeys instanceof Set ? ignoredKeys : new Set(ignoredKeys)
  const visited = new WeakSet()

  function checkContains (target, source) {
    if (visited.has(source)) return true
    visited.add(source)

    for (const key in source) {
      if (!Object.prototype.hasOwnProperty.call(source, key)) continue
      if (ignored.has(key)) continue
      if (!Object.prototype.hasOwnProperty.call(target, key)) return false

      const sourceValue = source[key]
      const targetValue = target[key]

      if (isDOMNode(sourceValue) || isDOMNode(targetValue)) {
        if (sourceValue !== targetValue) return false
      } else if (isObjectLike(sourceValue) && isObjectLike(targetValue)) {
        if (!checkContains(targetValue, sourceValue)) return false
      } else if (sourceValue !== targetValue) {
        return false
      }
    }

    return true
  }

  return checkContains(obj1, obj2)
}

export const removeFromObject = (obj, props) => {
  if (props === undefined || props === null) return obj
  if (is(props)('string', 'number')) {
    delete obj[props]
  } else if (isArray(props)) {
    for (let i = 0; i < props.length; i++) delete obj[props[i]]
  } else {
    throw new Error(
      'Invalid input: props must be a string or an array of strings'
    )
  }
  return obj
}

export const createObjectWithoutPrototype = obj => {
  if (obj === null || typeof obj !== 'object') {
    return obj
  }

  const newObj = Object.create(null)

  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      newObj[key] = createObjectWithoutPrototype(obj[key])
    }
  }

  return newObj
}

export const createNestedObject = (arr, lastValue) => {
  if (arr.length === 0) return lastValue

  const nestedObject = {}
  let current = nestedObject

  for (let i = 0; i < arr.length; i++) {
    if (i === arr.length - 1 && lastValue) {
      current[arr[i]] = lastValue
    } else {
      current[arr[i]] = {}
      current = current[arr[i]]
    }
  }

  return nestedObject
}

export const removeNestedKeyByPath = (obj, path) => {
  if (!Array.isArray(path)) {
    throw new Error('Path must be an array.')
  }

  let current = obj

  for (let i = 0; i < path.length - 1; i++) {
    if (current[path[i]] === undefined) return
    current = current[path[i]]
  }

  const lastKey = path[path.length - 1]
  if (current && Object.prototype.hasOwnProperty.call(current, lastKey)) {
    delete current[lastKey]
  }
}

export const setInObjectByPath = (obj, path, value) => {
  if (!Array.isArray(path)) {
    throw new Error('Path must be an array.')
  }

  let current = obj

  for (let i = 0; i < path.length - 1; i++) {
    if (!current[path[i]] || typeof current[path[i]] !== 'object') {
      current[path[i]] = {}
    }
    current = current[path[i]]
  }

  current[path[path.length - 1]] = value

  return obj
}

export const getInObjectByPath = (obj, path) => {
  if (!Array.isArray(path)) {
    throw new Error('Path must be an array.')
  }

  let current = obj

  for (let i = 0; i < path.length; i++) {
    if (current === undefined || current === null) {
      return undefined
    }
    current = current[path[i]]
  }

  return current
}

export const detectInfiniteLoop = arr => {
  const maxRepeats = 10
  let pattern = []
  let repeatCount = 0

  for (let i = 0; i < arr.length; i++) {
    if (pattern.length < 2) {
      pattern.push(arr[i])
    } else {
      if (arr[i] === pattern[i % 2]) {
        repeatCount++
      } else {
        pattern = [arr[i - 1], arr[i]]
        repeatCount = 1
      }

      if (repeatCount >= maxRepeats * 2) {
        if (ENV === 'test' || ENV === 'development') {
          console.warn(
            'Warning: Potential infinite loop detected due to repeated sequence:',
            pattern
          )
        }
        return true
      }
    }
  }
}

export const isCyclic = obj => {
  const seen = new WeakSet()

  function detect (obj) {
    if (obj && typeof obj === 'object') {
      if (seen.has(obj)) return true
      seen.add(obj)
      for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key) && detect(obj[key])) {
          console.log(obj, 'cycle at ' + key)
          return true
        }
      }
    }
    return false
  }

  return detect(obj)
}

export const excludeKeysFromObject = (obj, excludedKeys) => {
  const excluded = excludedKeys instanceof Set ? excludedKeys : new Set(excludedKeys)
  const result = {}
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key) && !excluded.has(key)) {
      result[key] = obj[key]
    }
  }
  return result
}
