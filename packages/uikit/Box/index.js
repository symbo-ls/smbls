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

import { isString, isUndefined } from '@domql/utils'

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
  deps: { isString, isUndefined },
  attr: {
    id: ({ props, deps }) => deps.isString(props.id) && props.id,
    title: ({ props, deps }) => deps.isString(props.title) && props.title,
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
