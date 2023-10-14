'use strict'

import { User } from './User'

export const UserWithButton = {
  extend: User,
  props: {
    background: 'gray',
    boxSize: 'fit-content',
    padding: 'X Z2 X X',
    round: 'Z',
    border: '1px, solid, gray3'
  },

  Avatar: {
    Avatar: {
      props: { round: 'Y' }
    },
    StatusIndicator: null
  },

  Notes: {
    Title: {
      props: {
        text: 'Wallet ID',
        fontSize: 'Y2'
      }
    },
    Paragraph: {
      props: {
        text: '0xfb59...d862',
        fontSize: 'Y2'
      }
    }
  },

  IconCommonButton: {
    background: 'transparent',
    theme: null,
    color: 'currentColor',
    opacity: '0.5',
    transition: 'A defaultBezier',
    transitionProperty: 'opacity, background',
    padding: '0',
    margin: '- - - Y2',
    Icon: {
      name: 'copy',
      fontSize: 'C'
    }
  }
}
