'use strict'

import { getColor } from './color'
import { getActiveConfig } from '../factory.js'
import { isCSSVar } from '../utils/color.js'

import {
  isObject,
  isString,
  isObjectLike,
  isArray
} from '@domql/utils'

const setThemeValue = theme => {
  const value = {}
  const { state, media, helpers, ...rest } = theme
  const keys = Object.keys(rest)
  keys.map(key => {
    const conditions = ['color', 'Color', 'background', 'border']
    const isColor = conditions.some(k => key.includes(k))
    return (value[key] = isColor ? getColor(theme[key]) : theme[key])
  })
  return value
}

const getThemeValue = theme => {
  if (theme.value) return theme.value
  theme.value = setThemeValue(theme)
  return theme.value
}

export const getTheme = (value, modifier) => {
  const CONFIG = getActiveConfig()
  if (CONFIG.useVariable) return getMediaTheme(value, modifier)
  const THEME = CONFIG.theme

  if (isString(value)) {
    const [theme, subtheme] = value.split(' ')
    const isOurTheme = THEME[theme]
    if (isOurTheme) {
      if (!subtheme && !modifier) return getThemeValue(isOurTheme)
      value = [theme, subtheme || modifier]
    }
  }

  if (isObjectLike(value) && value[1]) {
    const themeName = value[0]
    const subThemeName = value[1]
    const { helpers, media, state } = THEME[themeName]

    if (media && media[subThemeName]) return getThemeValue(media[subThemeName])
    if (helpers && helpers[subThemeName]) return getThemeValue(helpers[subThemeName])
    if (state && state[subThemeName]) return getThemeValue(state[subThemeName])
  } else if (isObject(value)) return setThemeValue(value)
}

const setInverseTheme = (theme, variant, value) => {
  if (isObject(variant)) {
    theme.variants.inverse.value = setThemeValue(variant)
  } else if (variant === true) {
    const { color, background } = value
    theme.variants.inverse = {
      value: {
        color: background,
        background: color
      }
    }
  }
}

const setPseudo = (theme, key, variant, themeValue) => {
  const result = getTheme(variant)
  themeValue[`&:${key}`] = result
  if (isObject(variant) && !variant.value) variant.value = result
}

const setSelectors = (theme, value) => {
  const { state } = theme
  if (!state) return
  const keys = Object.keys(state)
  keys.map(key => {
    const variant = state[key]
    setPseudo(theme, key, variant, value)
    return theme
  })
  return theme
}

const setPrefersScheme = (theme, key, variant, themeValue) => {
  const result = getTheme(variant)
  themeValue[`@media (prefers-color-scheme: ${key})`] = result
  if (isObject(variant) && !variant.value) variant.value = result
}

const setMedia = (theme, value) => {
  const { media } = theme
  if (!media) return
  const keys = Object.keys(media)
  keys.map(key => {
    const variant = media[key]
    if (key === 'dark' || key === 'light') setPrefersScheme(theme, key, variant, value)
    if (key === 'inverse') setInverseTheme(theme, variant, value)
    return theme
  })
  return theme
}

const setHelpers = (theme, value) => {
  const CONFIG = getActiveConfig()
  const { helpers } = theme
  if (!helpers) return
  const keys = Object.keys(helpers)
  keys.map(key => {
    const helper = helpers[key]
    if (isString(helper)) helpers[key] = CONFIG.theme[helper]
    else getThemeValue(helpers[key])
    return theme
  })
  return theme
}



export const setTheme = (val, key) => {
  const CONFIG = getActiveConfig()
  if (CONFIG.useVariable) return setMediaTheme(val, key)

  const { state, media, helpers } = val
  const value = setThemeValue(val, key)
  const CSSvar = `--theme-${key}`

  setSelectors(val, value)
  setMedia(val, value)
  setHelpers(val, value)

  return { var: CSSvar, value, state, media, helpers }
}

const keySetters = { // eslint-disable-line
  '@': (theme, value) => setMedia(theme, value),
  ':': (theme, value) => setSelectors(theme, value),
  '.': (theme, value) => setHelpers(theme, value)
}

