'use strict'

import { Flex } from '@symbo.ls/atoms'
import { Input } from '@symbo.ls/input'
import { Button } from '@symbo.ls/button'

const props = {
  align: 'center center',
  flow: 'column',
  gap: 'X',
  style: {
    'input[type=number]::-webkit-inner-spin-button': {
      '-webkit-appearance': 'none',
      margin: 0
    },
    'input[type=number]::-webkit-outer-spin-button': {
      '-webkit-appearance': 'none',
      margin: 0
    },
    'input[type=number]': { '-webkit-appearance': 'textfield' },
    'input:focus < button': { border: '3px solid red' },
    '> button': {
      padding: '0',
      background: 'transparent',
      color: 'white',
      fontSize: `${12 / 16}em`,
      display: 'none'
    }
  },

  input: {
    boxSize: 'C C',
    round: 'Z',
    padding: '0',
    align: 'center center',
    textAlign: 'center',
    color: 'white',
    background: 'white .15'
  }
}

export const TimePickerItem = {
  tag: 'label',
  extend: Flex,
  props,
  upButton: { extend: Button, props: { icon: 'plus' } },
  input: { extend: [Input, Flex], attr: { type: 'number', min: '1', max: '24', value: '1' } },
  downButton: { extend: Button, props: { icon: 'minus' } }
}
