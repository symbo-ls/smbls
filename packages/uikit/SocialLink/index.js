'use strict'

import { Link } from '@symbo.ls/link'
import { IconText } from '@symbo.ls/icon'

export const SocialLink = {
  extend: [Link, IconText],
  props: {
    fontWeight: '500',
    gap: 'Z',
    boxSize: 'fit-content',
    padding: 'A A2',
    background: 'gray3',
    round: 'Y+W',
    maxHeight: `${48 / 16}em`,
    cursor: 'pointer',
    Icon: {
      name: 'twitch',
      boxSize: 'A2'
    },
    text: 'Continue with Twitch'
  }
}
