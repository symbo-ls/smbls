'use strict'

import { useCssInProps } from 'css-in-props'

// Main class assignment handler
const beforeClassAssign = (element, s, ctx) => {
  if (!element.context) return
  const { props, __ref: ref } = element
  ref.__class = useCssInProps(props, element, { unpack: false })
}

export const Box = {
  extends: [
    'Collection',
    'Shape',
    'Theme'
  ],
  props: {
    boxSizing: 'border-box'
  },
  attr: {
    id: el => el.call('isString', el.props.id) && el.props.id,
    title: el => el.call('isString', el.props.title) && el.props.title,
    contentEditable: el => el.props.contentEditable || el.props.contenteditable,
    dir: el => el.props.dir,
    draggable: el => el.props.draggable,
    hidden: el => el.props.hidden,
    lang: el => el.props.lang,
    spellcheck: el => el.props.spellcheck,
    tabindex: el => el.props.tabindex,
    translate: el => el.props.translate
  },
  class: {
    style: el => el.props && el.props.style
  },
  text: (el) => {
    const { key, props, state } = el
    if (props.text === true) return (state && state[key]) || (props && props[key])
    return el.call('exec', props.text, el)
  },
  on: { beforeClassAssign }
}

export const Hr = {
  tag: 'hr',
  props: { margin: 'C1 0' }
}
export const Br = { tag: 'br' }
export const Li = { tag: 'li' }
export const Ul = {
  tag: 'ul',
  childExtends: { extends: 'Li' }
}
export const Ol = {
  tag: 'ol',
  childExtends: { extends: 'Li' }
}
