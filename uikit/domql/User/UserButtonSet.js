'use strict'

import { Flex } from '@symbo.ls/atoms'

export const UserButtonSet = {
  extend: Flex,
  props: {
    gap: 'E2',
    background: 'gray',
    boxSize: 'fit-content',
    padding: 'Z1 Z2 Z1 Z1',
    round: 'Z1',
    alignItems: 'center'
  },

  User: {
    gap: 'Z1',
    Avatar: { fontSize: 'A1' },
    Notes: {
      gap: 'Y',
      margin: 'W - - -',
      Title: {
        text: 'Group chat',
        fontSize: 'B2',
        fontWeight: '700'
      },
      Paragraph: {
        text: 'Active now',
        fontSize: 'X2'
      }
    }
  },

  ButtonSet: {
    props: { gap: 'Y2' },
    ...[
      { props: { Icon: { name: 'phone' } } },
      { props: { Icon: { name: 'video' } } },
      { props: { Icon: { name: 'moreHorizontal' } } }
    ]
  }
}
