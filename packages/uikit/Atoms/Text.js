'use strict'

import { isUndefined } from '@domql/utils'
import { getFontSizeByKey, getFontFamily } from '@symbo.ls/scratch'

export const Text = {
  deps: { getFontSizeByKey, getFontFamily },

  text: ({ key, props, state, deps }) => {
    if (props.text === true) return (state && state[key]) || (props && props[key])
    return props.text
  },

  class: {
    fontSize: (el) => {
      const { props, deps } = el
      return props.fontSize ? deps.getFontSizeByKey(props.fontSize) : null
    },
    font: ({ props }) => !isUndefined(props.font) && ({ font: props.font }),
    fontFamily: ({ props, deps }) => !isUndefined(props.fontFamily) && ({
      fontFamily: deps.getFontFamily(props.fontFamily) || props.fontFamily
    }),
    lineHeight: ({ props }) => !isUndefined(props.lineHeight) && ({ lineHeight: props.lineHeight }),
    // lineHeight: ({ props }) => !isUndefined(props.lineHeight) && getSpacingBasedOnRatio(props, 'lineHeight', null, ''),
    textDecoration: ({ props }) => !isUndefined(props.textDecoration) && ({ textDecoration: props.textDecoration }),
    textTransform: ({ props }) => !isUndefined(props.textTransform) && ({ textTransform: props.textTransform }),
    wordBreak: ({ props }) => !isUndefined(props.wordBreak) && ({ wordBreak: props.wordBreak }),
    whiteSpace: ({ props }) => !isUndefined(props.whiteSpace) && ({ whiteSpace: props.whiteSpace }),
    wordWrap: ({ props }) => !isUndefined(props.wordWrap) && ({ wordWrap: props.wordWrap }),
    letterSpacing: ({ props }) => !isUndefined(props.letterSpacing) && ({ letterSpacing: props.letterSpacing }),
    textOverflow: ({ props }) => !isUndefined(props.textOverflow) && ({ textOverflow: props.textOverflow }),
    textAlign: ({ props }) => !isUndefined(props.textAlign) && ({ textAlign: props.textAlign }),
    fontWeight: ({ props }) => !isUndefined(props.fontWeight) && ({
      fontWeight: props.fontWeight,
      fontVariationSettings: '"wght" ' + props.fontWeight
    })
  }
}

export const H1 = { tag: 'h1' }
export const H2 = { tag: 'h2' }
export const H3 = { tag: 'h3' }
export const H4 = { tag: 'h4' }
export const H5 = { tag: 'h5' }
export const H6 = { tag: 'h6' }
export const P = { tag: 'p' }
export const Caption = { tag: 'caption' }
export const Strong = {
  tag: 'strong',
  props: { fontWeight: '700' }
}
export const Underline = { tag: 'u' }
export const Italic = { tag: 'i' }

export const Title = {}

export const Headline = {
  tag: 'h6',
  props: { fontSize: 'B', fontWeight: 500 }
}

export const Subhead = {
  tag: 'span',
  props: { fontSize: 'Z1' }
}

export const Footnote = {
  tag: 'span',
  props: { fontSize: 'Z' }
}

export const B = { tag: 'b' }

export const I = { tag: 'i' }
