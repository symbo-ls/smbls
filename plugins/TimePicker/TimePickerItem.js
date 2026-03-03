'use strict'

const props = {
  align: 'center center',
  flow: 'column',
  gap: 'X',
  '> button': {
    padding: '0',
    background: 'transparent',
    fontSize: 'Z',
    display: 'none'
  }
}

export const TimePickerItem = {
  tag: 'label',
  display: 'flex',
  props,
  Button_plus: { icon: 'plus' },
  NumberInput: {
    boxSize: 'C C',
    round: 'Z',
    padding: '0',
    align: 'center center',
    textAlign: 'center',
    min: 0,
    max: 24,
    placeholder: '00',
    appearance: 'textfield',
    theme: 'field',

    '::-webkit-inner-spin-button': {
      style: { appearance: 'none' },
      margin: 0
    },
    '::-webkit-outer-spin-button': {
      style: { appearance: 'none' },
      margin: 0
    }
  },
  Button_minus: { icon: 'minus' }
}
