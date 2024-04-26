'use strict'

import { User } from './User'

export const UserWithButton = {
  extend: 'Flex',
  props: {
    boxSize: 'fit-content',
    theme: 'dialog',
    border: '1px, solid, gray3',
    padding: 'Y Z2 Y Y',
    alignItems: 'center',
    gap: 'B',
    round: 'A'
  },

  User: {
    extend: User,
    props: { padding: '0' },
    Avatar: {
      Avatar: {
        props: { fontSize: 'Z2', round: 'Z1' }
      },
      StatusIndicator: null
    },

    Notes: {
      props: { gap: 'X' },
      Title: {
        props: {
          text: 'Wallet ID'
        }
      },
      Paragraph: {
        props: {
          text: '0xfb59...d862'
        }
      }
    }
  },

  SquareButton: {
    background: 'transparent',
    theme: null,
    color: 'currentColor',
    opacity: '0.5',
    transition: 'A defaultBezier',
    transitionProperty: 'opacity, background',
    padding: '0',
    Icon: {
      name: 'copy',
      fontSize: 'C'
    }
  }
}
