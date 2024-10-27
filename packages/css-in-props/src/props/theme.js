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
  theme: (element) => {
    const { props } = element
    const globalTheme = getSystemGlobalTheme(element)
    if (!props.theme) return
    const hasSubtheme = props.theme.includes(' ') && !props.theme.includes('@')
    const globalThemeForced = `@${props.themeModifier || globalTheme}`
    if (hasSubtheme) {
      const themeAppliedInVal = props.theme.split(' ')
      themeAppliedInVal.splice(1, 0, globalThemeForced)
      return getMediaTheme(themeAppliedInVal)
    } else if (props.theme.includes('@{globalTheme}')) props.theme.replace('@{globalTheme}', globalThemeForced)
    return getMediaTheme(props.theme, `@${props.themeModifier || globalTheme}`)
  },

  color: (element) => {
    const { props } = element
    const globalTheme = getSystemGlobalTheme(element)
    if (!props.color) return
    return {
      color: getMediaColor(props.color, globalTheme)
    }
  },

  background: (element) => {
    const { props } = element
    const globalTheme = getSystemGlobalTheme(element)
    if (!props.background) return
    return {
      background: getMediaColor(props.background, globalTheme)
    }
  },

  backgroundColor: (element) => {
    const { props } = element
    const globalTheme = getSystemGlobalTheme(element)
    if (!props.backgroundColor) return
    return {
      backgroundColor: getMediaColor(props.backgroundColor, globalTheme)
    }
  },

  backgroundImage: (element, s, ctx) => {
    const { props } = element
    const globalTheme = getSystemGlobalTheme(element)
    let val = props.backgroundImage
    if (!val) return
    const file = ctx.files && ctx.files[val]
    if (file && file.content) val = file.content.src
    return ({
      backgroundImage: transformBackgroundImage(val, globalTheme)
    })
  },

  backgroundSize: ({ props }) => ({
    backgroundSize: props.backgroundSize
  }),

  backgroundPosition: ({ props }) => ({
    backgroundPosition: props.backgroundPosition
  }),

  backgroundRepeat: ({ props }) => ({
    backgroundRepeat: props.backgroundRepeat
  }),

  textStroke: ({ props }) => ({
    WebkitTextStroke: transformTextStroke(props.textStroke)
  }),

  outline: ({ props }) => ({
    outline: transformBorder(props.outline)
  }),

  outlineOffset: ({ props }) => transformSizeRatio('outlineOffset', props),

  border: ({ props }) => ({
    border: transformBorder(props.border)
  }),

  borderColor: (element) => {
    const { props } = element
    const globalTheme = getSystemGlobalTheme(element)
    if (!props.borderColor) return
    return {
      borderColor: getMediaColor(props.borderColor, globalTheme)
    }
  },
  borderLeft: ({ props }) => ({
    borderLeft: transformBorder(props.borderLeft)
  }),
  borderTop: ({ props }) => ({
    borderTop: transformBorder(props.borderTop)
  }),
  borderRight: ({ props }) => ({
    borderRight: transformBorder(props.borderRight)
  }),
  borderBottom: ({ props }) => ({
    borderBottom: transformBorder(props.borderBottom)
  }),

  shadow: (element) => {
    const { props } = element
    const globalTheme = getSystemGlobalTheme(element)
    if (!props.backgroundImage) return
    return ({
      boxShadow: transformShadow(props.shadow, globalTheme)
    })
  },

  boxShadow: (element, state, context) => {
    const { props } = element
    if (!isString(props.boxShadow)) return
    const [val, hasImportant] = props.boxShadow.split('!importan')
    const globalTheme = getSystemGlobalTheme(element)
    const important = hasImportant ? ' !important' : ''
    return {
      boxShadow: transformBoxShadow(val.trim(), globalTheme) + important
    }
  },

  textShadow: ({ props, context }) => ({
    textShadow: transformBoxShadow(props.textShadow, context.designSystem.globalTheme)
  }),

  columnRule: ({ props }) => ({
    columnRule: transformBorder(props.columnRule)
  })
}
