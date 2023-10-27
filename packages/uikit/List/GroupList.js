'use strict'

import { Flex } from '@symbo.ls/atoms'
import { ListWithTitle } from './ListWithTitle'

export const GroupList = {
  extend: Flex,
  props: {
    flow: 'column',
    overflow: 'hidden',
    theme: 'dialog',
    maxHeight: 'H',
    round: 'A',
    maxWidth: 'G'
  },

  Header: {
    extend: Flex,
    props: {
      text: 'Header',
      padding: 'Z2 A',
      fontSize: 'A2',
      fontWeight: '500',
      color: 'white'
    }
  },

  Groups: {
    props: {
      position: 'relative',
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
      extend: Flex,
      props: {
        flow: 'column',
        maxHeight: 'G2',
        overflow: 'auto',
        '::-webkit-scrollbar': { display: 'none' }
      },
      childExtend: {
        extend: ListWithTitle,
        props: {
          round: '0',
          minWidth: '100%',
          overflow: 'visible',
          background: 'transparent'
        },
        Title: { props: { theme: 'transparent' } },
        List: {
          props: {
            overflow: 'visible',
            theme: 'transparent',
            ':before': { display: 'none' },
            ':after': { display: 'none' }
          },
          Flex: {
            props: {
              style: { overflowY: 'visible' },
              minHeight: 'fit-content',
              maxHeight: 'fit-content',
              childProps: {
                ':after': { background: 'gray' }
              }
            }
          }
        }
      }
    }
  }
}

export const GroupListTemplate = {
  extend: GroupList,
  Header: {},
  Groups: {
    props: {},
    Flex: {
      props: {},
      ...[
        {
          Title: null,
          List: {
            props: {},
            Flex: {
              props: {},
              ...[
                { span: { text: 'Item' } },
                { span: { text: 'Item' } }
              ]
            }
          }
        },
        {
          Title: {},
          List: {
            props: {},
            Flex: {
              props: {},
              ...[
                { span: { text: 'Item' } },
                { span: { text: 'Item' } },
                { span: { text: 'Item' } }
              ]
            }
          }
        },
        {
          Title: {},
          List: {
            props: {},
            Flex: {
              props: {},
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
        }
      ]
    }
  }
}
