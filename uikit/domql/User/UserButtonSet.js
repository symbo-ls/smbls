'use strict'

import { Flex } from '@symbo.ls/atoms'

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
    gap: 'A',
    Avatar: {
      fontSize: 'B'
    },
    Notes: {
      gap: 'Y',
      Title: {
        text: 'Group chat',
        fontSize: 'C',
        fontWeight: '700'
      },
      Paragraph: {
        text: 'Active now',
        fontSize: 'Y1'
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
