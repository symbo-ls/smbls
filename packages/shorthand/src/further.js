'use strict'

import {
  propToAbbr,
  abbrToProp,
  PRESERVE_VALUE_KEYS,
  SKIP_INLINE_KEYS,
  isComponentKey,
  isSelectorKey
} from './registry.js'

// ── Value encoding ──

/**
 * Escape a value for the further-inlined `in` string.
 *
 * Handles characters that conflict with the token format:
 *   \  →  \\    (literal backslash)
 *   _  →  \_    (literal underscore, since _ normally means space)
 *   ,  →  \,    (literal comma, since , normally means array separator)
 *   ' ' →  _    (space encoded as underscore)
 */
function escapeValue(val) {
  const str = String(val)
  return str
    .replace(/\\/g, '\\\\')
    .replace(/_/g, '\\_')
    .replace(/,/g, '\\,')
    .replace(/ /g, '_')
}

/**
 * Unescape a value from the further-inlined `in` string.
 * Processes character-by-character to handle escape sequences.
 */
function unescapeValue(val) {
  let result = ''
  let i = 0
  while (i < val.length) {
    if (val[i] === '\\' && i + 1 < val.length) {
      const next = val[i + 1]
      if (next === ',' || next === '_' || next === '\\') {
        result += next
        i += 2
        continue
      }
    }
    if (val[i] === '_') {
      result += ' '
    } else {
      result += val[i]
    }
    i++
  }
  return result
}

/**
 * Split a string on commas that are NOT escaped with backslash.
 */
function splitOnUnescapedCommas(str) {
  const parts = []
  let current = ''
  let i = 0
  while (i < str.length) {
    if (str[i] === '\\' && i + 1 < str.length) {
      current += str[i] + str[i + 1]
      i += 2
      continue
    }
    if (str[i] === ',') {
      parts.push(current)
      current = ''
      i++
      continue
    }
    current += str[i]
    i++
  }
  parts.push(current)
  return parts
}

// ── Encode ──

/**
 * Returns true if a recursed value can be collapsed from { in: '...' } to a bare string.
 */
function canCollapse(val) {
  if (val === null || val === undefined) return false
  if (typeof val !== 'object' || Array.isArray(val)) return false
  const keys = Object.keys(val)
  return keys.length === 1 && keys[0] === 'in' && typeof val.in === 'string'
}

/**
 * Aggressively compress a Symbols component object.
 *
 * Beyond stringify(), this:
 *   - Inlines numbers using # prefix:  zi:#100
 *   - Inlines comma/underscore strings via escaping:  bxsh:black_.10\,_0px\,_2px
 *   - Collapses children/selectors that only have `in` to bare strings:
 *       Icon: 'nm:search bsz:A'          (instead of Icon: { in: '...' })
 *       "@mobile": 'p:Y2_A'              (instead of "@mobile": { in: '...' })
 *
 * @param {Object} obj — Symbols component object
 * @returns {Object} — further-compressed object
 */
export function stringifyFurther(obj) {
  if (!obj || typeof obj !== 'object') return obj
  if (Array.isArray(obj)) {
    return obj.map(function (item) {
      if (item !== null && typeof item === 'object')
        return stringifyFurther(item)
      return item
    })
  }

  const result = {}
  const tokens = []

  for (const key in obj) {
    const val = obj[key]

    // PascalCase child → recurse, possibly collapse
    if (isComponentKey(key)) {
      const child = stringifyFurtherVal(val)
      result[key] = canCollapse(child) ? child.in : child
      continue
    }

    // Selector/media/case → recurse, possibly collapse
    if (isSelectorKey(key)) {
      const child = stringifyFurtherVal(val)
      result[key] = canCollapse(child) ? child.in : child
      continue
    }

    const shortKey = propToAbbr[key] || key

    // Preserved keys (state, scope, attr, style, etc.) → keep as-is
    if (PRESERVE_VALUE_KEYS.has(key) || PRESERVE_VALUE_KEYS.has(shortKey)) {
      result[shortKey] = val
      continue
    }

    // Functions → keep
    if (typeof val === 'function') {
      result[shortKey] = val
      continue
    }

    // null/undefined → keep
    if (val === null || val === undefined) {
      result[shortKey] = val
      continue
    }

    // Skip-inline keys (text, html, content, placeholder, src, href) → keep
    if (SKIP_INLINE_KEYS.has(key) || SKIP_INLINE_KEYS.has(shortKey)) {
      result[shortKey] = val
      continue
    }

    // Arrays
    if (Array.isArray(val)) {
      const hasObjects = val.some(function (item) {
        return item !== null && typeof item === 'object'
      })
      if (hasObjects) {
        result[shortKey] = val.map(function (item) {
          if (item !== null && typeof item === 'object')
            return stringifyFurther(item)
          return item
        })
        continue
      }
      // Single-element arrays can't round-trip (decoded as scalar)
      if (val.length <= 1) {
        result[shortKey] = val
        continue
      }
      tokens.push(shortKey + ':' + val.map(escapeValue).join(','))
      continue
    }

    // Objects → recurse
    if (typeof val === 'object') {
      result[shortKey] = stringifyFurther(val)
      continue
    }

    // Booleans
    if (val === true) {
      tokens.push(shortKey)
      continue
    }
    if (val === false) {
      tokens.push('!' + shortKey)
      continue
    }

    // Numbers → inline with # prefix for lossless round-trip
    if (typeof val === 'number') {
      tokens.push(shortKey + ':#' + val)
      continue
    }

    // Strings → inline with escape sequences
    tokens.push(shortKey + ':' + escapeValue(val))
  }

  if (tokens.length) {
    result.in = tokens.join(' ')
  }

  return result
}

