'use strict'

import { useCssInProps } from 'css-in-props'

// Main class assignment handler
const onBeforeClassAssign = (element) => {
  if (!element.context) return
  const { props, __ref: ref } = element
  ref.__class = useCssInProps(props, element, { unpack: false })
}

export const Box = {
  extends: [
    'Shape',
    'Theme'
  ],

  boxSizing: 'border-box',

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

  onBeforeClassAssign
}

export const Hr = {
  tag: 'hr',
  margin: 'C1 0'
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
