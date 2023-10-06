'use strict'

export const List = {
  props: {
    position: 'relative',
    overflow: 'hidden',
    round: 'Z1',
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
        ':hover': {
          background: 'gray .92 +8'
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
