'use strict '

import React from 'react'
import { transformEmotion, transformClassname } from 'css-in-props'
import { useGlobalTheme, useSymbols } from '@symbo.ls/react-provider'
import { isArray } from '@domql/utils'

export const Box = (props) => {
  const context = useSymbols()
  const [theme, setTheme] = useGlobalTheme() // eslint-disable-line no-unused-vars

  const element = {
    ...props.domqlElementObject,
    context,
    class: {}
  }
  const excludedProps = {}

  const transformedProps = transformClassname(props, context, undefined, excludedProps, element)
  const propsClass = transformEmotion(transformedProps)

  let {
    children,
    tag,
    className,
    text,
    innerRef,
    domqlElementObject,
    ...restProps
  } = excludedProps
  if (props.text) {
    if (isArray(children)) children = children.concat(text)
    else children = [text]
  }

  return React.createElement(
    tag || 'div',
    {
      ...restProps,
      className: `${className ?? ''} ${propsClass}`,
      ref: props.ref || props.innerRef
    },
    children
  )
}
