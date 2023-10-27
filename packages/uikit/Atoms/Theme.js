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

export const getSystemTheme = ({ context, state }) => {
  const rootState = state && state.__root
  return rootState && rootState.globalTheme ? rootState.globalTheme : context.designSystem && context.designSystem.globalTheme
}

export const Theme = {
  deps: {
    depth,
    getSystemTheme,
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
      const globalTheme = deps.getSystemTheme(element)
      if (!props.theme) return
      const getMediaTheme = deps.getMediaTheme(props.theme, `@${props.themeModifier || globalTheme}`)
      return getMediaTheme
    },

    color: (element) => {
      const { props, deps } = element
      const globalTheme = deps.getSystemTheme(element)
      if (!props.color) return
      return {
        color: deps.getMediaColor(props.color, globalTheme)
      }
    },

    background: (element) => {
      const { props, deps } = element
      const globalTheme = deps.getSystemTheme(element)
      if (!props.background) return
      return {
        background: deps.getMediaColor(props.background, globalTheme)
      }
    },

    backgroundColor: (element) => {
      const { props, deps } = element
      const globalTheme = deps.getSystemTheme(element)
      if (!props.backgroundColor) return
      return {
        backgroundColor: deps.getMediaColor(props.backgroundColor, globalTheme)
      }
    },

    backgroundImage: (element) => {
      const { props, deps } = element
      const globalTheme = deps.getSystemTheme(element)
      if (!props.backgroundImage) return
      return ({
        backgroundImage: deps.transformBackgroundImage(props.backgroundImage, globalTheme)
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

    textStroke: ({ props, deps }) => !isUndefined(props.textStroke)
      ? ({
          WebkitTextStroke: deps.transformTextStroke(props.textStroke)
        })
      : null,

    outline: ({ props, deps }) => !isUndefined(props.outline) && ({
      outline: deps.transformBorder(props.outline)
    }),

    border: ({ props, deps }) => !isUndefined(props.border) && ({
      border: deps.transformBorder(props.border)
    }),

    borderColor: (element) => {
      const { props, deps } = element
      const globalTheme = deps.getSystemTheme(element)
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
      const globalTheme = deps.getSystemTheme(element)
      if (!props.backgroundImage) return
      return ({
        boxShadow: deps.transformShadow(props.backgroundImage, globalTheme)
      })
    },

    boxShadow: ({ props, deps }) => isString(props.boxShadow) && ({
      boxShadow: deps.transformBoxShadow(props.boxShadow)
    }),

    textShadow: ({ props, deps }) => !isUndefined(props.textShadow) && ({
      textShadow: deps.transformBoxShadow(props.textShadow)
    }),

    backdropFilter: ({ props, deps }) => !isUndefined(props.backdropFilter) && ({
      backdropFilter: props.backdropFilter
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

    appearance: ({ props }) => !isUndefined(props.appearance) && ({
      appearance: props.appearance
    })
  }
}
