'use strict'

import { Flex } from '@symbo.ls/atoms'

import { FieldLabel } from './FieldLabel'

const templateDefault = {
  padding: 'Z',
  round: '100%',
  boxSize: 'fit-content fit-content',
  ':hover': { background: '#252527' },

  input: {
    ':checked + div': {
      background: '#0474F2',
      border: 'none'
    },
    ':checked + div > svg': { opacity: '1' },
    display: 'none'
  },

  checkbox: {
    align: 'center center',
    border: '1px solid #E9E9EA',
    boxSize: 'B B',
    round: 'Y',
    Icon: {
      height: 'Z Z2',
      color: 'white',
      name: 'check',
      opacity: '0',
      transition: 'opacity .15s ease'
    }
  }
}

export const Checkbox = {
  tag: 'label',
  props: templateDefault,
  input: {
    attr: {
      type: 'checkbox',
      checked: ({ parent }) => parent.props.checked
    }
  },
  checkbox: {
    extend: 'Flex',
    Icon: {}
  }
}

export const CheckBoxWithLabel = {
  extend: Flex,
  props: {
    gap: 'A',
    width: 'fit-content',
    fieldLabel: { padding: 'Z - - -' }
  },
  checkbox: { extend: Checkbox },
  fieldLabel: { extend: FieldLabel }
}
