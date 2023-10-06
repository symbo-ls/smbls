'use strict'

import { Flex } from '@symbo.ls/atoms'
import { Button } from '@symbo.ls/button'

export const Dialog = {
  extend: Flex,
  props: {
    theme: 'dialog',
    round: 'Z2',
    padding: '- Z - -'
  }
}

export const DialogFooter = {
  extend: Flex,
  props: {
    align: 'center flex-end',
    gap: 'X2',
    margin: 'auto - -',
    padding: 'Y2 X2'
  },

  childExtend: {
    extend: Button,
    props: {
      fontSize: 'Z',
      textTransform: 'uppercase',
      background: 'transparent',
      '@dark': {
        theme: 'primary @dark .color-only'
      },
      '@light': {
        theme: 'primary @light .color-only'
      },
      '&': {
        padding: 'Z A'
      },
      ':hover': {
        theme: 'tertiary'
      },
      ':active': {
        background: 'white .1'
      }
    }
  },

  cancel: {
    text: 'cancel'
  },
  ok: {
    text: 'ok'
  }
}
