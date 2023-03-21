'use strict'

import React from "react";
import { Svg } from "@symbo.ls/react-atoms";

export const Icon = (props) => {
  const { name, iconModifier, ...restProps } = props
  return <Svg {...restProps}>
    {name ? <use xlinkHref={`#${name}${iconModifier}`} /> : props.children}
  </Svg>
}

Icon.defaultProps = {
  iconModifier: '',
  width: 'A',
  height: 'A',
  display: 'inline-block',
  style: { fill: 'currentColor' }
}
