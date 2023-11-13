'use strict'

import { Flex } from '@symbo.ls/atoms'
import { Search } from '@symbo.ls/field'
import { GroupList } from './GroupList'

export const GroupListWithSearch = {
  extend: GroupList,
  props: {
    maxWidth: 'G1'
  },

  Header: {},

  SearchContainer: {
    extend: Flex,
    props: {
      padding: '0 Z1 Y2 Z1',
      background: 'transparent'
    },
    Search: {
      extend: Search,
      props: {
        maxWidth: '100%',
        minWidth: '100%',
        minHeight: 'C',
        theme: 'transparent',
        round: 'Z1'
      },
      Icon: {
        props: {
          fontSize: 'C',
          color: 'title'
        }
      },
      Input: { fontSize: 'Z' }
    }
  },

  Groups: {
    Flex: {
      childExtend: {
        Title: {},
        List: {
          Flex: {
            childExtend: {
              props: {
              }
            }
          }
        }
      }
    }
  }
}

export const GroupListWithSearchTemplate = {
  extend: GroupListWithSearch,
  Header: {},
  SearchContainer: {},
  Groups: {
    Flex: {
      ...[
        {
          Title: null,
          List: {
            Flex: {
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
            Flex: {
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
      ]
    }
  }
}
