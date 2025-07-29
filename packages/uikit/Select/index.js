'use strict'

export const Select = {
  extend: 'Focusable',
  tag: 'select',

  props: {
    fontSize: 'A',
    border: 'none',
    boxSizing: 'border-box',
    theme: 'field',
    cursor: 'pointer',
    childProps: {
      tag: 'option',
      attr: {
        text: ({ props }) => props.text || props.value,
        value: ({ props }) => props.value,
        selected: ({ props }) => props.selected,
        disabled: ({ props }) => props.disabled
      }
    }
  },

  attr: {
    required: ({ props }) => props.required,
    name: ({ props }) => props.name,
    disabled: ({ props }) => props.disabled,
    value: (el) => {
      if (!el.props || !el.props.value) return
      const val = el.call('exec', el.props.value, el)
      if (el.call('isString', val) && val.includes('{{')) {
        return el.call('replaceLiteralsWithObjectFields', val)
      }
      return val
    }
  }
}
