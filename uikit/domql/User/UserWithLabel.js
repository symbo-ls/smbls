'use strict'

import { User } from './User'

export const UserWithLabel = {
  extend: User,

  AvatarIndicator: {
    StatusIndicator: null,
    Avatar: { boxSize: 'B' }
  },
  Notes: {
    props: { gap: 'X' },
    Title: {
      props: {
        justifyContent: 'flex-start',
        gap: 'Y2'
      },
      h5: {
        props: {
          text: 'ETHDOWN',
          fontSize: 'Z'
        }
      },
      Label: {}
    },
    Paragraph: {
      p: {
        props: {
          fontSize: 'Y2',
          text: 'Short ETH with up to 4x Leverage'
        }
      }
    }
  }
}
