'use strict'

import React from "react"
import { Button as D } from "@symbo.ls/button"
import { IconText } from "@symbo.ls/react-icon-text"

export const Button = (props) => (<IconText tag="button" {...props}>
  {props.children}
</IconText>)

Button.defaultProps = D.props
 