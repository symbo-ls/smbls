'use strict'

import { Flex } from '@symbo.ls/atoms'
import { Search } from '@symbo.ls/field'
import { GroupList } from './GroupList'

export const GroupListWithSearch = {
  extend: GroupList,
  props: { maxWidth: 'G1' },

  Header: {},
  SearchContainer: {
    extend: Flex,
    props: {
      padding: 'A Z1'
    },
    Search: {
      extend: Search,
      props: {
        maxWidth: '100%',
        minWidth: '100%',
        minHeight: 'C+Y',
        round: 'Z2'
      },
      Icon: {
        props: {
          fontSize: 'C',
          color: 'gray2'
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
      props: {
        childProps: {
          Title: { padding: 'A A A A2' },
          List: {
            Flex: {
              childProps: { padding: 'Z1 A1 Z1 B' }
            }
          }
        }
      },
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
