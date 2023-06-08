'use strict'

import { Flex } from '@symbo.ls/atoms'

export const Pills = {
  extend: Flex,
  props: {
    gap: 'Y2'
  },

  childExtend: {
    props: (el, s) => ({
      active: parseInt(el.key) === (el.parent.props.active || s.active),

      theme: 'tertiary',
      boxSize: 'Y2',
      round: 'A',

      '.active': {
        theme: 'primary'
      }
    })
  }
}
