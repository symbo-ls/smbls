'use strict'

import { Flex } from '@symbo.ls/atoms'
import { ListWithTitle } from './ListWithTitle'

export const GroupList = {
  extend: Flex,
  props: {
    flow: 'column',
    overflow: 'hidden',
    maxHeight: 'H',
    background: 'gray3',
    round: 'Z1',
    maxWidth: 'G'
  },

  Header: {
    extend: Flex,
    props: {
      background: 'gray',
      padding: 'Z - Z A'
    },
    h4: {
      props: {
        text: 'Header',
        fontSize: 'A',
        fontWeight: '500',
        color: 'gray4'
      }
    }
  },

  Groups: {
    props: {
      overflow: 'hidden',
      maxHeight: '100%',
      position: 'relative',
      ':before': {
        content: '""',
        position: 'absolute',
        boxSize: 'A1 100%',
        top: '0',
        left: '0',
        zIndex: '2',
        background: 'linear-gradient(to bottom, rgba(28, 28, 31, 1) 0%, rgba(28, 28, 31, 0) 100%)'
      },
      ':after': {
        content: '""',
        position: 'absolute',
        boxSize: 'A1 100%',
        bottom: '0',
        left: '0',
        zIndex: '2',
        background: 'linear-gradient(to top, rgba(28, 28, 31, 1) 0%, rgba(28, 28, 31, 0) 100%)'
      }
    },
    Flex: {
      extend: Flex,
      props: {
        flow: 'column',
        maxHeight: 'G2',
        style: {
          overflowY: 'auto !important',
          '::-webkit-scrollbar': { display: 'none' }
        }
      },
      childExtend: {
        extend: ListWithTitle,
        props: {
          round: '0',
          minWidth: '100%',
          overflow: 'visible',
          background: 'transparent'
        },
        Title: {},
        List: {
          props: {
            overflow: 'visible',
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
    Flex: {
      ...[
        {
          Title: null,
          List: {
            Flex: {
              ...[
                { span: { text: 'Label' } },
                { span: { text: 'Label' } }
              ]
            }
          }
        },
        {
          Title: {},
          List: {
            Flex: {
              ...[
                { span: { text: 'Label' } },
                { span: { text: 'Label' } },
                { span: { text: 'Label' } }
              ]
            }
          }
        },
        {
          Title: {},
          List: {
            Flex: {
              ...[
                { span: { text: 'Label' } },
                { span: { text: 'Label' } },
                { span: { text: 'Label' } },
                { span: { text: 'Label' } },
                { span: { text: 'Label' } }
              ]
            }
          }
        }
      ]
    }
  }
}
