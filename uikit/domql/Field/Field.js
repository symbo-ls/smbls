'use strict'

import { IconText } from '@symbo.ls/icon'

export const Field = {
  extend: IconText,
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
    overflow: 'hidden',
    position: 'relative',
    Button: {
      padding: '0',
      background: 'transparent',
      color: 'white',
      margin: '- - - auto'
    }
  },

  Input: {
    padding: '0',
    background: 'transparent',
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

export const FieldTemplate = {
  extend: Field,
  Icon: { props: { name: 'info' } },
  Input: {},
  Button: { icon: { name: 'eye' } }
}
