'use strict'

import React from "react"
import { Flex as smbmsFlex } from "@symbo.ls/atoms"
import { Box } from "@symbo.ls/react-box"
import { transformEmotion, transformClassname } from 'css-in-props'
import { useSymbols } from '@symbo.ls/react-provider'

export const Flex = (props) => {
  const context = useSymbols();

  const fakeElement = {
    context,
    __root: {}
  };
  const excludedProps = {}

  const transformedProps = transformClassname(props, void 0, smbmsFlex.class, excludedProps, fakeElement)
  const propsClass = transformEmotion(transformedProps)

  return (
    <Box tag={props.tag} className={propsClass} {...excludedProps}>
      {props.children}
    </Box>
  )
}

Flex.defaultProps = smbmsFlex.props
