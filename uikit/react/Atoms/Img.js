'use strict'

import React, { useRef } from 'react'
import { Box } from '@symbo.ls/react-box'

export const Img = (props) => {
  const ref = useRef(null)
  return (
    <Box tag='img' ref={ref} {...props} />
  )
}
