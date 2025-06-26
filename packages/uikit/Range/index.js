'use strict'

import { opacify } from '@symbo.ls/scratch'

export const Range = {
  tag: 'input',

  appearance: 'none',
  width: '100%',
  height: '2px',
  outline: 'none',
  flex: 1,

  onInput: (ev, el, s) => {
    const props = el.props
    if (el.call('isFunction', props.onInput)) {
      props.onInput(ev, el, s)
    } else {
      s.update({ value: parseFloat(el.node.value) })
    }
  },
  onChange: (ev, el, s) => {
    const props = el.props
    if (el.call('isFunction', props.onChange)) {
      props.onChange(ev, el, s)
    } else {
      s.update({ value: parseFloat(el.node.value) })
    }
  },

  '::-webkit-slider-thumb': {
    boxSizing: 'content-box',
    width: '8px',
    height: '8px',
    borderWidth: '2px',
    borderStyle: 'solid',
    borderRadius: '100%',
    opacity: '.8',
    appearance: 'none'
  },

  '::-webkit-slider-runnable-track': {},

  '@dark': {
    background: 'white 0.2',

    '::-webkit-slider-thumb': {
      background: '#232526',
      borderColor: opacify('#454646', 0.75)
    },

    ':hover': {
      '::-webkit-slider-thumb': {
        borderColor: opacify('#fff', 0.35)
      }
    },

    ':focus': {
      '::-webkit-slider-thumb': {
        borderColor: '#3C6AC0'
      }
    }
  },

  '@light': {
    background: 'gray9',

    '::-webkit-slider-thumb': {
      background: 'white',
      borderColor: 'gray9'
    },

    ':hover': {
      '::-webkit-slider-thumb': {
        borderColor: 'gray7'
      }
    },

    ':focus': {
      '::-webkit-slider-thumb': {
        borderColor: 'blue'
      }
    }
  },

  deps: {
    returnPropertyValue: (el, property, def) => {
      const val = el.props && el.call('exec', el.props[property], el)
      const r = el.call('isFunction', val)
        ? val(el, el.state)
        : val !== undefined
        ? val
        : def !== undefined
        ? def
        : 0
      return r + ''
    }
  },

  attr: {
    type: 'range',
    value: (el, s) =>
      el.call('exec', s.value || el.props.value || el.props.defaultValue, el),
    min: (el, s) => el.deps.returnPropertyValue(el, 'min', 0),
    max: (el, s) => el.deps.returnPropertyValue(el, 'max', 100),
    step: (el, s) => el.deps.returnPropertyValue(el, 'step', 1)
  }
}
