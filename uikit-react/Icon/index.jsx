'use strict'

import React from "react";
import { Svg } from "@symbo.ls/react-atoms";

export const Icon = (props) => (<Svg {...props}>
  {props.name ? <use xlinkHref={`#${props.name}`} /> : props.children}
</Svg>)

Icon.defaultProps = {
  width: 'A',
  height: 'A',
  display: 'inline-block',
  style: { fill: 'currentColor' }
}
