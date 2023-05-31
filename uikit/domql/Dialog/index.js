'use strict'

import { Button } from '@symbo.ls/button'
import { Flex } from '@symbo.ls/atoms'

export const Dialog = {
  props: {
    theme: 'tertiary',
    round: 'Z2',
    margin: 'E',
    overflow: 'hidden',
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
      theme: 'primary @dark .color-only',
      fontSize: 'Z1',
      textTransform: 'uppercase',
      background: 'transparent',
      '&': {
        padding: 'Z A'
      },
      ':hover': {
        background: 'white .065'
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
