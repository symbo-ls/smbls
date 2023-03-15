'use strict'

import React from "react"
import { Svg as smbmsSvg } from "@symbo.ls/atoms";
import { Box } from "@symbo.ls/react-box"

export const Svg = (props) => {
  return (
    <Box tag='svg' {...props}>
      { props.children }
    </Box>
  )
}

Svg.defaultProps = { ...smbmsSvg.props, ...smbmsSvg.attr }
