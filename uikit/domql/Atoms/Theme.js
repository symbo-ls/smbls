'use strict'

import {
  getMediaTheme,
  getMediaColor,
  transformTextStroke,
  transformShadow,
  transformBorder,
  transformBackgroundImage,
  getTheme
} from '@symbo.ls/scratch'

import { depth } from './Shape/style'
import { isObject } from '@domql/utils'

export const getSystemTheme = ({ context, state }) => {
  const rootState = state && state.__root
  return rootState ? rootState.globalTheme : context.designSystem && context.designSystem.globalTheme
}

export const Theme = {
  class: {
    depth: ({ props }) => props.depth && depth[props.depth],

    theme: (element) => {
      const { props } = element
      const globalTheme = getSystemTheme(element)
      if (!props.theme) return
      if (isObject(props.theme)) return getTheme(props.theme)
      return getMediaTheme(props.theme, `@${props.themeModifier || globalTheme}`)
    },

    color: (element) => {
      const { props } = element
      const globalTheme = getSystemTheme(element)
      if (!props.color) return
      return {
        color: getMediaColor(props.color, globalTheme)
      }
    },

    background: (element) => {
      const { props } = element
      const globalTheme = getSystemTheme(element)
      if (!props.background) return
      return {
        background: getMediaColor(props.background, globalTheme)
      }
    },

    backgroundColor: (element) => {
      const { props } = element
      const globalTheme = getSystemTheme(element)
      if (!props.backgroundColor) return
      return {
        backgroundColor: getMediaColor(props.backgroundColor, globalTheme)
      }
    },

    backgroundImage: (element) => {
      const { props } = element
      const globalTheme = getSystemTheme(element)
      if (!props.backgroundImage) return
      return ({
        backgroundImage: transformBackgroundImage(props.backgroundImage, globalTheme)
      })
    },
    backgroundSize: ({ props }) => props.backgroundSize
      ? ({
          backgroundSize: props.backgroundSize
        })
      : null,
    backgroundPosition: ({ props }) => props.backgroundPosition
      ? ({
          backgroundPosition: props.backgroundPosition
        })
      : null,

    textStroke: ({ props }) => props.textStroke
      ? ({
          WebkitTextStroke: transformTextStroke(props.textStroke)
        })
      : null,

    outline: ({ props }) => props.outline && ({
      outline: transformBorder(props.outline)
    }),

    border: ({ props }) => props.border && ({
      border: transformBorder(props.border)
    }),
    borderColor: ({ props }) => props.borderColor && ({
      borderColor: getMediaColor(props.borderColor)
    }),
    borderStyle: ({ props }) => props.borderStyle && ({
      borderStyle: props.borderStyle
    }),

    borderLeft: ({ props }) => props.borderLeft && ({
      borderLeft: transformBorder(props.borderLeft)
    }),
    borderTop: ({ props }) => props.borderTop && ({
      borderTop: transformBorder(props.borderTop)
    }),
    borderRight: ({ props }) => props.borderRight && ({
      borderRight: transformBorder(props.borderRight)
    }),
    borderBottom: ({ props }) => props.borderBottom && ({
      borderBottom: transformBorder(props.borderBottom)
    }),

    boxShadow: ({ props }) => props.boxShadow && ({
      boxShadow: transformShadow(props.boxShadow)
    }),

    textShadow: ({ props }) => props.textShadow && ({
      textShadow: transformShadow(props.textShadow)
    }),

    opacity: ({ props }) => props.opacity && ({
      opacity: props.opacity
    }),
    visibility: ({ props }) => props.visibility && ({
      visibility: props.visibility
    }),

    columnRule: ({ props }) => props.columnRule && ({
      columnRule: transformBorder(props.columnRule)
    })
  }
}
