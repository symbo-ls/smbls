'use strict'

import React from "react";

import { Icon as D } from "@symbo.ls/icon";
import { Svg } from "@symbo.ls/react-atoms";

export const Icon = (props) => (<Svg {...props}>
  {props.name ? <use xlinkHref={props.name} /> : props.children}
</Svg>)

// Icon.defaultProps = D.props
