'use strict'

// import {
//   Shape,
//   Position,
//   Theme,
//   Block,
//   Text,
//   Overflow,
//   Timing,
//   Transform,
//   Media,
//   Interaction,
//   XYZ,
//   Animation
// } from '@symbo.ls/atoms'

const PropsCSS = {
  class: {
    style: el => el.props && el.props.style
  }
}

export const Box = {
  extend: [
    PropsCSS,
    'Shape',
    'Position',
    'Theme',
    'Block',
    'Text',
    'Overflow',
    'Timing',
    'Transform',
    'Media',
    'Interaction',
    'XYZ',
    'Animation'
  ],
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
    translate: el => el.props.translate,
    'data-testid': (el, s) => s.root.ENV === 'testing' && ((el.__ref.path.length > 5 ? el.__ref.path.slice(1, 4).concat(el.__ref.path.slice(-2)) : el.__ref.path.slice(1)).join('.') || 'root')
  }
}

export const Circle = {
  props: {
    round: '100%'
  }
}
