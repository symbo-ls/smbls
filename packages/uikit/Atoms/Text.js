'use strict'

import { exec, isUndefined } from '@domql/utils'
import { getFontSizeByKey, getFontFamily } from '@symbo.ls/scratch'

const props = {
  fontSize: (el) => {
    const { props, deps } = el
    const val = deps.exec.call(el, props.fontSize)
    return val ? deps.getFontSizeByKey(val) : null
  },
  fontFamily: (element) => {
    const { props, deps } = element
    const val = deps.exec.call(element, props.fontFamily)
    return { fontFamily: deps.getFontFamily(val) || val }
  },
  fontWeight: (element) => {
    const { props, deps } = element
    const val = deps.exec.call(element, props.fontWeight)
    return {
      fontWeight: val,
      fontVariationSettings: '"wght" ' + val
    }
  }
}

export const Text = {
  deps: { exec, getFontSizeByKey, getFontFamily },

  text: (el) => {
    const { key, props, state, deps } = el
    if (props.text === true)
      return (state && state[key]) || (props && props[key])
    return deps.exec.call(el, props.text)
  },

  class: {
    font: (element) => {
      const { props, deps } = element
      const val = deps.exec.call(element, props.font)
      if (isUndefined(val)) return
      return { font: val }
    },
    lineHeight: (element) => {
      const { props, deps } = element
      const val = deps.exec.call(element, props.lineHeight)
      if (isUndefined(val)) return
      return { lineHeight: val }
    },
    textDecoration: (element) => {
      const { props, deps } = element
      const val = deps.exec.call(element, props.textDecoration)
      if (isUndefined(val)) return
      return { textDecoration: val }
    },
    textTransform: (element) => {
      const { props, deps } = element
      const val = deps.exec.call(element, props.textTransform)
      if (isUndefined(val)) return
      return { textTransform: val }
    },
    wordBreak: (element) => {
      const { props, deps } = element
      const val = deps.exec.call(element, props.wordBreak)
      if (isUndefined(val)) return
      return { wordBreak: val }
    },
    whiteSpace: (element) => {
      const { props, deps } = element
      const val = deps.exec.call(element, props.whiteSpace)
      if (isUndefined(val)) return
      return { whiteSpace: val }
    },
    wordWrap: (element) => {
      const { props, deps } = element
      const val = deps.exec.call(element, props.wordWrap)
      if (isUndefined(val)) return
      return { wordWrap: val }
    },
    letterSpacing: (element) => {
      const { props, deps } = element
      const val = deps.exec.call(element, props.letterSpacing)
      if (isUndefined(val)) return
      return { letterSpacing: val }
    },
    textOverflow: (element) => {
      const { props, deps } = element
      const val = deps.exec.call(element, props.textOverflow)
      if (isUndefined(val)) return
      return { textOverflow: val }
    },
    textAlign: (element) => {
      const { props, deps } = element
      const val = deps.exec.call(element, props.textAlign)
      if (isUndefined(val)) return
      return { textAlign: val }
    },
    writingMode: (element) => {
      const { props, deps } = element
      const val = deps.exec.call(element, props.writingMode)
      if (isUndefined(val)) return
      return { writingMode: val }
    },
    textOrientation: (element) => {
      const { props, deps } = element
      const val = deps.exec.call(element, props.textOrientation)
      if (isUndefined(val)) return
      return { textOrientation: val }
    },
    textIndent: (element) => {
      const { props, deps } = element
      const val = deps.exec.call(element, props.textIndent)
      if (isUndefined(val)) return
      return { textIndent: val }
    },
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
