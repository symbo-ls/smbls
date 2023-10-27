'use strict'

import { Flex } from '@symbo.ls/atoms'
import { Input } from './Input'

export const Number = {
  extend: [Input, Flex],
  props: {
    type: 'number',
    fontSize: 'E',
    boxSize: 'C+X',
    align: 'center center',
    textAlign: 'center',
    round: 'Y1',
    theme: 'transparent',
    border: 'solid, gray3',
    borderWidth: '1px',
    placeholder: '0',
    fontWeight: '400',
    style: {
      '&::-webkit-inner-spin-button': {
        '-webkit-appearance': 'none'
      }
    }
  },
  attr: {
    step: ({ props }) => props.step,
    min: ({ props }) => props.min,
    max: ({ props }) => props.max
  }
}
