'use strict'

import { Link } from '@symbo.ls/link'
import { IconText } from '@symbo.ls/icon'

export const SocialLink = {
  extend: [Link, IconText],
  props: {
    fontWeight: '500',
    text: 'Continue with Twitch',
    fontSize: 'Z1',
    gap: 'Z',
    boxSize: 'fit-content',
    padding: 'A A2',
    background: 'gray3',
    round: 'Z1',
    maxHeight: `${48 / 16}em`,
    cursor: 'pointer',
    Icon: {
      name: 'twitch',
      boxSize: 'A2'
    }
  }
}
