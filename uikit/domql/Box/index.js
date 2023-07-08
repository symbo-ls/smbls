'use strict'

import {
  Shape,
  Position,
  Theme,
  Block,
  Text,
  Overflow,
  Timing,
  Transform,
  Media,
  Interaction,
  XYZ,
  Animation
} from '@symbo.ls/atoms'

const PropsCSS = {
  class: {
    style: ({ props }) => props && props.style
  }
}

export const Box = {
  extend: [
    PropsCSS,
    Shape,
    Position,
    Theme,
    Block,
    Text,
    Overflow,
    Timing,
    Transform,
    Media,
    Interaction,
    XYZ,
    Animation
  ],
  attr: {
    id: ({ props }) => props.id,
    contenteditable: ({ props }) => props.contenteditable,
    dir: ({ props }) => props.dir,
    draggable: ({ props }) => props.draggable,
    hidden: ({ props }) => props.hidden,
    lang: ({ props }) => props.lang,
    spellcheck: ({ props }) => props.spellcheck,
    tabindex: ({ props }) => props.tabindex,
    title: ({ props }) => props.title,
    translate: ({ props }) => props.translate
  }
}

export const Circle = {
  props: {
    round: '100%'
  }
}
