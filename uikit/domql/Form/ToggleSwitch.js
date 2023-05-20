'use strict'

import { Flex } from '@symbo.ls/atoms'

import { Checkbox } from './Checkbox'
import { FieldLabel } from './FieldLabel'

const templateDefault = {
  padding: 'Y',
  round: 'B',
  input: { ':checked + div': { justifyContent: 'flex-end', background: '#47FF09' } },
  ':hover > div': { opacity: '1' },
  checkbox: {
    boxSize: 'B C',
    padding: '- W',
    round: 'D',
    opacity: '.5',
    align: 'center flex-start',
    background: '#CFCFD1',
    border: 'none',
    transition: 'opacity .15s ease',
    circle: {
      boxSize: 'A1 A1',
      round: '100%',
      background: 'white',
      style: {
        boxShadow: '1px 1px 8px rgba(0, 0, 0, 0.2)'
      }
    }
  }
}

export const ToggleSwitch = {
  extend: Checkbox,
  props: templateDefault,

  input: {},
  checkbox: {
    Icon: null,
    circle: {}
  }
}

export const ToggleSwithWithLabel = {
  extend: Flex,
  props: {
    gap: 'A',
    width: 'fit-content',
    fieldLabel: { padding: 'Z - - -' }
  },
  toggleSwith: { extend: ToggleSwitch },
  fieldLabel: { extend: FieldLabel }
}
