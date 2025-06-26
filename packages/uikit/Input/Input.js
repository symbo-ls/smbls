'use strict'

export const Input = {
  extends: ['Focusable'],

  tag: 'input',

  border: 'none',
  type: 'input',
  theme: 'field',
  fontSize: 'A',
  round: 'C',
  lineHeight: '1',
  padding: 'Z2 B',

  attr: {
    pattern: ({ props }) => props.pattern,
    minLength: ({ props }) => props.minlength,
    maxLength: ({ props }) => props.maxlength,
    name: ({ props }) => props.name,
    autocomplete: ({ props }) => props.autocomplete,
    placeholder: ({ props }) => props.placeholder,
    value: el => {
      if (!el.props || !el.props.value) return
      const val = el.call('exec', el.props.value, el)
      if (el.call('isString', val) && val.includes('{{')) {
        return el.call('replaceLiteralsWithObjectFields', val)
      }
      return val
    },
    checked: el => el.call('exec', el.props.checked, el),
    disabled: ({ props }) => props.disabled || null,
    readonly: ({ props }) => props.readonly,
    required: ({ props }) => props.required,
    type: ({ props }) => props.type
  }
}
