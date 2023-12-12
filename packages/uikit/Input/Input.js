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
    lineHeight: 1,
    fontFamily: 'smbls',
    padding: 'Z A'
  },

  attr: {
    pattern: ({ props }) => props.pattern,
    minLength: ({ props }) => props.minlength,
    maxLength: ({ props }) => props.maxlength,
    name: ({ props }) => props.name,
    autocomplete: ({ props }) => props.autocomplete,
    placeholder: ({ props }) => props.placeholder,
    value: ({ props, state, deps }) => {
      const { isString, replaceLiteralsWithObjectFields } = deps
      if (isString(props.value) && props.value.includes('{{')) {
        return replaceLiteralsWithObjectFields(props.value, state)
      }
      return props.value
    },
    disabled: ({ props }) => props.disabled || null,
    readonly: ({ props }) => props.readonly,
    required: ({ props }) => props.required,
    type: ({ props }) => props.type
  }
}
