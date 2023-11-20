'use strict'

import { User } from './User'

export const UserMessage = {
  extend: User,
  props: { gap: 'Z', theme: 'transparent' },
  Avatar: {},
  Notes: {
    Title: null,
    props: { margin: '0' },
    Paragraph: {
      props: {
        text: 'Can you please review the latest design?',
        padding: 'Z1 Z2',
        round: 'Z2',
        theme: 'dialog'
      }
    }
  }
}
