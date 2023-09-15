'use strict'

import { CheckBox } from '@symbo.ls/checkbox'

export const RadioButton = {
  extend: CheckBox,
  Input: { props: { type: 'radio' } },
  check: {
    checkIcon: null,
    circle: {}
  },

  props: {
    style: { 'input:checked ~ div > div': { opacity: '1' } },
    check: {
      round: '100%',
      circle: {
        boxSize: 'Y Y',
        round: '100%',
        background: 'white',
        opacity: '0',
        transition: 'opacity .15s ease-in-out'
      }
    }
  }
}
