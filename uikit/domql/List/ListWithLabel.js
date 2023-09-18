'use strict'

import { Flex } from '@symbo.ls/atoms'
import { List } from './List'

export const ListWithLabel = {
  extend: Flex,
  props: {
    flow: 'column',
    background: '#1C1C1F',
    round: 'Z+Y',
    minWidth: 'F',
    maxWidth: 'G',
    overflow: 'hidden'
  },

  Label: {
    tag: 'h6',
    props: {
      text: 'Group name',
      color: '#818186',
      fontSize: 'Z',
      background: 'transparent',
      padding: 'Z+X A+W'
    }
  },

  List: {
    extend: List,
    props: {
      round: '0',
      background: 'transparent',
      minWidth: '100%',
      maxWidth: '100%'
    }
  }
}

export const ListWithLabelTemplate = {
  extend: ListWithLabel,
  Label: {},
  List: {
    Flex: {
      ...[
        { span: { text: 'Label' } },
        { span: { text: 'Label' } },
        { span: { text: 'Label' } },
        { span: { text: 'Label' } },
        { span: { text: 'Label' } },
        { span: { text: 'Label' } },
        { span: { text: 'Label' } }
      ]
    }
  }
}
