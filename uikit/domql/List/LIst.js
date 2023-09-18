'use strict'

export const List = {
  props: {
    position: 'relative',
    overflow: 'hidden',
    round: 'Z+Y',
    background: '#1C1C1F',
    minWidth: 'F',
    maxWidth: 'G',
    ':before': {
      content: '""',
      position: 'absolute',
      boxSize: 'A 100%',
      top: '0',
      left: '0',
      zIndex: '2',
      background: 'linear-gradient(to bottom, rgba(28, 28, 31, 1) 0%, rgba(28, 28, 31, 0) 100%)'
    },
    ':after': {
      content: '""',
      position: 'absolute',
      boxSize: 'A 100%',
      bottom: '0',
      left: '0',
      zIndex: '2',
      background: 'linear-gradient(to top, rgba(28, 28, 31, 1) 0%, rgba(28, 28, 31, 0) 100%)'
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
        padding: 'A A+Y',
        position: 'relative',
        cursor: 'pointer',
        ':after': {
          content: '""',
          boxSize: '100% 100%',
          position: 'absolute',
          top: '0',
          left: '0',
          opacity: '0',
          transition: 'opacity .15s ease-in-out',
          background: '#141416'
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
