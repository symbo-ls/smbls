'use strict'

import { Focusable } from '@symbo.ls/atoms'
import { Input } from '@symbo.ls/input'

export const CheckBox = {
  extend: Focusable,
  tag: 'label',

  props: {
    padding: 'Z',
    round: '100%',
    boxSize: 'fit-content',
    ':hover': { background: 'gray .1' },
    ':active': { background: 'gray .35' }
  },

  state: ({ props }) => ({
    checked: props.checked
  }),

  Input,
  Flex: {
    props: {
      align: 'center center',
      boxSize: 'B',
      round: 'Y',
      transition: 'Z defaultBezier',
      transitionProperty: 'background, color, border',
      borderWidth: '1px',
      borderStyle: 'solid',
      '@dark': { color: 'white' },
      '@light': { color: 'black' },
      '.checked': {
        theme: 'primary',
        borderColor: 'transparent'
      },
      '!checked': {
        '@dark': { borderColor: 'white' },
        '@light': { borderColor: 'black' }
      }
    },
    Icon: {
      height: 'Z Z2',
      name: 'check',
      opacity: '0',
      transition: 'opacity A defaultBezier',
      '.checked': {
        opacity: '1'
      }
    }
  }
}
