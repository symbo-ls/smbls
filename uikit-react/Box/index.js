
import React, { useEffect, useState } from "react";
import { transformEmotion, transformClassname} from 'css-in-props'
import { useGlobalTheme, useSymbols } from '@symbo.ls/react-provider'

export const Box = (props) => {
  const context = useSymbols()
  const [theme, setTheme] = useGlobalTheme()
  const excludedProps = {};

  const transformedProps = transformClassname(props, context, void 0, excludedProps)
  const propsClass = transformEmotion(transformedProps)
  const { tag, className } = props
  const children = props.text ? props.text : props.children;

  return React.createElement(
    tag || "div",
    {
      className: `${className ?? ""} ${propsClass}` ,
      ...excludedProps,
    },
    children
  )
}
