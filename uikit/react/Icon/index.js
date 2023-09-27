'use strict'

import { isString } from '@domql/utils'
import { Svg, Text, Flex } from '@symbo.ls/react-atoms'

import * as D from '@symbo.ls/icon'

import React from 'react'

export const Icon = (props) => {
  const { name, iconModifier, ...restProps } = props
  return (
    <Svg {...restProps}>
      {name ? <use xlinkHref={`#${name}${iconModifier}`} /> : props.children}
    </Svg>
  )
}

Icon.defaultProps = {
  iconModifier: '',
  width: 'A',
  height: 'A',
  display: 'inline-block',
  style: { fill: 'currentColor' }
}

export const IconText = (props) => {
  const iconName = isString(props.icon) ? props.icon : props.name
  const iconModifier = props.iconModifier || ''

  return (
    <Flex tag={props.tag} alignItems='center' {...props}>
      {iconName ? <Icon name={iconName} iconModifier={iconModifier} /> : null}
      <Text text={props.text} />
      {props.children}
    </Flex>
  )
}

IconText.defaultProps = D.IconText.props
