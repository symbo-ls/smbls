'use strict'

export const Select = {
  extend: 'Focusable',
  tag: 'select',

  props: {
    fontSize: 'A',
    border: 'none',
    boxSizing: 'border-box',
    theme: 'field',
    cursor: 'pointer'
  },

  childExtend: {
    tag: 'option',
    props: {
      value: '',
      selected: '',
      disabled: ''
    },
    attr: {
      value: ({ props }) => props.value,
      selected: ({ props }) => props.selected,
      disabled: ({ props }) => props.disabled
    }
  },

  attr: {
    name: ({ props }) => props.name,
    disabled: ({ props }) => props.disabled
  }
}
