'use strict'

import { Grid } from '@symbo.ls/atoms'
import { Button } from '@symbo.ls/button'

export const DatePickerDay = {
  extend: Button,
  state: true,

  props: ({ state, key }) => {
    const rootState = state.parent.parent.parent
    const date = new Date(state._d)
    const isSelected = rootState.activeDay === date.toString()
    const gridColumnStart = 7 - state.parent.weekItems.weeks[0].dates.length
    const { moment } = state
    moment._d = date
    const isWeekend = moment.day() === 0 || moment.day() === 6
    // const isWeekend = state.moment.day() === 0 || state.moment.day() === 6
    // const isWeekend = state.moment.isWeekend

    return {
      isSelected,
      isWeekend,
      date: date.toString(),
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
      state.parent.parent.parent.update({
        activeDay: element.props.date
      })
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
    // console.warn(s.days)
    return s.days
  },

  on: {
    render: (el, state) => {
      const { key } = el
      const isSelected = state.parent.parent.activeMonth === parseInt(key)
      if (isSelected) {
        window.requestAnimationFrame(() => {
          el.node.scrollIntoView()
        })
      }
    }
  }
}
