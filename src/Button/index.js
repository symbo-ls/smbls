'use strict'

import { Shape, IconText, Direction } from '../'

import style from './style'

const Button = {
  tag: 'button',
  proto: [Shape, IconText, Direction],
  style
}

export const SquareButton = {
  proto: Button,
  round: 10,
  style: {
    justifyContent: 'center',
    width: '1em',
    height: '1em',
    boxSizing: 'content-box'
  }
}

export const CircleButton = {
  proto: SquareButton,
  style: {
    borderRadius: '100%'
  }
}

export const KangorooButton = {
  proto: Button,
  span: {
    proto: [Shape, IconText, Direction]
  }
}

export default Button
