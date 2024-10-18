'use strict'

import {
  getMediaTheme,
  getMediaColor,
  transformTextStroke,
  transformShadow,
  transformBoxShadow,
  transformBorder,
  transformBackgroundImage
} from '@symbo.ls/scratch'

import { depth } from './Shape/style'
import { isUndefined, isString } from '@domql/utils'

export const getSystemGlobalTheme = ({ context, state }) => {
  const rootState = state && state.root
  return rootState && rootState.globalTheme ? rootState.globalTheme : context.designSystem && context.designSystem.globalTheme
}

export const Theme = {
  deps: {
    depth,
    getSystemGlobalTheme,
    getMediaTheme,
    getMediaColor,
    transformTextStroke,
    transformShadow,
    transformBoxShadow,
    transformBorder,
    transformBackgroundImage
  },

  class: {
    depth: ({ props, deps }) => !isUndefined(props.depth) && deps.depth[props.depth],

    theme: (element) => {
      const { props, deps } = element
      const globalTheme = deps.getSystemGlobalTheme(element)
      if (!props.theme) return
      const hasSubtheme = props.theme.includes(' ') && !props.theme.includes('@')
      const globalThemeForced = `@${props.themeModifier || globalTheme}`
      if (hasSubtheme) {
        const themeAppliedInVal = props.theme.split(' ')
        themeAppliedInVal.splice(1, 0, globalThemeForced)
        return deps.getMediaTheme(themeAppliedInVal)
      } else if (props.theme.includes('@{globalTheme}')) props.theme.replace('@{globalTheme}', globalThemeForced)
      return deps.getMediaTheme(props.theme, `@${props.themeModifier || globalTheme}`)
    },

    color: (element) => {
      const { props, deps } = element
      const globalTheme = deps.getSystemGlobalTheme(element)
      if (!props.color) return
      return {
        color: deps.getMediaColor(props.color, globalTheme)
      }
    },

    background: (element) => {
      const { props, deps } = element
      const globalTheme = deps.getSystemGlobalTheme(element)
      if (!props.background) return
      return {
        background: deps.getMediaColor(props.background, globalTheme)
      }
    },

    backgroundColor: (element) => {
      const { props, deps } = element
      const globalTheme = deps.getSystemGlobalTheme(element)
      if (!props.backgroundColor) return
      return {
        backgroundColor: deps.getMediaColor(props.backgroundColor, globalTheme)
      }
    },

    backgroundImage: (element, s, context) => {
      const { props, deps } = element
      const globalTheme = deps.getSystemGlobalTheme(element)
      let val = props.backgroundImage
      if (!val) return
      const file = context.files && context.files[val]
      if (file && file.content) val = file.content.src
      return ({
        backgroundImage: deps.transformBackgroundImage(val, globalTheme)
      })
    },
    backgroundSize: ({ props }) => !isUndefined(props.backgroundSize)
      ? ({
          backgroundSize: props.backgroundSize
        })
      : null,
    backgroundPosition: ({ props }) => !isUndefined(props.backgroundPosition)
      ? ({
          backgroundPosition: props.backgroundPosition
        })
      : null,
    backgroundRepeat: ({ props }) => !isUndefined(props.backgroundRepeat)
      ? ({
          backgroundRepeat: props.backgroundRepeat
        })
      : null,

    textStroke: ({ props, deps }) => !isUndefined(props.textStroke)
      ? ({
          WebkitTextStroke: deps.transformTextStroke(props.textStroke)
        })
      : null,

    outline: ({ props, deps }) => !isUndefined(props.outline) && ({
      outline: deps.transformBorder(props.outline)
    }),
    outlineOffset: ({ props, deps }) => deps.transformSizeRatio('outlineOffset', props),

    border: ({ props, deps }) => !isUndefined(props.border) && ({
      border: deps.transformBorder(props.border)
    }),

    borderColor: (element) => {
      const { props, deps } = element
      const globalTheme = deps.getSystemGlobalTheme(element)
      if (!props.borderColor) return
      return {
        borderColor: deps.getMediaColor(props.borderColor, globalTheme)
      }
    },
    borderStyle: ({ props }) => !isUndefined(props.borderStyle) && ({
      borderStyle: props.borderStyle
    }),

    borderLeft: ({ props, deps }) => !isUndefined(props.borderLeft) && ({
      borderLeft: deps.transformBorder(props.borderLeft)
    }),
    borderTop: ({ props, deps }) => !isUndefined(props.borderTop) && ({
      borderTop: deps.transformBorder(props.borderTop)
    }),
    borderRight: ({ props, deps }) => !isUndefined(props.borderRight) && ({
      borderRight: deps.transformBorder(props.borderRight)
    }),
    borderBottom: ({ props, deps }) => !isUndefined(props.borderBottom) && ({
      borderBottom: deps.transformBorder(props.borderBottom)
    }),

    shadow: (element) => {
      const { props, deps } = element
      const globalTheme = deps.getSystemGlobalTheme(element)
      if (!props.backgroundImage) return
      return ({
        boxShadow: deps.transformShadow(props.shadow, globalTheme)
      })
    },

    // boxShadow: ({ props, deps }) => isString(props.boxShadow) && ({
    //   boxShadow: deps.transformBoxShadow(props.boxShadow)
    // }),

    boxShadow: (element, state, context) => {
      const { props, deps } = element
      if (!isString(props.boxShadow)) return
      const [val, hasImportant] = props.boxShadow.split('!importan')
      const globalTheme = getSystemGlobalTheme(element)
      const important = hasImportant ? ' !important' : ''
      return {
        boxShadow: deps.transformBoxShadow(val.trim(), globalTheme) + important
      }
    },

    textShadow: ({ props, deps, context }) => !isUndefined(props.textShadow) && ({
      textShadow: deps.transformBoxShadow(props.textShadow, context.designSystem.globalTheme)
    }),

    backdropFilter: ({ props, deps }) => !isUndefined(props.backdropFilter) && ({
      backdropFilter: props.backdropFilter
    }),

    caretColor: ({ props }) => !isUndefined(props.caretColor) && ({
      caretColor: props.caretColor
    }),

    opacity: ({ props }) => !isUndefined(props.opacity) && ({
      opacity: props.opacity
    }),
    visibility: ({ props }) => !isUndefined(props.visibility) && ({
      visibility: props.visibility
    }),

    columnRule: ({ props, deps }) => !isUndefined(props.columnRule) && ({
      columnRule: deps.transformBorder(props.columnRule)
    }),

    filter: ({ props, deps }) => !isUndefined(props.filter) && ({
      filter: props.filter
    }),

    mixBlendMode: ({ props, deps }) => !isUndefined(props.mixBlendMode) && ({
      mixBlendMode: props.mixBlendMode
    }),

    appearance: ({ props }) => !isUndefined(props.appearance) && ({
      appearance: props.appearance
    })
  }
}
