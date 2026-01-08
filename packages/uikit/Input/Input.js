'use strict'

export const Input = {
  extend: ['Focusable'],

  tag: 'input',

  props: {
    border: 'none',
    type: 'input',
    theme: 'field',
    fontSize: 'A',
    round: 'C',
    lineHeight: '1',
    padding: 'Z2 B'
  },

  attr: {
    pattern: ({ props }) => props.pattern,
    minLength: ({ props }) => props.minlength,
    maxLength: ({ props }) => props.maxlength,
    name: ({ props }) => props.name,
    autocomplete: ({ props }) => props.autocomplete,
    placeholder: (el) => {
      if (!el.props || !el.props.placeholder) return
      const placeholder = el.call('exec', el.props.placeholder, el)
      if (el.call('isString', placeholder) && placeholder.includes('{{')) {
        return el.call('replaceLiteralsWithObjectFields', placeholder)
      }
      return placeholder
    },
    value: (el) => {
      if (!el.props || !el.props.value) return
      const val = el.call('exec', el.props.value, el)
      if (el.call('isString', val) && val.includes('{{')) {
        return el.call('replaceLiteralsWithObjectFields', val)
      }
      return val
    },
    checked: (el) => el.call('exec', el.props.checked, el),
    readonly: (el) => el.call('exec', el.props.readonly),
    required: (el) => el.call('exec', el.props.required),
    disabled: (el) => el.call('exec', el.props.disabled),
    type: (el) => el.call('exec', el.props.type)
  }
}
