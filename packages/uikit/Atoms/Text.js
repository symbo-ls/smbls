'use strict'

import { exec, isUndefined } from '@domql/utils'
import { getFontSizeByKey, getFontFamily } from '@symbo.ls/scratch'

const props = {
  fontSize: (el) => {
    const { props, deps } = el
    return props.fontSize ? deps.getFontSizeByKey(props.fontSize) : null
  },
  fontFamily: ({ props, deps }) => ({
    fontFamily: deps.getFontFamily(props.fontFamily) || props.fontFamily
  }),
  fontWeight: ({ props }) => ({
    fontWeight: props.fontWeight,
    fontVariationSettings: '"wght" ' + props.fontWeight
  })
}

export const Text = {
  deps: { exec, getFontSizeByKey, getFontFamily },

  text: (el) => {
    const { key, props, state, deps } = el
    if (props.text === true)
      return (state && state[key]) || (props && props[key])
    return deps.exec(props.text, el)
  },

  class: {
    font: ({ props }) => !isUndefined(props.font) && { font: props.font },
    lineHeight: ({ props }) =>
      !isUndefined(props.lineHeight) && { lineHeight: props.lineHeight },
    textDecoration: ({ props }) =>
      !isUndefined(props.textDecoration) && {
        textDecoration: props.textDecoration
      },
    textTransform: ({ props }) =>
      !isUndefined(props.textTransform) && {
        textTransform: props.textTransform
      },
    wordBreak: ({ props }) =>
      !isUndefined(props.wordBreak) && { wordBreak: props.wordBreak },
    whiteSpace: ({ props }) =>
      !isUndefined(props.whiteSpace) && { whiteSpace: props.whiteSpace },
    wordWrap: ({ props }) =>
      !isUndefined(props.wordWrap) && { wordWrap: props.wordWrap },
    letterSpacing: ({ props }) =>
      !isUndefined(props.letterSpacing) && {
        letterSpacing: props.letterSpacing
      },
    textOverflow: ({ props }) =>
      !isUndefined(props.textOverflow) && { textOverflow: props.textOverflow },
    textAlign: ({ props }) =>
      !isUndefined(props.textAlign) && { textAlign: props.textAlign },
    writingMode: ({ props }) =>
      !isUndefined(props.writingMode) && { writingMode: props.writingMode },
    textOrientation: ({ props }) =>
      !isUndefined(props.textOrientation) && {
        textOrientation: props.textOrientation
      },
    textIndent: ({ props }) =>
      !isUndefined(props.textIndent) && { textIndent: props.textIndent },
    ...props
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
export const U = { tag: 'u' }
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

export const Data = { tag: 'data' }
