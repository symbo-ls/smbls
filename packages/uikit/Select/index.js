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
        required: (el) => el.call('exec', el.props.required),
        disabled: (el) => el.call('exec', el.props.disabled),
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
  },

  attr: {
    name: ({ props }) => props.name,
    required: (el) => el.call('exec', el.props.required),
    disabled: (el) => el.call('exec', el.props.disabled),
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
