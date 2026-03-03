'use strict'

import {
  propToAbbr,
  PRESERVE_VALUE_KEYS,
  SKIP_INLINE_KEYS,
  isComponentKey,
  isSelectorKey
} from './registry.js'

/**
 * Encode a Symbols component object into a shorthand string.
 *
 * Syntax:
 *   abbr:value   — key-value pair
 *   _            — replaces spaces inside values
 *   ,            — array separator (extends: ['Flex', 'Box'] → ext:Flex,Box)
 *   space        — token separator
 *   bare abbr    — boolean true  (e.g. `hid` → hidden: true)
 *   !abbr        — boolean false (e.g. `!hid` → hidden: false)
 *
 * Functions, objects, and other non-serializable values are skipped.
 *
 * @param {Object} obj — Symbols component object
 * @returns {string} — shorthand string
 */
export function encode(obj) {
  if (!obj || typeof obj !== 'object') return ''

  const tokens = []

  for (const prop in obj) {
    const val = obj[prop]

    // Skip functions and nested objects (events, childProps, scope, etc.)
    if (typeof val === 'function') continue
    if (val !== null && typeof val === 'object' && !Array.isArray(val)) continue
    if (val === undefined) continue

    const abbr = propToAbbr[prop] || prop

    if (val === true) {
      tokens.push(abbr)
    } else if (val === false) {
      tokens.push('!' + abbr)
    } else if (Array.isArray(val)) {
      const items = val.map((item) => encodeValue(item))
      tokens.push(abbr + ':' + items.join(','))
    } else {
      tokens.push(abbr + ':' + encodeValue(val))
    }
  }

  return tokens.join(' ')
}

/**
 * Encode a single value: replace spaces with underscores.
 */
function encodeValue(val) {
  const str = String(val)
  return str.replace(/ /g, '_')
}

/**
 * Recursively shorten property names in a Symbols component object.
 *
 * - PascalCase keys (child components) are kept as-is, values recursed
 * - CSS selectors / media queries / cases are kept as-is, values recursed
 * - Functions are preserved as-is (key is shortened)
 * - state, scope, attr, style, data, context, query, class values are preserved as-is
 * - Everything else: key shortened, value recursed if object/array
 *
 * @param {Object} obj — Symbols component object
 * @returns {Object} — shortened component object
 */
export function shorten(obj) {
  if (!obj || typeof obj !== 'object') return obj
  if (Array.isArray(obj)) {
    return obj.map(function (item) {
      if (item !== null && typeof item === 'object') return shorten(item)
      return item
    })
  }

  const result = {}

  for (const key in obj) {
    const val = obj[key]

    // PascalCase = child component → keep key, recurse value
    if (isComponentKey(key)) {
      result[key] = shortenVal(val)
      continue
    }

    // CSS selectors, media queries, cases → keep key, recurse value
    if (isSelectorKey(key)) {
      result[key] = shortenVal(val)
      continue
    }

    // Shorten the key
    const shortKey = propToAbbr[key] || key

    // Preserved keys: value NOT recursed (state data, scope fns, etc.)
    if (PRESERVE_VALUE_KEYS.has(key) || PRESERVE_VALUE_KEYS.has(shortKey)) {
      result[shortKey] = val
      continue
    }

    result[shortKey] = shortenVal(val)
  }

  return result
}

function shortenVal(val) {
  if (val === null || val === undefined) return val
  if (typeof val === 'function') return val
  if (Array.isArray(val)) {
    return val.map(function (item) {
      if (item !== null && typeof item === 'object') return shorten(item)
      return item
    })
  }
  if (typeof val === 'object') return shorten(val)
  return val
}

/**
 * Recursively convert a component object into a stringified form.
 *
 * Flat primitive props (strings, numbers, booleans, primitive arrays)
 * are encoded into an `in` string using abbreviated keys.
 * Structural props (functions, objects, arrays of objects, PascalCase children,
 * selectors, state, scope) remain as shortened object keys.
 *
 * @param {Object} obj — Symbols component object
 * @returns {Object} — stringified object with `in` property
 */
export function stringify(obj) {
  if (!obj || typeof obj !== 'object') return obj
  if (Array.isArray(obj)) {
    return obj.map(function (item) {
      if (item !== null && typeof item === 'object') return stringify(item)
      return item
    })
  }

  const result = {}
  const tokens = []

  for (const key in obj) {
    const val = obj[key]

    // PascalCase = child component → keep key, recurse value
    if (isComponentKey(key)) {
      result[key] = stringifyVal(val)
      continue
    }

    // CSS selectors, media queries, cases → keep key, recurse value
    if (isSelectorKey(key)) {
      result[key] = stringifyVal(val)
      continue
    }

    const shortKey = propToAbbr[key] || key

    // Preserved keys (state, scope, etc.) → keep as-is
    if (PRESERVE_VALUE_KEYS.has(key) || PRESERVE_VALUE_KEYS.has(shortKey)) {
      result[shortKey] = val
      continue
    }

    // Functions → keep as shortened key
    if (typeof val === 'function') {
      result[shortKey] = val
      continue
    }

    // null / undefined → keep as shortened key
    if (val === null || val === undefined) {
      result[shortKey] = val
      continue
    }

    // Skip-inline keys (text, html, content, placeholder, src, href) → keep as shortened key
    if (SKIP_INLINE_KEYS.has(key) || SKIP_INLINE_KEYS.has(shortKey)) {
      result[shortKey] = val
      continue
    }

    // Arrays of objects → keep as shortened key, recurse items
    if (Array.isArray(val)) {
      const hasObjects = val.some(function (item) {
        return item !== null && typeof item === 'object'
      })
      if (hasObjects) {
        result[shortKey] = val.map(function (item) {
          if (item !== null && typeof item === 'object') return stringify(item)
          return item
        })
        continue
      }
      // Single-element arrays can't round-trip through in (decoded as scalar)
      if (val.length <= 1) {
        result[shortKey] = val
        continue
      }
      // Primitive array → encode into `in` token
      tokens.push(shortKey + ':' + val.map(encodeValue).join(','))
      continue
    }

    // Objects → keep as shortened key, recurse
    if (typeof val === 'object') {
      result[shortKey] = stringify(val)
      continue
    }

    // Primitives (string, number, boolean) → encode into `in` token
    if (val === true) {
      tokens.push(shortKey)
    } else if (val === false) {
      tokens.push('!' + shortKey)
    } else if (typeof val === 'number') {
      // Numbers must stay as object keys to preserve type
      result[shortKey] = val
    } else if (
      typeof val === 'string' &&
      (val.includes(',') || val.includes('_'))
    ) {
      // Strings with commas or underscores can't be safely encoded
      result[shortKey] = val
    } else {
      tokens.push(shortKey + ':' + encodeValue(val))
    }
  }

  if (tokens.length) {
    result.in = tokens.join(' ')
  }

  return result
}

function stringifyVal(val) {
  if (val === null || val === undefined) return val
  if (typeof val === 'function') return val
  if (Array.isArray(val)) {
    return val.map(function (item) {
      if (item !== null && typeof item === 'object') return stringify(item)
      return item
    })
  }
  if (typeof val === 'object') return stringify(val)
  return val
}
