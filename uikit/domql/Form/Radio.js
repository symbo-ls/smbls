'use strict'

import { Flex } from '@symbo.ls/atoms'

import { Checkbox } from './Checkbox'
import { FieldLabel } from './FieldLabel'

const templateDefault = {
  input: { ':checked + div > div': { opacity: '1' } },
  Flex: {
    round: '100%',
    circle: {
      boxSize: 'Y2 Y2',
      background: 'black',
      round: '100%',
      opacity: '0',
      transition: 'opacity .15s ease'
    }
  }
}

export const Radio = {
  extend: Checkbox,
  props: templateDefault,
  input: { attr: { type: 'radio' } },
  Flex: {
    Icon: null,
    circle: {}
  }
}

export const RadioWithLabel = {
  extend: Flex,
  props: {
    gap: 'A',
    width: 'fit-content',
    fieldLabel: { padding: 'Z - - -' }
  },
  radio: { extend: Radio },
  fieldLabel: { extend: FieldLabel }
}
