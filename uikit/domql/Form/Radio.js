'use strict'

import { Flex } from '@symbo.ls/atoms'

import { Checkbox } from './Checkbox'
import { FieldLabel } from './FieldLabel'

export const Radio = {
  extend: Checkbox,

  Input: {
    props: { type: 'radio' }
  },

  Flex: {
    props: { round: '100%' },
    Icon: null,
    Circle: {
      boxSize: 'Y2 Y2',
      background: 'currentColor',
      round: '100%',
      opacity: '0',
      transition: 'opacity .15s ease',
      '.checked': {
        opacity: '1'
      }
    }
  }
}

export const RadioWithLabel = {
  extend: Flex,
  props: {
    gap: 'A',
    width: 'fit-content',
    fieldLabel: { padding: 'Z - - -' }
  },
  Radio,
  FieldLabel
}
