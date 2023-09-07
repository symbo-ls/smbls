'use strict'

import { CheckBox } from '@symbo.ls/checkbox'

export const ToggleSwitch = {
  extend: CheckBox,

  Input: {},

  check: {
    checkIcon: null,
    circle: {}
  },

  props: {
    style: {
      'input:checked ~ div': {
        background: '#47FF09',
        justifyContent: 'flex-end'
      }
    },
    check: {
      boxSize: 'A+X C',
      padding: '- W',
      round: 'D',
      align: 'center flex-start',
      background: '#CFCFD1',
      border: 'none',
      transition: 'opacity .15s ease',
      circle: {
        boxSize: 'A A',
        round: '100%',
        background: 'white',
        boxShadow: '1px, 1px, Z, gray .2'
      }
    }
  }
}
