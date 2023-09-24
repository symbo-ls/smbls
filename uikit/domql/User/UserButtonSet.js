'use strict'

import { Flex } from '@symbo.ls/atoms'
import { ButtonSet } from '@symbo.ls/button'

export const UserButtonSet = {
  extend: Flex,
  props: {
    gap: 'E2',
    background: 'gray',
    boxSize: 'fit-content',
    padding: 'A1',
    round: 'Z2'
  },

  User: {
    Avatar: { fontSize: 'A2' },
    Notes: {
      Title: {
        h5: {
          fontSize: 'C',
          fontWeight: '700'
        }
      },
      Paragraph: {
        p: {
          text: 'Active now',
          fontSize: 'Y2'
        }
      }
    }
  },
  ButtonSet: {
    extend: ButtonSet,
    props: { gap: 'Y2' },
    childExtend: {
      props: {
        // padding: '0',
        // maxHeight: 'fit-content'
      }
    },
    ...[
      { props: { icon: { name: 'phone' } } },
      { props: { icon: { name: 'video' } } },
      { props: { icon: { name: 'moreHorizontal' } } }
    ]
  }
}