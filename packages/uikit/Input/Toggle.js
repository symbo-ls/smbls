'use strict'

import { Checkbox, CheckboxHgroup } from './Checkbox'

export const Toggle = {
  extend: Checkbox,

  Input: {
    props: {
      ':checked + div': {
        background: 'green2 +8',
        justifyContent: 'flex-end'
      }
    }
  },

  Flex: {
    props: {
      boxSize: 'A1 B1',
      padding: '- W_default',
      round: 'D',
      align: 'center flex-start',
      theme: 'field',
      border: 'none',
      transition: 'opacity .15s ease',
      ':after': {
        content: '""',
        boxSize: 'A A',
        round: '100%',
        background: 'white',
        boxShadow: '1px, 1px, Z, gray .2'
      }
    },
    Icon: null
  }
}

export const ToggleHgroup = {
  extend: CheckboxHgroup,
  Checkbox: null,
  Toggle: {}
}
