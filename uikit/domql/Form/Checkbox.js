'use strict'

import { Flex, Focusable } from '@symbo.ls/atoms'

import { FieldLabel } from './FieldLabel'

const Input = {
  props: {
    type: 'checkbox',
    hide: true
  },
  attr: {
    name: ({ parent }) => parent.props.name,
    checked: ({ state }) => state.checked,
    type: 'checkbox'
  },
  on: {
    render: ({ parent, node }) => {
      const { indeterminate } = parent.props
      node.indeterminate = indeterminate
    },
    update: ({ parent, node }) => {
      const { indeterminate } = parent.props
      console.log(indeterminate)
      node.indeterminate = indeterminate
    }
  }
}

export const Checkbox = {
  props: {
    padding: 'Z',
    round: '100%',
    boxSize: 'fit-content',
    ':hover': { background: 'gray .1' },
    ':active': { background: 'gray .35' }
  },

  state: ({ props }) => ({
    checked: props.checked || true
  }),

  Input,
  Flex: {
    extend: [Focusable, Flex],
    tag: 'label',
    props: {
      align: 'center center',
      boxSize: 'B',
      round: 'Y',
      transition: 'Z defaultBezier',
      transitionProperty: 'background, color, border',
      borderWidth: '1px',
      borderStyle: 'solid',
      '@dark': { color: 'white' },
      '@light': { color: 'black' },
      '.checked': {
        theme: 'secondary',
        borderColor: 'transparent'
      },
      '!checked': {
        '@dark': { borderColor: 'white' },
        '@light': { borderColor: 'black' }
      }
    },
    Icon: {
      height: 'Z Z2',
      name: 'check',
      opacity: '0',
      transition: 'opacity A defaultBezier',
      '.checked': {
        opacity: '1'
      }
    }
  },
  on: {
    click: (event, { state }) => {
      state.toggle('checked')
    }
  }
}

export const CheckBoxWithLabel = {
  extend: Flex,
  props: {
    gap: 'A',
    width: 'fit-content',
    fieldLabel: { padding: 'Z - - -' }
  },
  Checkbox,
  FieldLabel
}