function stringifyFurtherVal(val) {
  if (val === null || val === undefined) return val
  if (typeof val === 'function') return val
  if (Array.isArray(val)) {
    return val.map(function (item) {
      if (item !== null && typeof item === 'object')
        return stringifyFurther(item)
      return item
    })
  }
  if (typeof val === 'object') return stringifyFurther(val)
  return val
}

// ── Decode ──

/**
 * Decode a single further-inline value.
 * Handles # prefix for numbers and escape sequences.
 * Only treats # as a number marker when followed by a strict decimal number
 * (avoids conflict with CSS hex colors like #1E2397).
 */
function decodeFurtherValue(val) {
  if (val.startsWith('#') && /^#-?\d+(\.\d+)?$/.test(val)) {
    return Number(val.slice(1))
  }
  return unescapeValue(val)
}

/**
 * Decode a further `in` string into key-value pairs with full property names.
 */
function decodeFurtherInline(str) {
  if (!str || typeof str !== 'string') return {}

  const obj = {}
  const tokens = str.trim().split(/\s+/).filter(Boolean)

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

    const parts = splitOnUnescapedCommas(rawVal)
    if (parts.length > 1) {
      obj[prop] = parts.map(decodeFurtherValue)
      continue
    }

    obj[prop] = decodeFurtherValue(rawVal)
  }

  return obj
}

/**
 * Decode a stringifyFurther result back to the original component object.
 *
 * Handles:
 *   - String PascalCase values → decode as inline props
 *   - String selector/media/case values → decode as inline props
 *   - #number prefix → actual JS number
 *   - Escape sequences: \, → ,   \_ → _   \\ → \
 *   - Abbreviated keys → full property names
 *
 * @param {Object} obj — stringifyFurther result
 * @returns {Object} — original Symbols component object
 */
export function parseFurther(obj) {
  if (!obj || typeof obj !== 'object') return obj
  if (Array.isArray(obj)) {
    return obj.map(function (item) {
      if (item !== null && typeof item === 'object') return parseFurther(item)
      return item
    })
  }

  const result = {}

  // Decode `in` string first so its props come first
  if (typeof obj.in === 'string') {
    const decoded = decodeFurtherInline(obj.in)
    for (const prop in decoded) {
      result[prop] = decoded[prop]
    }
  }

  for (const key in obj) {
    if (key === 'in') continue

    const val = obj[key]

    // PascalCase child
    if (isComponentKey(key)) {
      if (typeof val === 'string') {
        result[key] = decodeFurtherInline(val)
      } else {
        result[key] = parseFurtherVal(val)
      }
      continue
    }

    // Resolve abbreviation
    const fullKey = abbrToProp[key] || key

    // Selector/media/case key (NOT an event abbreviation)
    if (isSelectorKey(key) && fullKey === key) {
      if (typeof val === 'string') {
        result[key] = decodeFurtherInline(val)
      } else {
        result[key] = parseFurtherVal(val)
      }
      continue
    }

    // Preserved keys (state, scope, etc.) → keep value as-is
    if (PRESERVE_VALUE_KEYS.has(fullKey) || PRESERVE_VALUE_KEYS.has(key)) {
      result[fullKey] = val
      continue
    }

    result[fullKey] = parseFurtherVal(val)
  }

  return result
}

function parseFurtherVal(val) {
  if (val === null || val === undefined) return val
  if (typeof val === 'function') return val
  if (Array.isArray(val)) {
    return val.map(function (item) {
      if (item !== null && typeof item === 'object') return parseFurther(item)
      return item
    })
  }
  if (typeof val === 'object') return parseFurther(val)
  return val
}
