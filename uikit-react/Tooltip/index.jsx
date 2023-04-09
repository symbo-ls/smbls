'use strict'

import React from 'react'
import { Box } from '@symbo.ls/react-box'
import { Flex } from '@symbo.ls/react-atoms'
import { Tooltip as D } from "@symbo.ls/tooltip"

export const Tooltip = (props) => {
  const { title, p, ...restProps } = props

  return(
    <Flex {...restProps}>
      <Box {...title}></Box>
      <Box tag={'p'} { ...p }></Box>
    </Flex>
  )
}

Tooltip.defaultProps = D.props
