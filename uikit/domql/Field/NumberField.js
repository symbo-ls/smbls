'use strict'

import { Field } from './Field'

export const NumberField = {
  extend: Field,
  props: {
    minWidth: 'D+Y2',
    maxWidth: 'D+Y2',
    minHeight: 'D+Y2',
    padding: '0',
    style: {
      'input[type=number]::-webkit-inner-spin-button': {
        '-webkit-appearance': ' none'
      }
    }
  },

  Input: null,
  NumberInput: {
    fontSize: 'E',
    placeholder: '0',
    boxSize: '100% 100%',
    textAlign: 'center',
    borderRadius: '0',
    background: 'transparent',
    outline: 'none !important',
    color: 'white'
  }
}
