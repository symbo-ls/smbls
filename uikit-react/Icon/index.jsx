'use strict'

import React from "react";
import { Svg } from "@symbo.ls/react-atoms";

export const Icon = (props) => (<Svg {...props}>
  {props.name ? <use xlinkHref={`#${props.name}${props.iconModifier}`} /> : props.children}
</Svg>)

Icon.defaultProps = {
  iconModifier: '',
  width: 'A',
  height: 'A',
  display: 'inline-block',
  style: { fill: 'currentColor' }
}
