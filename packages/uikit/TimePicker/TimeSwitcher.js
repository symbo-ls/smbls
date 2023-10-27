'use strict'

import { Flex } from '@symbo.ls/atoms'
import { Button } from '@symbo.ls/button'

const props = {
  boxSize: 'C B2',
  flow: 'column',
  overflow: 'hidden',
  round: 'Z',
  theme: 'secondary'
}

export const TimeSwitcher = {
  props,
  extend: Flex,

  childExtend: {
    extend: Button,
    props: ({ state, key }) => ({
      active: state.activeShift === key,
      padding: '0',
      flex: '1',
      width: '100%',
      fontSize: 'Y',
      textTransform: 'uppercase',
      round: '0',
      background: 'transparent',
      color: 'currentColor',
      lineHeight: '1',
      '.active': { theme: 'primary' }
    }),
    on: {
      click: (ev, { key, state }) => {
        console.log(ev, key, state)
        state.update({ activeShift: key })
      }
    }
  },

  am: { text: 'am' },
  pm: { text: 'pm' }
}
