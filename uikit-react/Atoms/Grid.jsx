'use strict'

import React from "react"
import { Box } from "@symbo.ls/react-box"
import { transformEmotion, transformClassname} from 'css-in-props' 

export const Grid = (props) => {
  const gridProps = {
    display: "grid",
    columns: props.columns,
    rows: props.rows,
    area: props.area,
    template: props.template,
    templateAreas: props.templateAreas,
    gap: props.gap,
    columnGap: props.template,
    rowGap: props.template,
    ...props
  }

  return (
    <Box className={transformEmotion(transformClassname(gridProps))}>
      {props.children}
    </Box>
  )
}
