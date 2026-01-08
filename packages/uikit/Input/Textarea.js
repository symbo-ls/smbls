'use strict'

export const Textarea = {
  tag: 'textarea',
  extend: ['Input', 'Flex'],

  props: {
    variant: 'outlined',
    fontfamily: 'Avenir',
    theme: 'field',
    round: 'Z1',
    placeholder: 'Leave us a message...',
    padding: 'A',
    theme: 'field',
    border: 'none',
    maxWidth: 'G1_default',
    minHeight: 'E_default',
    width: '100%',
    height: 'E1_default',
    fontFamily: 'inherit',
    style: { resize: 'none' }
  },

  html: (el, s) => {
    const val = el.call('exec', el.props.value, el)
    if (el.call('isString', val) && val.includes('{{')) {
      return el.call('replaceLiteralsWithObjectFields', val)
    }
    return val || ''
  }
}

export const TextareaWithButton = {
  extend: 'Flex',
  props: { gap: 'Y2' },
  Textarea: {
    height: 'C2+W',
    minWidth: 'H',
    padding: 'A',
    fontSize: 'Z1',
    round: 'Z2',
    minHeight: 'fit-content'
  },
  SquareButton: {
    background: 'blue',
    Icon: { name: 'send' }
  }
}
