'use strict'

const PropsCSS = {
  class: {
    style: el => el.props && el.props.style
  }
}

export const Box = {
  extend: [
    PropsCSS,
    'Shape',
    'Theme',
    'Text',
    'Media'
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
  }
}

export const Hr = {
  tag: 'hr',
  props: { margin: 'C1 0' }
}
export const Br = { tag: 'br' }
export const Li = { tag: 'li' }
export const Ul = {
  tag: 'ul',
  childExtend: { extend: 'Li' }
}
export const Ol = {
  tag: 'ol',
  childExtend: { extend: 'Li' }
}
