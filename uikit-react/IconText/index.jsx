'use strict'

import React from "react";

import { IconText as D } from "@symbo.ls/icon-text";
import { Text, Flex } from "@symbo.ls/react-atoms";
import { Icon } from "@symbo.ls/react-icon"

export const IconText = (props) => (<Flex tag={props.tag} alignItems="center" {...props}>
  {
    props.name ?
      <Icon name={props.name} {...props.icon} />
      : null
  }
  <Text text={props.text} />
  {props.children}
</Flex>)

IconText.defaultProps = D.props
