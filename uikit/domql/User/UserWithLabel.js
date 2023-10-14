'use strict'

import { Label } from '../Label'
import { User } from './User'

export const UserWithLabel = {
  extend: User,
  props: { gap: 'A' },

  Avatar: {
    StatusIndicator: null,
    Avatar: { props: { boxSize: 'B2' } }
  },
  Notes: {
    props: {
      gap: 'W',
      margin: 'W - - -'
    },
    Title: {
      props: {
        gap: 'Z'
      },
      caption: {
        props: {
          text: 'ETHDOWN',
          fontSize: 'Z1'
        }
      },
      label: { extend: Label }
    },
    Paragraph: {
      tag: 'p',
      props: {
        text: 'Short ETH with up to 4x Leverage',
        fontSize: 'Y2'
      }
    }
  }
}
