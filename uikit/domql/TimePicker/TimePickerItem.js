'use strict'

import { Flex } from '@symbo.ls/atoms'

const props = {
  align: 'center center',
  flow: 'column',
  gap: 'X',
  style: {
    '> button': {
      padding: '0',
      background: 'transparent',
      color: 'white',
      fontSize: `${12 / 16}em`,
      display: 'none'
    }
  }
}

export const TimePickerItem = {
  tag: 'label',
  extend: Flex,
  props,
  Button_plus: { icon: 'plus' },
  NumberInput: {
    boxSize: 'C C',
    round: 'Z',
    padding: '0',
    align: 'center center',
    textAlign: 'center',
    min: 0,
    max: 24,
    placeholder: '00',
    appearance: 'textfield',
    theme: 'secondary',

    '::-webkit-inner-spin-button': {
      style: { appearance: 'none' },
      margin: 0
    },
    '::-webkit-outer-spin-button': {
      style: { appearance: 'none' },
      margin: 0
    }
  },
  Button_minus: { icon: 'minus' }
}