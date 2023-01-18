'use strict'

import { Shape } from '@symbo.ls/shape'
import { IconText } from '@symbo.ls/icon-text'
import { Block } from '@symbo.ls/block'
import { Direction } from '@symbo.ls/direction'

import style from './style'

export const Button = {
  extends: IconText,
  tag: 'button',
  style,
  props: {
    type: 'button'
  },
  attr: {
    type: ({ props }) => props.type
  },

  on: {
    click: (event, { key, value, props }) => {
      props.onClick && props.onClick(event)
    }
  }
}

export const SquareButton = {
  extends: Button,
  props: {
    fontSize: 'A',
    width: 'A',
    padding: 'Z',
    aspectRatio: '1 / 1',
    round: 'Z'
  },
  class: {
    squareButton: {
      justifyContent: 'center',
      boxSizing: 'content-box'
    }
  }
}

export const CircleButton = {
  extends: SquareButton,
  props: { round: 'C' }
}

export const KangorooButton = {
  tag: 'button',
  style,

  iconText: { extends: IconText },
  child: { extends: IconText }
}

export default Button
