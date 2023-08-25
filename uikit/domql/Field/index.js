'use strict'

import { Focusable, Flex } from '@symbo.ls/atoms'
import { IconText } from '@symbo.ls/icon'
import { Input } from '@symbo.ls/input'

export const Field = {
  extend: [IconText],

  props: ({ state, key }) => ({
    value: state[key],

    depth: 16,
    placeholder: '',
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

    input: {
      width: '100%',
      height: '100%',
      border: 'none'
    },

    svg: {
      position: 'absolute',
      right: 'A'
    }
  }),

  input: { extend: [Focusable, Input] }
}

export const CustomizedField = {
  extend: Field,
  props: {
    background: 'transparent',
    border: '1px solid #3F3F43',
    padding: '0',
    minHeight: 'C+W',
    round: 'Z',
    overflow: 'hidden',
    input: {
      background: 'transparent',
      placeholder: 'placeholder',
      color: 'white',
      fontSize: 'Z',
      round: '0',
      '::placeholder': { textTransform: 'capitalize' }
    }
  }
}

export const CodeField = {
  extend: Flex,
  childExtend: {
    extend: CustomizedField,
    props: {
      boxSize: 'D D',
      input: {
        type: 'number',
        placeholder: '0',
        textAlign: 'center',
        fontSize: 'E'
      },
      style: { 'input[type=number]::-webkit-inner-spin-button': { '-webkit-appearance': ' none' } }
    }
  },
  ...[{}, {}, {}, {}],

  props: {
    align: 'center flex-start',
    gap: 'A'
  }
}

export const FieldWithTitle = {
  extend: Flex,
  title: {
    tag: 'h6',
    props: { text: 'Old password' }
  },
  field: { extend: CustomizedField },

  props: {
    flow: 'column',
    gap: 'Y',
    title: {
      fontSize: 'Z',
      color: '#CFCFD1',
      padding: '- - - Y+W'
    }
  }
}
