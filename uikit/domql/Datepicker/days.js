'use strict'

import { Grid } from '@symbo.ls/atoms'
import { Button } from '@symbo.ls/button'

export const DatePickerDay = {
  extend: Button,
  state: true,

  props: ({ state, key }) => {
    const isSelected = state.parent.parent.activeDay === parseInt(key) + 1
    const gridColumnStart = 7 - state.parent.weekItems.weeks[0].dates.length
    const isWeekend = state.moment.isoWeekday()
    // const isWeekend = state.moment.isWeekend

    return {
      isSelected,
      isWeekend,
      textAlign: 'center',
      fontSize: 'Z1',
      round: '100%',
      height: 'B1',
      aspectRatio: '1/1',
      lineHeight: '.9',
      background: 'transparent',
      theme: 'secondary @dark .color',
      text: parseInt(key) + 1,
      ':first-child': {
        style: { gridColumnStart }
      },
      '.isSelected': { theme: 'primary' },
      '!isSelected': {
        '.isWeekend': { opacity: '.5' },
        ':hover': { theme: 'secondary' }
      }
    }
  },

  on: {
    click: (event, element, state) => {
      state.parent.parent.update({
        active: state.parse()
      })
      console.log(state)
    }
  }
}

export const DatePickerGrid = {
  extend: Grid,

  props: {
    columns: 'repeat(7, 1fr)',
    minWidth: '100%',
    gap: 'W2',
    padding: '- Z'
  },

  childExtend: DatePickerDay,

  $setStateCollection: (el, s) => {
    return s.days
  }
}
