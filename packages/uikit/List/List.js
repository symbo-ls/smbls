'use strict'

import { Flex } from '@symbo.ls/atoms'

export const List = {
  props: {
    position: 'relative',
    overflow: 'hidden',
    round: 'A',
    minWidth: 'F1',
    theme: 'dialog',
    ':before, &:after': {
      content: '""',
      position: 'absolute',
      boxSize: 'A2 100%',
      zIndex: '2',
      left: '0',
      pointerEvents: 'none'
    },
    ':before': {
      top: '0',
      background: 'linear-gradient(to bottom, var(--theme-dialog-dark-background) 0%, transparent 100%)'
    },
    ':after': {
      bottom: '0',
      background: 'linear-gradient(to top, var(--theme-dialog-dark-background) 0%, transparent 100%)'
    }
  },

  Flex: {
    props: {
      flow: 'column',
      maxHeight: 'F+C',
      overflow: 'auto',
      '::-webkit-scrollbar': { display: 'none' }
    },

    childExtend: {
      props: {
        padding: 'Z1 A1',
        position: 'relative',
        cursor: 'pointer',
        fontSize: 'A1',
        color: 'gray4',
        ':hover': {
          background: 'gray .92 +4'
        },
        childProps: { position: 'relative' }
      }
    }
  }
}

export const ListTemplate = {
  extend: List,
  props: { maxWidth: 'F' },
  Flex: {
    ...[
      { span: { text: 'Item' } },
      { span: { text: 'Item' } },
      { span: { text: 'Item' } },
      { span: { text: 'Item' } },
      { span: { text: 'Item' } },
      { span: { text: 'Item' } },
      { span: { text: 'Item' } },
      { span: { text: 'Item' } },
      { span: { text: 'Item' } },
      { span: { text: 'Item' } },
      { span: { text: 'Item' } },
      { span: { text: 'Item' } },
      { span: { text: 'Item' } }
    ]
  }
}

export const DotList = {
  extend: Flex,
  props: {
    flow: 'column',
    gap: 'Y'
  },
  childExtend: {
    extend: Flex,
    props: {
      align: 'center flex-start',
      gap: 'Z',
      ':before': {
        content: '""',
        boxSize: 'W',
        background: 'white',
        display: 'block',
        zIndex: '20'
      }
    }
  },
  ...[{ props: { text: 'Brat font' } }]
}
