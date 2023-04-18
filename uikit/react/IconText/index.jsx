'use strict'

import React from 'react'
import { isString } from '@domql/utils'

import { IconText as D } from '@symbo.ls/icon-text'
import { Text, Flex } from '@symbo.ls/react-atoms'
import { Icon } from '@symbo.ls/react-icon'

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

IconText.defaultProps = D.props
