'use strict'

import { Focusable } from '@symbo.ls/atoms'
import { IconText } from '@symbo.ls/icon'
import { Input } from '@symbo.ls/input'

export const Field = {
  extend: [IconText],
  input: { extend: [Focusable, Input] },
  props: ({ state, key }) => ({
    value: state[key],
    depth: 16,
    padding: 'A B',
    round: 'C',
    type: 'text',
    position: 'relative',
    width: 'G',
    appearance: 'none',
    outline: 0,
    border: 'none',
    cursor: 'pointer',
    fontFamily: 'inherit',
    boxSizing: 'border-box',
    alignItems: 'center',
    input: {
      flex: '1',
      minHeight: '100%'
    }
  })
}

export const CustomizedField = {
  extend: Field,
  props: {
    padding: '- Z',
    round: 'Y',
    minHeight: 'C+X',
    border: '1px solid #3F3F43',
    gap: 'Y',
    Icon: { fontSize: 'C' },
    input: {
      padding: '0',
      background: 'transparent',
      round: '0',
      color: 'white',
      fontFamily: 'avenir',
      placeholder: 'Placeholder'
    }
  }
}

export const FieldWithIcon = {
  extend: CustomizedField,
  Icon: { props: { icon: 'info' } }
}

export const CodeField = {
  extend: CustomizedField,
  props: {
    padding: '0',
    width: 'D',
    minHeight: 'D',
    input: {
      type: 'number',
      placeholder: '0',
      textAlign: 'center',
      fontSize: 'E',
      round: 'Y',
      padding: '0',
      boxSize: '100% 100%'
    },
    style: {
      'input[type=number]::-webkit-inner-spin-button': {
        '-webkit-appearance': ' none'
      }
    }
  }
}
