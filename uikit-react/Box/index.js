
import React from 'react'
import { transformEmotion, transformClassname } from 'css-in-props'
import { useGlobalTheme, useSymbols } from '@symbo.ls/react-provider'

export const Box = (props) => {
  const context = useSymbols()
  const [theme, setTheme] = useGlobalTheme() // eslint-disable-line no-unused-vars

  const element = {
    context,
    class: {}
  }
  const excludedProps = {}

  const transformedProps = transformClassname(props, context, undefined, excludedProps, element)
  const propsClass = transformEmotion(transformedProps)

  let { children, tag, className, text, ...restProps } = excludedProps
  if (props.text) children = children.concat(text)

  return React.createElement(
    tag || 'div',
    {
      ...restProps,
      className: `${className ?? ''} ${propsClass}`
    },
    children
  )
}
