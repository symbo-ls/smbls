'use strict'

import { Flex } from '@symbo.ls/atoms'
import { IconText } from '@symbo.ls/icon'

export const Notification = {
  extend: Flex,

  props: {
    theme: 'alert',
    padding: 'Z1 B Z A',
    round: 'A A A Y2',
    gap: 'X2',
    cursor: 'pointer',
    align: 'flex-start center',

    icon: {
      icon: 'info outline'
    },

    article: {
      flow: 'column',
      align: 'flex-start',
      gap: 'X2',
      title: {
        fontWeight: '600',
        lineHeight: '1em',
        text: 'Notification'
      },
      p: {
        fontSize: 'Z',
        margin: '0',
        text: 'is not always a distraction'
      }
    }
  },

  icon: {
    extend: [IconText]
  },

  article: {
    extend: Flex,
    title: {},
    p: {}
  }
}

export const NotificationIndicator = {
  extend: Flex,
  props: {
    text: '2',
    fontSize: 'Z',
    lineHeight: '1em',
    background: '#0474F2',
    boxSize: 'fit-content fit-content',
    padding: 'X+W',
    round: 'Y+X',
    color: 'white'
  }
}
