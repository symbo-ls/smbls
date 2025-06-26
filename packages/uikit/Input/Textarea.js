'use strict'

export const Textarea = {
  tag: 'textarea',
  extends: ['Input', 'Flex'],

  variant: 'outlined',
  fontfamily: 'Avenir',
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
  style: { resize: 'none' },

  '.simple': {
    theme: 'field',
    round: 'Z2',
    lineHeight: 1.4
  },

  '.outlined': {
    theme: 'field',
    borderWidth: '1px',
    borderStyle: 'solid',
    lineHeight: 1.4,
    placeholder: 'Leave us a message...',
    resize: 'none'
  },

  html: (el, s) => el.props.value
}

export const TextareaWithButton = {
  display: 'flex',
  gap: 'Y2',
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
