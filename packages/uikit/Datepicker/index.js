'use strict'

import { Flex } from '@symbo.ls/atoms'
import { Dialog } from '@symbo.ls/dialog'

export * from './days'
export * from './weekdays'
export * from './months'
export * from './years'
export * from './grid'

export const DatePicker = {
  extends: [Dialog, Flex],

  state: ({ props }) => {
    const date = new Date()
    const activeYear = date.getFullYear()
    const activeMonth = date.getMonth()
    const activeDay = date.getDate()
    return {
      yearRange: props.yearRange || [activeYear - 30, activeYear],
      activeYear: props.activeYear || activeYear,
      activeMonth: props.activeMonth || activeMonth,
      activeDay: props.activeDay || activeDay,
      selectedDay: props.selectedDay || null
    }
  },

  props: {
    width: 'fit-content',
    margin: '0',
    userSelect: 'none',
    maxHeight: 'G+B2'
  },

  DatePickerYears: {},

  Flex: {
    props: {
      flow: 'column',
      padding: 'A1 - - -',
      position: 'relative'
    },

    DatePickerMonthsSlider: {},

    DatePickerWeekDays: {},

    DatePickerGridContainer: {},

    DialogFooter: {}
  }
}

export const DatePickerTwoColumns = {
  extends: DatePicker,
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
