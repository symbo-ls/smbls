'use strict'

import { Pseudo } from '@symbo.ls/atoms'
import { Checkbox, CheckboxHgroup } from './Checkbox'

export const Radio = {
  extend: Checkbox,

  Input: {
    type: 'radio',
    ':checked + div:after': { opacity: '1' }
  },

  Flex: {
    extend: Pseudo,
    props: {
      round: '100%',
      padding: 'Y',
      ':after': {
        content: '""',
        display: 'block',
        boxSize: 'X+W1',
        round: '100%',
        background: 'white',
        opacity: '0',
        transition: 'opacity .15s ease-in-out'
      }
    },
    Icon: null
  }
}

export const RadioHgroup = {
  extend: CheckboxHgroup,
  Checkbox: null,
  Radio: {}
}
