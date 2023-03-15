'use strict'

import React from "react"
import { Grid } from "@symbo.ls/atoms";
import { Box } from "@symbo.ls/react-box"
import { transformEmotion, transformClassname} from 'css-in-props' 

export const Grid = (props) => {
  const excludedProps = {};
  const transformedProps = transformClassname(flexProps, void 0, Grid.class, excludedProps)
  const propsClass = transformEmotion(transformedProps)
 
  return (
    <Box tag={props.tag} className={propsClass} {...excludedProps}>
      {props.children}
    </Box>
  )
}

Grid.defaultProps = {
  display: "grid",
}
