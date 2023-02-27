'use strict'

import React from "react"
import { Box } from "@symbo.ls/react-box"

export const Svg = (props) => {
  const defaultConf = {
    attr: {
      xmlns: 'http://www.w3.org/2000/svg',
      'xmlns:xlink': 'http://www.w3.org/1999/xlink'
    },
    ...props,
  }
  return (
    <Box tag='svg' {...defaultConf}>
      <use xlinkHref={props.name} />
    </Box>
  )
}
