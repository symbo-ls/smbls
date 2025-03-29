'use strict'

export const Notification = {
  extends: 'Flex',

  props: {
    theme: 'alert',
    padding: 'Z1 B Z A',
    round: 'A A A Y2',
    gap: 'X2',
    cursor: 'pointer',
    align: 'flex-start center'
  },

  IconText: {
    Icon: {
      name: 'info outline'
    },
    Text: {
      ':empty': { hide: true }
    }
  },

  Hgroup: {
    extends: ['Flex', 'Hgroup'],
    flow: 'y',
    align: 'flex-start',
    gap: 'X2',

    H: {
      tag: 'h6',
      margin: '0',
      fontWeight: '600',
      lineHeight: '1em',
      text: 'Notification',
      ':empty': { hide: true }
    },

    P: {
      fontSize: 'Z',
      margin: '0',
      text: 'is not always a distraction',
      ':empty': { hide: true }
    }
  }
}
