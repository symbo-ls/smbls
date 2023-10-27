'use strict'

import { Flex } from '@symbo.ls/atoms'
import { List } from './List'

export const ListWithTitle = {
  extend: Flex,
  props: {
    flow: 'column',
    overflow: 'hidden',
    round: 'A',
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
      minWidth: '100%'
      // theme: 'tertiary'
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
