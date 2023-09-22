'use strict'

import { Input } from './Input'

export const NumberInput = {
  extend: Input,
  props: { type: 'number' },
  attr: {
    step: ({ props }) => props.step,
    min: ({ props }) => props.min,
    max: ({ props }) => props.max
  }
}
