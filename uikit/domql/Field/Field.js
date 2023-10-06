'use strict'

import { Focusable } from '@symbo.ls/atoms'
import { IconText } from '@symbo.ls/icon'

export const Field = {
  tag: 'label',
  extend: [Focusable, IconText],
  props: {
    minWidth: 'G',
    maxWidth: 'G',
    minHeight: 'C+X',
    align: 'center flex-start',
    gap: 'Y+W',
    boxSizing: 'border-box',
    padding: '- Z+W',
    round: 'Y+W',
    border: '1px solid #3F3F43',
    position: 'relative',
    ':focus-within': { outline: '1px solid #0474F2' },
    Button: {
      padding: '0',
      background: 'transparent',
      color: 'white',
      margin: '- - - auto'
    }
  },

  Input: {
    props: {
      padding: '0',
      background: 'rgba(0, 0, 0, 0)',
      round: '0',
      color: 'white',
      fontFamily: 'avenir',
      placeholder: 'Placeholder',
      flex: '1',
      minHeight: '100%',
      outline: 'none !important',
      fontWeight: '400'
    }
  }
}

export const FieldTemplate = {
  extend: Field,
  Icon: { props: { name: 'info' } },
  Input: {},
  Button: { icon: { name: 'eye' } }
}