/**
 * Recursively generates auto-switching CSS vars from all @-scheme content.
 * - @dark/@light: uses prefers-color-scheme media queries + [data-theme] selectors
 * - Custom @schemes (@ocean, @sunset, etc.): uses [data-theme] selectors only
 * - globalTheme forced: sets non-suffixed vars directly in CSS_VARS
 *
 * @param {Object} schemes - { dark: {...}, light: {...}, ocean: {...} }
 * @param {string} varPrefix - var name prefix (e.g. 'document', 'primary-child')
 * @param {Object} CONFIG - active config
 */
const generateAutoVars = (schemes, varPrefix, CONFIG) => {
  const { CSS_VARS } = CONFIG
  if (!CONFIG.CSS_MEDIA_VARS) CONFIG.CSS_MEDIA_VARS = {}
  const MEDIA_VARS = CONFIG.CSS_MEDIA_VARS
  const globalTheme = CONFIG.globalTheme !== undefined ? CONFIG.globalTheme : 'auto'

  const result = {}

  // Collect union of all keys across all schemes
  const allKeys = new Set()
  for (const scheme in schemes) {
    if (schemes[scheme]) for (const k of Object.keys(schemes[scheme])) allKeys.add(k)
  }

  for (const param of allKeys) {
    const symb = param.slice(0, 1)

    // Check if any scheme has an object value for this param
    const hasObject = Object.values(schemes).some(s => isObjectLike(s?.[param]))

    if (symb === '.' && hasObject) {
      // Dot helper (.color-only, .child, etc.) — recurse
      const helperName = param.slice(1)
      const subSchemes = {}
      for (const scheme in schemes) {
        if (isObjectLike(schemes[scheme]?.[param])) subSchemes[scheme] = schemes[scheme][param]
      }
      result[param] = generateAutoVars(subSchemes, `${varPrefix}-${helperName}`, CONFIG)
    } else if (symb === ':' && hasObject) {
      // Pseudo selector (:hover, ::placeholder) — recurse
      const pseudoName = param.replace(/^:+/, '')
      const subSchemes = {}
      for (const scheme in schemes) {
        if (isObjectLike(schemes[scheme]?.[param])) subSchemes[scheme] = schemes[scheme][param]
      }
      result[param] = generateAutoVars(subSchemes, `${varPrefix}-${pseudoName}`, CONFIG)
    } else if (symb !== '@' && symb !== '.' && symb !== ':') {
      // Regular CSS param — generate auto-switching var
      const autoVar = `--theme-${varPrefix}-${param}`

      if (globalTheme === 'auto') {
        for (const scheme in schemes) {
          const val = schemes[scheme]?.[param]
          if (val === undefined) continue
          const color = getColor(val, `@${scheme}`)
          if (color === undefined) continue

          // [data-theme] selector for ALL schemes (custom + standard)
          const selector = `[data-theme="${scheme}"]`
          if (!MEDIA_VARS[selector]) MEDIA_VARS[selector] = {}
          MEDIA_VARS[selector][autoVar] = color

          // prefers-color-scheme media query only for dark/light
          if (scheme === 'dark' || scheme === 'light') {
            const mq = `@media (prefers-color-scheme: ${scheme})`
            if (!MEDIA_VARS[mq]) MEDIA_VARS[mq] = {}
            MEDIA_VARS[mq][autoVar] = color
          }
        }
      } else {
        // Force specific theme — set non-suffixed var directly
        const forced = String(globalTheme).replace(/^'|'$/g, '')
        const source = schemes[forced]?.[param]
        if (source !== undefined) {
          const color = getColor(source, `@${forced}`)
          if (color !== undefined) CSS_VARS[autoVar] = color
        }
      }

      result[param] = `var(${autoVar})`
      result[`.${param}`] = { [param]: result[param] }
    }
  }

  if (result.background || result.color || result.backgroundColor) {
    result['.inversed'] = {
      color: result.background || result.backgroundColor,
      background: result.color
    }
  }

  return result
}

