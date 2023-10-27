'use strict'

import { Field } from './Field'

export const NumberField = {
  extend: Field,
  props: {
    minWidth: 'D+Y2',
    maxWidth: 'D+Y2',
    minHeight: 'D+Y2',
    padding: '0'
  },

  Input: null,
  NumberInput: {
    props: {
      fontSize: 'E',
      placeholder: '0',
      boxSize: '100% 100%',
      textAlign: 'center',
      round: 'Y',
      color: 'white',
      background: 'rgba(0, 0, 0, 0)',
      outline: 'none !important',
      style: {
        '&::-webkit-inner-spin-button': {
          '-webkit-appearance': 'none'
        }
      }
    }
  }
}
