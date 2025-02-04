'use strict'

export const Text = {
  text: (el) => {
    const { key, props, state, deps } = el
    if (props.text === true) return (state && state[key]) || (props && props[key])
    // return console.log(el) || deps.exec(props.text, el)
    return deps.exec(props.text, el)
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

export const Data = { tag: 'data' }
