'use strict'

import { User } from './User'

export const UserMessage = {
  extend: User,
  props: { gap: 'Z' },
  AvatarIndicator: {
    fontSize: 'Z'
  },
  Notes: {
    Title: null,
    Paragraph: {
      p: {
        props: {
          text: 'Can you please review the latest design?',
          fontSize: 'Z',
          padding: 'Z2 A',
          round: 'Z2',
          theme: 'secondary'
        }
      }
    }
  }
}
