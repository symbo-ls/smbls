'use strict'

import { isFunction } from '@domql/utils'
import { opacify } from '@symbo.ls/scratch'

const returnPropertyValue = (el, property, def) => {
  const val = el.props && el.props[property]
  const r = (isFunction(val) ? val(el, el.state) : val !== undefined ? val : def !== undefined ? def : 0)
  return r + ''
}

export const Range = {
  props: {
    appearance: 'none',
    width: '100%',
    height: '2px',
    outline: 'none',
    flex: 1,

    onInput: (ev, el, s) => {
      const props = el.props
      if (isFunction(props.onInput)) {
        props.onInput(ev, el, s)
      } else {
        s.update({ value: parseFloat(el.node.value) })
      }
    },
    onChange: (ev, el, s) => {
      const props = el.props
      if (isFunction(props.onChange)) {
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

      style: {
        appearance: 'none'
      }
    },

    '::-webkit-slider-runnable-track': {
    },

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
    }
  },

  tag: 'input',

  attr: {
    type: 'range',
    value: (el, s) => parseFloat(el.state.value || el.props.value || el.props.defaultValue),
    min: (el, s) => returnPropertyValue(el, 'min', 0),
    max: (el, s) => returnPropertyValue(el, 'max', 100),
    step: (el, s) => returnPropertyValue(el, 'step', 1)
  }
}

export const RangeWithButtons = {
  SquareButton_minus: {
    icon: 'minus',
    theme: 'field',
    onClick: (ev, el, s) => {
      const parentProps = el.parent.props
      if (isFunction(parentProps.onDecrease)) {
        parentProps.onDecrease(ev, el.parent, s)
      } else {
        const value = parseFloat(s.value)
        const min = returnPropertyValue(el.parent, 'min', 1)
        const step = returnPropertyValue(el.parent, 'step', 1)
        if (value > min) {
          s.update({ value: value - step })
        }
      }
    }
  },

  Value: {
    tag: 'span',
    width: '4ch',
    text: ({ state, parent }) => {
      const unit = returnPropertyValue(parent, 'unit', '')
      return '' + (state.value || state.defaultValue || 0) + unit
    }
  },

  Range: {
    attr: {
      value: (el, s) => parseFloat(s.value || s.defaultValue),
      min: (el, s) => returnPropertyValue(el.parent, 'min', 0),
      max: (el, s) => returnPropertyValue(el.parent, 'max', 100),
      step: (el, s) => returnPropertyValue(el.parent, 'step', 1)
    },
    onInput: (ev, el, s) => {
      const parentProps = el.parent.props
      if (isFunction(parentProps.onInput)) {
        parentProps.onInput(ev, el, s)
      } else {
        s.update({ value: parseFloat(el.node.value) })
      }
    },
    onChange: (ev, el, s) => {
      const parentProps = el.parent.props
      if (isFunction(parentProps.onChange)) {
        parentProps.onChange(ev, el, s)
      } else {
        s.update({ value: parseFloat(el.node.value) })
      }
    }
  },

  SquareButton_plus: {
    theme: 'field',
    icon: 'plus',
    onClick: (ev, el, s) => {
      const parentProps = el.parent.props
      if (isFunction(parentProps.onIncrease)) {
        parentProps.onIncrease(ev, el.parent, s)
      } else {
        const value = parseFloat(s.value)
        const max = returnPropertyValue(el.parent, 'max', 1)
        const step = returnPropertyValue(el.parent, 'step', 1)
        if (value < max) {
          s.update({ value: value + step })
        }
      }
    }
  }
}
