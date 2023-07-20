'use strict'

import { Flex } from '@symbo.ls/atoms'

export const Pills = {
  extend: Flex,
  props: {
    gap: 'Y2'
  },

  childExtend: {
    props: ({ key, state, parent }) => ({
      active: parseInt(key) === parseInt(state.active || parent.props.active),

      boxSize: 'Y2',
      round: 'A',

      '!active': {
        theme: 'tertiary'
      },

      '.active': {
        theme: 'primary'
      }
    }),
    on: {
      click: (e, el, s) => {
        s.update({ active: parseInt(el.key) })
      }
    }
  },

  $setCollection: ({ props, state }) => new Array(props.qty).fill({})
}
