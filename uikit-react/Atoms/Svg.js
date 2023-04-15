'use strict'

import React from 'react'
import { Box } from '@symbo.ls/react-box'

export const Svg = (props) => {
  return (
    <Box tag='svg' {...props}>
      {props.children}
    </Box>
  )
}

Svg.defaultProps = {
  xmlns: 'http://www.w3.org/2000/svg',
  xmlnsXlink: 'http://www.w3.org/1999/xlink',
  style: { '*': { fill: 'currentColor' } }
}
