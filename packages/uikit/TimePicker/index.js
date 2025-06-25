'use strict'

import { Flex } from '@symbo.ls/atoms'
import { Dialog } from '@symbo.ls/dialog'

export * from './TimePickerItem'
export * from './TimeSwitcher'

export const TimePicker = {
  extends: [Dialog, Flex],

  state: {
    activeShift: 'am'
  },

  props: {
    flow: 'column',
    width: 'fit-content',
    padding: 'Z2 A'
  },

  Title: {
    fontSize: 'Z1',
    textTransform: 'capitalize',
    padding: '- - A -',
    text: 'enter time'
  },

  Flex: {
    props: {
      align: 'center center',
      gap: 'A'
    },

    Flex: {
      tag: 'label',
      props: {
        align: 'center center',
        gap: 'Y2'
      },
      TimePickerItem_hh: {
        NumberInput: {
          placeholder: 'HH',
          min: '0',
          max: '11'
        }
      },
      Span: { text: ':' },
      TimePickerItem_mm: {
        NumberInput: {
          placeholder: 'MM',
          min: '0',
          max: '59'
        }
      },
      Span_2: { text: ':' },
      TimePickerItem_ss: {
        NumberInput: {
          placeholder: 'SS',
          min: '0',
          max: '59'
        }
      }
    },
    TimeSwitcher: {}
  },

  DialogFooter: {
    align: 'center flex-end',
    gap: 'X',
    margin: 'Z2 -Z2 -Z',
    childProps: {
      background: 'transparent',
      padding: '0',
      color: '#0079FD'
    }
  }
}
