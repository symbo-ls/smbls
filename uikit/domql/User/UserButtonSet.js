'use strict'

import { Flex } from '@symbo.ls/atoms'
import { ButtonSet } from '@symbo.ls/button'

export const UserButtonSet = {
  extend: Flex,
  props: {
    gap: 'E2',
    background: 'gray',
    boxSize: 'fit-content',
    padding: 'A',
    round: 'Z2'
  },

  User: {
    AvatarIndicator: { fontSize: 'A2' },
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
    ...[
      { props: { Icon: { name: 'phone' } } },
      { props: { Icon: { name: 'video' } } },
      { props: { Icon: { name: 'moreHorizontal' } } }
    ]
  }
}