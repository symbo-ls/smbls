'use strict'

import React from "react"
import { Box } from "@symbo.ls/react-box"

export const Img = (props) => {
  const defaultConf = {
    src: props.src,
    alt: props.alt,
    title: props.title || props.alt,
    ...props,
  }
  return (
    <Box tag='img' {...defaultConf} />
  )
}
