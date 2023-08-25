'use strict'

import { Flex } from '@symbo.ls/atoms'
import { IconText } from '@symbo.ls/icon'
import { NotificationAlert } from '@symbo.ls/accessories'

export const IconTextWithNotification = {
  extend: Flex,
  iconText: {
    extend: IconText,
    props: {
      icon: { name: 'trash' },
      text: 'trash'
    }
  },
  notification: {
    extend: NotificationAlert,
    props: { span: { text: '12' } }
  },

  props: {
    background: '#252527',
    minWidth: 'F+D',
    maxWidth: 'F+D',
    round: 'Z',
    align: 'center space-between',
    padding: 'Y Z',
    iconText: {
      gap: 'Z',
      textTransform: 'capitalize',
      icon: { fontSize: 'C' }
    },
    notification: {
      padding: 'W Y',
      background: 'white',
      color: 'black',
      round: 'Z+W',
      span: { fontSize: 'A' }
    }
  }
}
