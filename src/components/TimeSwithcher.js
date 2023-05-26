'use strict'

import { Flex, Button } from "smbls"

const props = {
  boxSize: `C ${34 / 16}em`,
  flow: 'column',
  overflow: 'hidden',
  round: 'Z',
  background: 'rgba(255, 255, 255, .15)',
  childProps: {
    padding: '0',
    background: 'transparent',
    color: 'white',
    flex: '1',
    width: '100%',
    fontSize: 'Y',
    textTransform: 'capitalize',
    round: '0'
  }
}

export const TimeSwitcher = {
  props,
  extend: Flex,

  childExtend: Button,
  ...[
    {
      text: 'am',
      on: {
        click: (event, element, state) => {
          state.update({ activeTime: true })
        }
      },
      class: {
        show: (element, state) => state.activeTime
        ? {
          background: '#0079FD',
          pointerEvents: 'none'
        }
        : {}
      }
    },
    {
      text: 'pm',
      on: {
        click: (event, element, state) => {
          state.update({ activeTime: false })
        }
      },
      class: {
        show: (element, state) => state.activeTime === false
        ? {
          background: '#0079FD',
          pointerEvents: 'none'
        }
        : {}
      }
    }
  ]
}