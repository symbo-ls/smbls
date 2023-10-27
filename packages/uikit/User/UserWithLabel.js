'use strict'

import { Label } from '../Label'
import { User } from './User'

export const UserWithLabel = {
  extend: User,
  props: { gap: 'Y2' },

  AvatarIndicator: {
    StatusIndicator: null,
    Avatar: { props: { boxSize: 'B2+W' } }
  },

  Notes: {
    props: { margin: 'V2 - - -' },
    Title: {
      props: {
        gap: 'Y1',
        fontSize: 'Z2'
      },
      caption: { props: { text: 'ETHDOWN' } },
      label: { extend: Label }
    },
    Paragraph: {
      tag: 'p',
      props: {
        text: 'Short ETH with up to 4x Leverage',
        fontSize: 'Y1'
      }
    }
  }
}
