
import React from "react";
import { transformEmotion, transformClassname} from 'css-in-props'
import { useGlobalTheme, useSymbols } from '@symbo.ls/react-provider'

import { Text } from '@symbo.ls/react-atoms'

export const Box = (props) => {
  const context = useSymbols()
  const [theme, setTheme] = useGlobalTheme()
  const excludedProps = {};

  const transformedProps = transformClassname(props, context, void 0, excludedProps)
  const propsClass = transformEmotion(transformedProps)
  
  let { children, tag, className, text, ...restProps } = props
  if (props.text) children = children.concat(
    <Text>text</Text>
  )

  return React.createElement(
    tag || "div",
    {
      ...excludedProps,
      className: `${className ?? ""} ${propsClass}`,
    },
    children
  )
}
