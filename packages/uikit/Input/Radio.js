'use strict'

export const Radio = {
  extend: 'Checkbox',

  Input: {
    type: 'radio',
    ':checked + div:after': { opacity: '1' }
  },

  Flex: {
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
    },
    Icon: null
  }
}

export const RadioHgroup = {
  extend: 'CheckboxHgroup',
  Checkbox: null,
  Radio: {}
}
