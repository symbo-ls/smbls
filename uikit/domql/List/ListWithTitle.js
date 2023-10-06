'use strict'

import { Flex } from '@symbo.ls/atoms'
import { List } from './List'

export const ListWithTitle = {
  extend: Flex,
  props: {
    flow: 'column',
    background: 'gray',
    overflow: 'hidden',
    round: 'Z1',
    maxWidth: 'F1'
  },

  Title: {
    tag: 'h5',
    props: {
      position: 'sticky',
      top: '0',
      zIndex: '3',
      text: 'Group name',
      fontSize: 'Z',
      color: 'gray .92 +68',
      fontWeight: '400',
      theme: 'dialog',
      padding: 'A'
    }
  },

  List: {
    extend: List,
    props: {
      round: '0',
      background: 'transparent',
      minWidth: '100%'
    }
  }
}

export const ListWithTitleTemplate = {
  extend: ListWithTitle,

  Title: {},
  List: {
    Flex: {
      ...[
        { span: { text: 'Item' } },
        { span: { text: 'Item' } },
        { span: { text: 'Item' } },
        { span: { text: 'Item' } },
        { span: { text: 'Item' } }
      ]
    }
  }
}
