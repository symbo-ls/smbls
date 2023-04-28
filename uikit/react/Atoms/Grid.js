'use strict'

import React from 'react'
import { Grid as smbmsGrid } from '@symbo.ls/atoms'
import { Box } from '@symbo.ls/react-box'
import { transformEmotion, transformClassname } from 'css-in-props'
import { useSymbols } from '@symbo.ls/react-provider'

export const Grid = (props) => {
  const context = useSymbols()
  const element = {
    context,
    class: {}
  }

  const excludedProps = {}
  const transformedProps = transformClassname(props, undefined, smbmsGrid.class, excludedProps, element)
  const propsClass = transformEmotion(transformedProps)

  return (
    <Box tag={props.tag} className={propsClass} {...excludedProps}>
      {props.children}
    </Box>
  )
}

Grid.defaultProps = smbmsGrid.props