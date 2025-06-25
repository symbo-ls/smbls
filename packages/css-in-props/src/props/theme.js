'use strict'

import {
  getMediaTheme,
  getMediaColor,
  transformTextStroke,
  transformShadow,
  transformBoxShadow,
  transformBorder,
  transformBackgroundImage,
  transformSizeRatio
} from '@symbo.ls/scratch'

import { isString } from '@domql/utils'

export const getSystemGlobalTheme = ({ context, state }) => {
  const rootState = state && state.root
  return rootState && rootState.globalTheme ? rootState.globalTheme : context.designSystem && context.designSystem.globalTheme
}

export const THEME_PROPS = {
  theme: (val, element) => {
    const { props } = element
    const globalTheme = getSystemGlobalTheme(element)
    if (!val) return
    const hasSubtheme = val.includes(' ') && !val.includes('@')
    const globalThemeForced = `@${props.themeModifier || globalTheme}`
    if (hasSubtheme) {
      const themeAppliedInVal = val.split(' ')
      themeAppliedInVal.splice(1, 0, globalThemeForced)
      return getMediaTheme(themeAppliedInVal)
    } else if (val.includes('@{globalTheme}')) val.replace('@{globalTheme}', globalThemeForced)
    return getMediaTheme(val, `@${props.themeModifier || globalTheme}`)
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
    return ({
      backgroundImage: transformBackgroundImage(val, globalTheme)
    })
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
