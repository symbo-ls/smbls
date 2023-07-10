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

import { isString } from '@domql/utils'

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
    id: ({ props }) => isString(props.id) && props.id,
    title: ({ props }) => isString(props.title) && props.title,
    contentEditable: ({ props }) => props.contentEditable || props.contenteditable,
    dir: ({ props }) => props.dir,
    draggable: ({ props }) => props.draggable,
    hidden: ({ props }) => props.hidden,
    lang: ({ props }) => props.lang,
    spellcheck: ({ props }) => props.spellcheck,
    tabindex: ({ props }) => props.tabindex,
    translate: ({ props }) => props.translate
  }
}

export const Circle = {
  props: {
    round: '100%'
  }
}
