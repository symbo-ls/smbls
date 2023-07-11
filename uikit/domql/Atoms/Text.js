'use strict'

import { isString, replaceLiteralsWithObjectFields } from '@domql/utils'
import { getFontSizeByKey, getFontFamily } from '@symbo.ls/scratch'

export const Text = {
  text: ({ key, props, state }) => {
    if (props.text === true) return (state && state[key]) || (props && props[key])
    if (isString(props.text) && props.text.includes('{{')) {
      console.log(props.text)
      console.log(replaceLiteralsWithObjectFields(props.text, state))
      return replaceLiteralsWithObjectFields(props.text, state)
    }
    return props.text
  },
  class: {
    fontSize: ({ props }) => props.fontSize ? getFontSizeByKey(props.fontSize) : null,
    fontFamily: ({ props }) => props.fontFamily && ({ fontFamily: getFontFamily(props.fontFamily) || props.fontFamily }),
    lineHeight: ({ props }) => props.lineHeight && ({ lineHeight: props.lineHeight }),
    // lineHeight: ({ props }) => props.lineHeight && getSpacingBasedOnRatio(props, 'lineHeight', null, ''),
    textDecoration: ({ props }) => props.textDecoration && ({ textDecoration: props.textDecoration }),
    textTransform: ({ props }) => props.textTransform && ({ textTransform: props.textTransform }),
    whiteSpace: ({ props }) => props.whiteSpace && ({ whiteSpace: props.whiteSpace }),
    letterSpacing: ({ props }) => props.letterSpacing && ({ letterSpacing: props.letterSpacing }),
    textAlign: ({ props }) => props.textAlign && ({ textAlign: props.textAlign }),
    fontWeight: ({ props }) => props.fontWeight && ({
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
