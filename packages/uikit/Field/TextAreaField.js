'use strict'

export const TextAreaField = {
  tag: 'label',
  extend: 'Focusable',
  props: {
    boxSize: 'fit-content',
    border: 'solid, gray .45 +80',
    borderWidth: '.8px',
    overflow: 'hidden',
    round: 'Z1',
    ':focus-within': { outline: '1px solid #0474F2' }
  },
  TextArea: {
    tag: 'textarea',
    attr: { placeholder: 'Leave us a message...' },
    props: {
      minWidth: 'H',
      minHeight: 'D2+Y1',
      padding: 'A',
      fontFamily: 'avenir',
      theme: 'transparent',
      border: 'none',
      outline: 'none',
      style: { resize: 'none' },
      '::placeholder': { color: 'gray 1 +64' }
    }
  }
}
