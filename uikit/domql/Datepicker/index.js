'use strict'

import { Flex } from '@symbo.ls/atoms'
import { Dialog } from '@symbo.ls/dialog'

export * from './days'
export * from './weekdays'
export * from './months'
export * from './years'
export * from './grid'

export const DatePicker = {
  extend: [Dialog, Flex],

  state: {
    yearRange: [1993, 2023],
    activeYear: 1993,
    activeMonth: 8,
    activeDay: 14
  },

  props: {
    width: 'fit-content',
    margin: '0',
    userSelect: 'none',
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
