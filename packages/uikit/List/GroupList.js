'use strict'

import { Flex } from '@symbo.ls/atoms'
import { ListWithTitle } from './ListWithTitle'
import { List } from './List'

export const GroupList = {
  extend: Flex,
  props: {
    flow: 'column',
    overflow: 'hidden',
    theme: 'dialog',
    maxHeight: 'H',
    round: 'Z1',
    maxWidth: 'G'
  },

  Header: {
    extend: Flex,
    props: {
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
      ...List.props,
      theme: null,
      round: '0'
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
