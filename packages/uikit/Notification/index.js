'use strict'

import { Flex } from '@symbo.ls/atoms'

export const Notification = {
  extend: Flex,

  props: {
    theme: 'alert',
    padding: 'Z1 B Z A',
    round: 'A A A Y2',
    gap: 'X2',
    cursor: 'pointer',
    align: 'flex-start center'
  },

  IconText: {
    props: {
      icon: 'info outline'
    }
  },

  Flex: {
    props: {
      flow: 'column',
      align: 'flex-start',
      gap: 'X2'
    },
    Title: {
      tag: 'h6',
      props: {
        margin: '0',
        fontWeight: '600',
        lineHeight: '1em',
        text: 'Notification'
      }
    },
    P: {
      props: {
        fontSize: 'Z',
        margin: '0',
        text: 'is not always a distraction'
      }
    }
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
    round: 'Y+X'
  }
}
