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
    'Theme',
    'Text',
    'Media'
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
    translate: el => el.props.translate
  }
}

export const Circle = {
  props: {
    round: '100%'
  }
}
