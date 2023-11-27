'use strict'

import { Flex } from '@symbo.ls/atoms'

export const UserButtonSet = {
  extend: Flex,
  props: {
    boxSize: 'fit-content',
    theme: 'dialog',
    padding: 'Z1 Z1 Z Z',
    round: 'A',
    alignItems: 'center',
    gap: 'E'
  },

  User: {
    padding: '0',
    gap: 'Y2',
    Avatar: { fontSize: 'A1' },
    Notes: {
      margin: 'W - - -',
      gap: 'X2',
      Title: {
        text: 'Group',
        fontSize: 'C1'
      },
      Paragraph: {
        text: 'Active now',
        fontSize: 'Y',
        padding: '- - - W1'
      }
    }
  },

  ButtonSet: {
    props: { gap: 'Y2' },
    ...[
      { props: { icon: 'phone' } },
      { props: { icon: 'video' } },
      { props: { icon: 'moreHorizontal' } }
    ]
  }
}

export const UserButtonSetCircle = {
  extend: UserButtonSet,
  User: {},
  ButtonSet: {
    childExtend: {
      props: {
        round: '100%'
      }
    }
  }
}
