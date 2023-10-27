'use strict'

import { Flex } from '@symbo.ls/atoms'

export const Pills = {
  extend: Flex,
  props: {
    gap: 'Y2',
    childProps: {
      boxSize: 'Y2',
      round: 'A',
      theme: 'tertiary',
      '!active': { theme: 'tertiary' },
      '.active': { theme: 'primary' }
    }
  },

  childExtend: {
    props: ({ key, state, parent }) => ({
      active: parseInt(key) === parseInt(state.active || parent.props.active)
    }),
    on: {
      click: (e, el) => {
        el.state.update({ active: parseInt(el.key) })
      }
    }
  },

  $setPropsCollection: ({ props, state }) => new Array(props.qty).fill({})
}
