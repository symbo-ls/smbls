'use strict'

import { Flex } from '@symbo.ls/atoms'
import { Input } from './Input'

export const NumberInput = {
  extend: [Input, Flex],

  props: {
    type: 'number',
    boxSize: 'C+X',
    align: 'center center',
    textAlign: 'center',
    round: 'Y1',
    theme: 'transparent',
    border: 'solid, gray3',
    borderWidth: '1px',
    placeholder: '0',
    fontWeight: '400',
    '::-webkit-inner-spin-button': {
      appearance: 'none'
    }
  },

  attr: {
    step: ({ props }) => props.step,
    min: ({ props }) => props.min,
    max: ({ props }) => props.max
  }
}
