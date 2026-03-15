'use strict'

import {
  getMediaTheme,
  getMediaColor,
  transformTextStroke,
  transformShadow,
  transformBoxShadow,
  transformBorder,
  transformBackgroundImage,
  resolveColorsInGradient,
  transformSizeRatio
} from '@symbo.ls/scratch'

import { isDefined, isString } from '@domql/utils'

export const getSystemGlobalTheme = ({ context, state }) => {
  const theme = state?.root?.globalTheme || context.designSystem?.globalTheme
  return theme === 'auto' ? null : theme
}

export const THEME_PROPS = {
  theme: (val, element) => {
    const { props } = element
    if (!val) return

    // themeModifier explicitly forces a scheme on this component
    if (props.themeModifier) {
      return getMediaTheme(val, `@${props.themeModifier}`)
    }

    // CSS vars handle dark/light switching — no modifier needed, no DOMQL re-render
    return getMediaTheme(val)
  },

  color: (val, element) => {
    const globalTheme = getSystemGlobalTheme(element)
    if (!val) return
    return {
      color: getMediaColor(val, globalTheme)
    }
  },

  background: (val, element) => {
    const globalTheme = getSystemGlobalTheme(element)
    if (!val) return
    if (isString(val) && val.includes('gradient')) {
      return { background: resolveColorsInGradient(val, globalTheme) }
    }
    return {
      background: getMediaColor(val, globalTheme)
    }
  },

  backgroundColor: (val, element) => {
    const globalTheme = getSystemGlobalTheme(element)
    if (!val) return
    return {
      backgroundColor: getMediaColor(val, globalTheme)
    }
  },

  backgroundImage: (val, element, s, ctx) => {
    const globalTheme = getSystemGlobalTheme(element)
    if (!val) return
    const file = ctx.files && ctx.files[val]
    if (file && file.content) val = file.content.src
    return {
      backgroundImage: transformBackgroundImage(val, globalTheme)
    }
  },

  textStroke: (val) => ({
    WebkitTextStroke: transformTextStroke(val)
  }),

  outline: (val) => ({
    outline: transformBorder(val)
  }),

  outlineOffset: (val, { props }) => transformSizeRatio('outlineOffset', val, props),

  border: (val) => ({
    border: transformBorder(val)
  }),

  borderColor: (val, element) => {
    const globalTheme = getSystemGlobalTheme(element)
    if (!val) return
    return {
      borderColor: getMediaColor(val, globalTheme)
    }
  },
  borderTopColor: (val, element) => {
    const globalTheme = getSystemGlobalTheme(element)
    if (!val) return
    return { borderTopColor: getMediaColor(val, globalTheme) }
  },
  borderBottomColor: (val, element) => {
    const globalTheme = getSystemGlobalTheme(element)
    if (!val) return
    return { borderBottomColor: getMediaColor(val, globalTheme) }
  },
  borderLeftColor: (val, element) => {
    const globalTheme = getSystemGlobalTheme(element)
    if (!val) return
    return { borderLeftColor: getMediaColor(val, globalTheme) }
  },
  borderRightColor: (val, element) => {
    const globalTheme = getSystemGlobalTheme(element)
    if (!val) return
    return { borderRightColor: getMediaColor(val, globalTheme) }
  },
  borderLeft: (val) => ({
    borderLeft: transformBorder(val)
  }),
  borderTop: (val) => ({
    borderTop: transformBorder(val)
  }),
  borderRight: (val) => ({
    borderRight: transformBorder(val)
  }),
  borderBottom: (val) => ({
    borderBottom: transformBorder(val)
  }),

  shadow: (val, element) => {
    const globalTheme = getSystemGlobalTheme(element)
    if (!val) return
    return ({
      boxShadow: transformShadow(val, globalTheme)
    })
  },

  boxShadow: (val, element) => {
    if (!isString(val)) return
    const [value, hasImportant] = val.split('!importan')
    const globalTheme = getSystemGlobalTheme(element)
    const important = hasImportant ? ' !important' : ''
    return {
      boxShadow: transformBoxShadow(value.trim(), globalTheme) + important
    }
  },

  textShadow: (val, { context }) => ({
    textShadow: transformBoxShadow(val, context.designSystem.globalTheme)
  }),

  columnRule: (val) => ({
    columnRule: transformBorder(val)
  })
}
