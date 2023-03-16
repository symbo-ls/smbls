
import React, { useEffect, useState } from "react";
import { transformEmotion, transformClassname} from 'css-in-props'
import { useGlobalTheme, useSymbols } from '@symbo.ls/react-provider'

console.log(React)

export const Box = (props) => {
  const context = useSymbols()
  const [theme, setTheme] = useGlobalTheme()
  const excludedProps = {};

  console.log(props)
  const transformedProps = transformClassname(props, context, void 0, excludedProps)
  console.log(transformedProps)
  const propsClass = transformEmotion(transformedProps)
  console.log(propsClass)
  const { tag, className } = props
  const children = props.text ? props.text : props.children;
  console.log(excludedProps)

  return React.createElement(
    tag || "div",
    {
      className: `${className ?? ""} ${propsClass}` ,
      ...excludedProps,
    },
    children
  )
}
