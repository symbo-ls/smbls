'use strict'

import { User } from './User'

export const UserWithButton = {
  extend: User,
  props: {
    background: 'gray',
    boxSize: 'fit-content',
    padding: 'X X2',
    round: 'Z',
    border: '1px, solid, gray3',
    gap: 'Y2'
  },

  Avatar: {
    Avatar: {
      round: 'Y'
    },
    StatusIndicator: null
  },
  Notes: {
    Title: {
      h5: {
        props: {
          text: 'Wallet ID',
          fontSize: 'Y2'
        }
      }
    },
    Paragraph: {
      p: {
        props: {
          text: '0xfb59...d862',
          fontSize: 'Y2'
        }
      }
    }
  },
  IconCommonButton: {
    round: 'Y1',
    background: 'transparent',
    theme: null,
    color: 'currentColor',
    opacity: '0.5',
    transition: 'A defaultBezier',
    transitionProperty: 'opacity, background',
    ':hover': {
      opacity: '1',
      theme: 'secondary'
    },
    margin: '- - - Z2',
    Icon: {
      name: 'copy',
      fontSize: 'C'
    }
  }
}
