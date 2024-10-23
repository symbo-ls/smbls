'use strict'

import { isString, replaceLiteralsWithObjectFields } from '@domql/utils'

export const Input = {
  extend: ['Focusable'],

  tag: 'input',

  deps: { isString, replaceLiteralsWithObjectFields },

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
    placeholder: ({ props }) => props.placeholder,
    value: (el, s) => {
      const { props, state, deps } = el
      const { isString, exec, replaceLiteralsWithObjectFields } = deps
      const val = exec(props.value, el)
      if (isString(val) && val.includes('{{')) {
        return replaceLiteralsWithObjectFields(val, state)
      }
      return val
    },
    disabled: ({ props }) => props.disabled || null,
    readonly: ({ props }) => props.readonly,
    required: ({ props }) => props.required,
    type: ({ props }) => props.type
  }
}
