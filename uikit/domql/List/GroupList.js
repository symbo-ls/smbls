'use strict'

import { Flex } from '@symbo.ls/atoms'
import { ListWithLabel } from './ListWithLabel'

export const GroupList = {
  extend: Flex,
  props: {
    flow: 'column',
    background: '#1C1C1F',
    minWidth: 'F',
    maxWidth: 'G',
    overflow: 'hidden'
  },

  Header: {
    extend: Flex,
    props: {
      background: '#141416'
    },
    h4: {
      props: {
        text: 'Header'
      }
    }
  },

  Groups: {
    extend: Flex,
    Flex: {
      props: {
        flow: 'column',
        flex: '1'
      },
      childExtend: {
        extend: ListWithLabel,
        props: {
          background: 'transparent',
          round: '0',
          minWidth: '100%',
          maxWidth: '100%',
          overflow: 'visible',
          Label: {},
          List: {

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
          Label: {},
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
          Label: {},
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
          Label: {},
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
