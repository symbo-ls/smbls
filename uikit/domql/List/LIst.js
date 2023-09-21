'use strict'

export const List = {
  props: {
    position: 'relative',
    overflow: 'hidden',
    round: 'Z1',
    background: 'gray',
    minWidth: 'F1',
    ':before': {
      content: '""',
      position: 'absolute',
      boxSize: 'A2 100%',
      top: '0',
      left: '0',
      zIndex: '2',
      background: 'linear-gradient(to bottom, rgba(20, 20, 22, 1) 0%, rgba(20, 20, 22, 0) 100%)'
    },
    ':after': {
      content: '""',
      position: 'absolute',
      boxSize: 'A2 100%',
      bottom: '0',
      left: '0',
      zIndex: '2',
      background: 'linear-gradient(to top, rgba(20, 20, 22, 1) 0%, rgba(20, 20, 22, 0) 100%)'
    }
  },

  Flex: {
    props: {
      flow: 'column',
      maxHeight: 'F+C',
      style: {
        overflowY: 'auto',
        '::-webkit-scrollbar': { display: 'none' }
      }
    },

    childExtend: {
      props: {
        padding: 'Z1 A1',
        position: 'relative',
        cursor: 'pointer',
        ':after': {
          content: '""',
          boxSize: '100% 100%',
          position: 'absolute',
          top: '0',
          left: '0',
          opacity: '0',
          background: 'gray .92 +8'
          // background: '#141416'
        },
        ':hover > *': { zIndex: '5' },
        ':hover:after': { opacity: '1', zIndex: '4' },
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
