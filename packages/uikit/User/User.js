'use strict'

import { Flex } from '@symbo.ls/atoms'

export const User = {
  extend: Flex,

  props: {
    boxSize: 'fit-content',
    theme: 'dialog',
    padding: 'Z A Z Z',
    round: 'A',
    gap: 'Y1',
    align: 'center flex-start'
  },

  AvatarIndicator: {
    Avatar: { boxSize: 'C+V' }
  },

  Hgroup: {
    props: {
      justifyContent: 'center',
      gap: 'W2',
      margin: 'X2 - - -'
    },
    Title: {
      props: {
        fontWeight: '500'
      }
    },
    Paragraph: {
      props: {
        fontSize: 'Z1',
        alignItems: 'center'
      }
    }
  }
}