export const setMediaTheme = (val, key, suffix, prefers) => {
  const CONFIG = getActiveConfig()
  const { CSS_VARS } = CONFIG
  const theme = { value: val }
  const isTopLevel = !suffix && !prefers

  if (isObjectLike(val)) {
    // At top level: collect all @-schemes and generate auto-switching vars
    if (isTopLevel && CONFIG.useVariable) {
      const schemes = {}
      for (const param in val) {
        if (param.startsWith('@') && isObjectLike(val[param])) {
          schemes[param.slice(1)] = val[param]
        }
      }

      if (Object.keys(schemes).length) {
        const autoResult = generateAutoVars(schemes, key, CONFIG)
        Object.assign(theme, autoResult)
      }
    }

    for (const param in val) {
      const symb = param.slice(0, 1)
      const value = val[param]
      if (symb === '@' || symb === ':' || symb === '.') {
        const hasPrefers = symb === '@' && param
        theme[param] = setMediaTheme(value, key, param, prefers || hasPrefers)
      } else if (!isTopLevel) {
        const color = getColor(value, prefers)
        const metaSuffixes = [...new Set([prefers, suffix].filter(v => v).map(v => v.slice(1)))]
        const varmetaSuffixName = metaSuffixes.length ? '-' + metaSuffixes.join('-') : ''
        const CSSVar = `--theme-${key}${varmetaSuffixName}-${param}`
        if (CONFIG.useVariable) {
          // Suffixed vars (--theme-key-dark-param) only when opted in
          if (CONFIG.useThemeSuffixedVars) CSS_VARS[CSSVar] = color
          theme[param] = `var(${CSSVar})`
        } else {
          theme[param] = color
        }
        theme[`.${param}`] = { [param]: theme[param] }
      }
    }

    // Only add .inversed if not already set by generateAutoVars
    if (!theme['.inversed'] && (theme.background || theme.color || theme.backgroundColor)) {
      theme['.inversed'] = {
        color: theme.background || theme.backgroundColor,
        background: theme.color
      }
    }
  }

  if (isString(val) && isCSSVar(val)) {
    const THEME = CONFIG.theme
    const value = THEME[val.slice(2)]
    const getReferenced = getMediaTheme(value, prefers)
    return getReferenced
  }

  return theme
}

const recursiveTheme = val => {
  const CONFIG = getActiveConfig()
  const obj = {}
  for (const param in val) {
    const symb = param.slice(0, 1)
    if (isObjectLike(val[param])) {
      if (symb === '@') {
        // Skip all @-schemes — CSS vars + data-theme handle switching
        continue
      } else if (symb === ':') {
        obj[`&${param}`] = recursiveTheme(val[param])
      }
    } else obj[param] = val[param]
  }
  return obj
}

const findModifierFromArray = (val, modifierArray) => {
  const currentMod = modifierArray.shift()
  if (val[currentMod]) return findModifierFromArray(val[currentMod], modifierArray)
  return val
}

const findModifier = (val, modifier) => {
  if (isArray(modifier)) return findModifierFromArray(val, modifier)
  else if (isString(modifier) && val[modifier]) return val[modifier]
  else return val
}

const checkForReference = (val, callback) => {
  if (isString(val) && isCSSVar(val)) return getMediaTheme(val.slice(2))
  return val
}

const checkThemeReference = (val) => checkForReference(val, checkThemeReference) // eslint-disable-line

export const getMediaTheme = (value, modifier) => {
  const activeConfig = getActiveConfig()

  if (isString(value) && isCSSVar(value)) {
    value = getMediaTheme(value.slice(2))
  }

  if (!value || !isString(value)) {
    if (activeConfig.verbose) {
      console.warn(`${value} - Theme is not a string`)
    }
    return
  }

  const [themeName, ...themeModifiers] = isArray(value) ? value : value.split(' ')
  let themeValue = activeConfig.theme[themeName]

  if (themeValue && themeModifiers.length) {
    themeValue = findModifier(themeValue, themeModifiers)
  } else if (themeValue && modifier) {
    themeValue = findModifier(themeValue, modifier)
  }

  const resolvedTheme = recursiveTheme(themeValue)
  return resolvedTheme
}
