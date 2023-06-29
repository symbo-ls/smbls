'use strict'

import { Flex } from '@symbo.ls/atoms'
import { Dialog } from '@symbo.ls/dialog'
import { HeadlessDatepicker } from 'headless-datepicker'
import { DatePickerGrid } from './days'

const calendar = new HeadlessDatepicker.Calendar({
  calendarMode: 'exact'
})

const extractMonthDays = (data) => {
  const result = []

  data.weeks.forEach((week) => {
    week.dates.forEach((date) => {
      result.push(date)
    })
  })

  return result
}

export const DatePickerGridContainer = {
  props: {
    maxWidth: `${272 / 16}em`,
    position: 'relative',
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
    },
    content: {
      overflow: 'auto hidden'
    }
  },

  state: (el, s) => {
    const state = el.parent.state
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

  content: {
    extend: Flex,
    childExtend: DatePickerGrid,
    $setStateCollection: (el, s) => s.parse()
  }
}

export const DatePicker = {
  extend: [Dialog, Flex],

  state: {
    yearRange: [1993, 2023],
    activeYear: 1993,
    activeMonth: 8,
    activeDay: 14
  },

  props: {
    maxHeight: 'G+B2'
  },

  DatePickerYears: {
    style: {
      button: {
        padding: '0'
      }
    }
  },

  Flex: {
    props: {
      flow: 'column',
      padding: '20px - - -',
      position: 'relative'
    },

    DatePickerMonthsSlider: {
      style: {
        button: {
          padding: '0'
        }
      }
    },

    DatePickerWeekDays: {
      style: {
        button: {
          padding: '0'
        }
      }
    },

    DatePickerGridContainer: {
      style: {
        button: {
          padding: '0'
        }
      }
    },

    DialogFooter: {}
  }
}

export const DatePickerTwoColumns = {
  extend: DatePicker,
  DatePickerYears: {},
  Flex: {
    DatePickerMonthsSlider: {
      props: {
        maxWidth: `${544 / 16}em`
      }
    },
    DatePickerWeekDays: {
      props: {
        maxWidth: `${544 / 16}em`
      }
    },
    monthNumbersContainer: {
      props: {
        maxWidth: `${544 / 16}em`
      }
    }
  }
}

export * from './years'
export * from './months'
export * from './weekdays'
export * from './days'
