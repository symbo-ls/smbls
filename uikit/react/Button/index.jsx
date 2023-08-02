'use strict'

import React from 'react'
import { Button as D, SquareButton as D2 } from '@symbo.ls/button'
import { IconText } from '@symbo.ls/react-icon'

export const Button = (props) => (
  <IconText tag='button' {...props}>
    {props.children}
  </IconText>
)

Button.defaultProps = D.props

export const SquareButton = (props) => (
  <Button {...props}>
    {props.children}
  </Button>
)

SquareButton.defaultProps = D2.props
