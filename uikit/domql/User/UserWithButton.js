'use strict'
import { User } from './User'

export const UserWithButton = {
  extend: User,
  props: {
    background: 'gray',
    boxSize: 'fit-content',
    padding: 'X X2',
    round: 'Z',
    border: 'solid, gray3',
    borderWidth: '1px',
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
  IconButton: {
    round: '0',
    background: 'transparent',
    icon: {
      name: 'copy',
      fontSize: 'D1'
    }
  }
}
