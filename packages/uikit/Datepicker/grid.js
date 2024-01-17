'use strict'

import { Grid } from '@symbo.ls/atoms'
import { DatePickerDay } from './days'
import { HeadlessDatepicker } from 'headless-datepicker'

export const calendar = new HeadlessDatepicker.Calendar({
  calendarMode: 'exact'
})

const extractMonthDays = (data) => {
  const result = []

  data.weeks.forEach((week) => {
    week.dates.forEach((date) => {
      result.push({ ...date, _d: date.moment._d.toString() })
    })
  })

  return result
}

export const DatePickerGrid = {
  extend: Grid,

  props: {
    columns: 'repeat(7, 1fr)',
    minWidth: '100%',
    gap: 'W2',
    padding: '- Z',
    style: { scrollSnapAlign: 'center' }
  },

  childExtend: DatePickerDay,
  $stateCollection: ({ state }) => state.days
}

export const DatePickerGridContainer = {
  props: {
    maxWidth: 'F3+B',
    position: 'relative',
    content: {
      overflow: 'hidden',
      style: { scrollSnapType: 'x mandatory' }
    },
    style: {
      button: {
        padding: '0'
      }
    },
    ':before': {
      content: '""',
      position: 'absolute',
      boxSize: '100% 12px',
      background: 'linear-gradient(to right, var(--theme-tertiary-dark-background) 0%, transparent 100%)',
      left: '0',
      top: '0',
      zIndex: '30'
    },
    ':after': {
      content: '""',
      position: 'absolute',
      boxSize: '100% 12px',
      background: 'linear-gradient(to left, var(--theme-tertiary-dark-background) 0%, transparent 100%)',
      right: '0',
      top: '0',
      zIndex: '30'
    }
  },

  state: ({ parent }) => {
    const state = parent.state
    if (!state.activeYear) return
    return (new Array(12)).fill(undefined).map((v, k) => {
      const year = state.activeYear
      const month = k + 1
      const weekItems = calendar.getMonth({ year, month })
      return {
        year,
        month,
        weekItems,
        days: extractMonthDays(weekItems)
      }
    })
  },

  Flex: {
    childExtend: {
      extend: DatePickerGrid,
      on: {
        render: (el, state) => {
          const { key } = el
          const isSelected = state.parent.parent.activeMonth === parseInt(key)
          if (isSelected) {
            window.requestAnimationFrame(() => {
              el.parent.parent.node.scrollTo({
                left: el.node.offsetLeft,
                behavior: state.initialized ? 'smooth' : 'instant'
              })
            })
            // if (!state.initialized) state.update({ initialized: true }, { preventUpdate: true, isHoisted: true })
          }
        }
      }
    },
    $stateCollection: ({ state }) => state.parse()
  }
}
