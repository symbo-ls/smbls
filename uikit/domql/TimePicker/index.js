'use strict'

import { Flex } from '@symbo.ls/atoms'
import { TimePickerItem } from './TimePickerItem'

const props = {
  flow: 'column',
  width: 'fit-content',
  background: 'rgba(255, 255, 255, .15)',
  padding: 'A A B A',
  round: 'Z',

  title: {
    fontSize: 'Z1',
    textTransform: 'capitalize',
    padding: '- - B -'
  },

  content: {
    align: 'center center',
    gap: 'A',
    timePickers: {
      align: 'center center',
      gap: 'Y2'
    }
  },

  footButtons: {
    align: 'center flex-end',
    gap: 'A1',
    padding: 'B1 - - -',
    childProps: {
      background: 'transparent',
      padding: '0',
      color: '#0079FD'
    }
  }
}

export const TimePicker = {
  extend: Flex,
  props,
  title: { text: 'enter time' },
  content: {
    extend: Flex,
    timePickers: {
      tag: 'label',
      extend: Flex,
      ...[
        { extend: TimePickerItem },
        ':',
        { extend: TimePickerItem },
        ':',
        { extend: TimePickerItem }
      ]
    },
    TimeSwitcher: {}
  },

  DialogFooter: {}
}
