'use strict'

import {
  abbrToProp,
  PRESERVE_VALUE_KEYS,
  isComponentKey,
  isSelectorKey
} from './registry.js'

/**
 * Decode a shorthand string back into a Symbols component object.
 *
 * Syntax:
 *   abbr:value   — key-value pair
 *   _            — decoded to spaces in values
 *   ,            — array values (ext:Flex,Box → extends: ['Flex', 'Box'])
 *   bare abbr    — boolean true
 *   !abbr        — boolean false
 *
 * @param {string} str — shorthand string
 * @returns {Object} — Symbols component object
 */
export function decode(str) {
  if (!str || typeof str !== 'string') return {}

  const obj = {}
  const tokens = tokenize(str)

  for (const token of tokens) {
    // Boolean false: !abbr
    if (token.startsWith('!')) {
      const abbr = token.slice(1)
      const prop = abbrToProp[abbr] || abbr
      obj[prop] = false
      continue
    }

    const colonIdx = token.indexOf(':')

    // Boolean true: bare abbreviation
    if (colonIdx === -1) {
      const prop = abbrToProp[token] || token
      obj[prop] = true
      continue
    }

    const abbr = token.slice(0, colonIdx)
    const rawVal = token.slice(colonIdx + 1)
    const prop = abbrToProp[abbr] || abbr

    // Array value: comma-separated
    if (rawVal.includes(',')) {
      obj[prop] = rawVal.split(',').map(decodeValue)
      continue
    }

    obj[prop] = decodeValue(rawVal)
  }

  return obj
}

/**
 * Tokenize a shorthand string by splitting on spaces,
 * respecting that underscores represent spaces within values.
 */
function tokenize(str) {
  return str.trim().split(/\s+/).filter(Boolean)
}

/**
 * Decode a single value: underscores → spaces, parse numbers and booleans.
 */
function decodeValue(val) {
  const str = val.replace(/_/g, ' ')

  // Try parsing as number
  if (/^-?\d+(\.\d+)?$/.test(str)) {
    return Number(str)
  }

  return str
}

/**
 * Decode inline `in` string values preserving string types.
 * Unlike decodeValue, this does NOT convert numeric strings to numbers,
 * since CSS values like '0', '1', '.5' must stay as strings.
 */
function decodeInlineValue(val) {
  return val.replace(/_/g, ' ')
}

/**
 * Decode an `in` string (from stringify) back to key-value pairs.
 * Uses string-preserving value decode to avoid lossy type coercion.
 */
function decodeInline(str) {
  if (!str || typeof str !== 'string') return {}

  const obj = {}
  const tokens = tokenize(str)

  for (const token of tokens) {
    if (token.startsWith('!')) {
      const abbr = token.slice(1)
      const prop = abbrToProp[abbr] || abbr
      obj[prop] = false
      continue
    }

    const colonIdx = token.indexOf(':')

    if (colonIdx === -1) {
      const prop = abbrToProp[token] || token
      obj[prop] = true
      continue
    }

    const abbr = token.slice(0, colonIdx)
    const rawVal = token.slice(colonIdx + 1)
    const prop = abbrToProp[abbr] || abbr

    // Array value: comma-separated
    if (rawVal.includes(',')) {
      obj[prop] = rawVal.split(',').map(decodeInlineValue)
      continue
    }

    obj[prop] = decodeInlineValue(rawVal)
  }

  return obj
}

/**
 * Recursively expand abbreviated property names back to full names.
 *
 * Inverse of shorten(). Handles:
 * - PascalCase keys: kept, values recursed
 * - CSS selectors / media / cases: kept, values recursed
 * - Event abbreviations (@ck → onClick): expanded via registry
 * - state, scope, attr, style, data, context, query, class values: preserved as-is
 * - Everything else: key expanded, value recursed if object/array
 *
 * @param {Object} obj — shortened component object
 * @returns {Object} — expanded component object with full property names
 */
export function expand(obj) {
  if (!obj || typeof obj !== 'object') return obj
  if (Array.isArray(obj)) {
    return obj.map(function (item) {
      if (item !== null && typeof item === 'object') return expand(item)
      return item
    })
  }

  const result = {}

  for (const key in obj) {
    const val = obj[key]

    // PascalCase = child component → keep key, recurse value
    if (isComponentKey(key)) {
      result[key] = expandVal(val)
      continue
    }

    // Try to resolve abbreviation first
    const fullKey = abbrToProp[key] || key

    // Selector/media/case key that is NOT an event abbreviation → keep key, recurse
    if (isSelectorKey(key) && fullKey === key) {
      result[key] = expandVal(val)
      continue
    }

    // Preserved keys: value NOT recursed
    if (PRESERVE_VALUE_KEYS.has(fullKey) || PRESERVE_VALUE_KEYS.has(key)) {
      result[fullKey] = val
      continue
    }

    result[fullKey] = expandVal(val)
  }

  return result
}

function expandVal(val) {
  if (val === null || val === undefined) return val
  if (typeof val === 'function') return val
  if (Array.isArray(val)) {
    return val.map(function (item) {
      if (item !== null && typeof item === 'object') return expand(item)
      return item
    })
  }
  if (typeof val === 'object') return expand(val)
  return val
}

/**
 * Recursively convert a stringified object (with `in` properties) back
 * to a full component object with expanded property names.
 *
 * Inverse of stringify(). Decodes `in` strings into flat key-value props,
 * expands all abbreviated keys, and recurses into children/selectors.
 *
 * @param {Object} obj — stringified object with `in` properties
 * @returns {Object} — full Symbols component object
 */
export function parse(obj) {
  if (!obj || typeof obj !== 'object') return obj
  if (Array.isArray(obj)) {
    return obj.map(function (item) {
      if (item !== null && typeof item === 'object') return parse(item)
      return item
    })
  }

  const result = {}

  // Decode the `in` string first so its props come first in key order
  if (typeof obj.in === 'string') {
    const decoded = decodeInline(obj.in)
    for (const prop in decoded) {
      result[prop] = decoded[prop]
    }
  }

  for (const key in obj) {
    if (key === 'in') continue

    const val = obj[key]

    // PascalCase = child component → keep key, recurse value
    if (isComponentKey(key)) {
      result[key] = parseVal(val)
      continue
    }

    // Try to resolve abbreviation
    const fullKey = abbrToProp[key] || key

    // Selector/media/case key that is NOT an event abbreviation → keep key, recurse
    if (isSelectorKey(key) && fullKey === key) {
      result[key] = parseVal(val)
      continue
    }

    // Preserved keys: value NOT recursed
    if (PRESERVE_VALUE_KEYS.has(fullKey) || PRESERVE_VALUE_KEYS.has(key)) {
      result[fullKey] = val
      continue
    }

    result[fullKey] = parseVal(val)
  }

  return result
}

function parseVal(val) {
  if (val === null || val === undefined) return val
  if (typeof val === 'function') return val
  if (Array.isArray(val)) {
    return val.map(function (item) {
      if (item !== null && typeof item === 'object') return parse(item)
      return item
    })
  }
  if (typeof val === 'object') return parse(val)
  return val
}
