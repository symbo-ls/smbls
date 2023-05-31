'use strict'

import { Flex, Grid } from '@symbo.ls/atoms'
import { Button } from '@symbo.ls/button'
import { Dialog } from '@symbo.ls/dialog'
import { HeadlessDatepicker } from 'headless-datepicker'
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

export const DatePickerYears = {
  tag: 'aside',
  props: {
    overflow: 'hidden',
    position: 'relative',

    ':before': {
      content: '""',
      boxSize: 'A1 100%',
      position: 'absolute',
      top: '0',
      left: '0',
      background: 'linear-gradient(to bottom, var(--theme-tertiary-dark-background) 0%, transparent 100%)',
      zIndex: '10'
    },
    ':after': {
      content: '""',
      boxSize: 'B 100%',
      position: 'absolute',
      bottom: '0',
      left: '0',
      background: 'linear-gradient(to top, var(--theme-tertiary-dark-background) 0%, transparent 100%)'
    }
  },

  Flex: {
    props: {
      flow: 'column',
      gap: 'B',
      padding: 'A Z A1 B1',
      maxHeight: '100%',
      overflow: 'hidden auto',
      '::-webkit-scrollbar': { display: 'none' }
    },

    childExtend: {
      extend: Button,
      props: ({ state, text }) => ({
        fontSize: 'Y1',
        color: 'white',
        opacity: '.4',
        background: 'transparent',
        transition: 'opacity .25s ease',
        isSelected: state.activeYear === text,
        '.isSelected': { opacity: '1' },
        ':hover': { opacity: '1' }
      }),
      on: {
        click: (event, element, state) => state.update({ activeYear: element.text }),
        render: (el, state) => {
          const { props } = el
          const { isSelected } = props
          if (isSelected) {
            window.requestAnimationFrame(() => {
              el.parent.parent.node.scrollTop = el.node.offsetTop - 100
            })
          }
        }
      }
    },

    $setCollection: ({ state, parent }) => {
      const { yearRange } = parent.parent.props

      if (yearRange) {
        const [start, end] = yearRange
        const yearsArray = (new Array(end + 1 - start)).fill(undefined).map((v, k) => {
          return { text: start + k }
        }).reverse()
        return yearsArray
      }

      return [
        { text: '2023' },
        { text: '2022' },
        { text: '2021' },
        { text: '2020' },
        { text: '2019' },
        { text: '2018' },
        { text: '2017' },
        { text: '2016' },
        { text: '2015' },
        { text: '2014' },
        { text: '2013' },
        { text: '2012' },
        { text: '2012' },
        { text: '2012' }
      ]
    }
  }
}

export const DatePickerMonthsSlider = {
  extend: Flex,
  props: {
    position: 'relative',
    overflow: 'hidden',
    alignItems: 'center',
    padding: '- - B -',
    maxWidth: `${272 / 16}em`,
    boxSizing: 'border-box',
    ':before': {
      content: '""',
      position: 'absolute',
      boxSize: '100% 100px',
      background: 'linear-gradient(to right, var(--theme-tertiary-dark-background) 0%, transparent 100%)',
      left: '0',
      top: '0',
      zIndex: '30',
      pointerEvents: 'none'
    },
    ':after': {
      content: '""',
      position: 'absolute',
      boxSize: '100% 100px',
      background: 'linear-gradient(to left, var(--theme-tertiary-dark-background) 0%, transparent 100%)',
      right: '0',
      top: '0',
      zIndex: '30',
      pointerEvents: 'none'
    },

    style: {
      '> button': {
        width: '16px',
        height: '16px',
        position: 'absolute',
        zIndex: '35',
        background: 'transparent',
        color: '#0079FD',
        ':first-child': { left: '18px' },
        ':last-child': { right: '18px' }
      }
    }
  },

  leftButton: {
    extend: Button,
    props: { icon: 'arrowLeft' }
  },

  Flex: {
    props: {
      flex: '1',
      overflow: 'auto hidden',
      '::-webkit-scrollbar': { display: 'none' }
    },

    childExtend: {
      tag: 'h6',
      props: ({ state, key }) => ({
        fontSize: 'Z1',
        textAlign: 'center',
        boxSizing: 'content-box',
        minWidth: '272px',

        isSelected: state.activeMonth === parseInt(key),
        '.isSelected': { opacity: '1' }
      }),

      render: (el, state) => {
        const { props } = el
        const { isSelected } = props
        if (isSelected) {
          window.requestAnimationFrame(() => {
            el.parent.parent.node.scrollLeft = el.node.offsetLeft
          })
        }
      }
    },

    $setCollection: ({ state, parent }) => {
      return [
        { text: 'January' },
        { text: 'February' },
        { text: 'March' },
        { text: 'April' },
        { text: 'May' },
        { text: 'June' },
        { text: 'July' },
        { text: 'August' },
        { text: 'September' },
        { text: 'October' },
        { text: 'November' },
        { text: 'December' }
      ]
    }
  },

  rightButton: { extend: Button, props: { icon: 'arrowRight' } }
}

export const DatePickerWeekDays = {
  extend: Grid,
  props: {
    overflow: 'hidden',
    padding: '- Z Z',
    width: '100%',
    columns: 'repeat(7, 1fr)',
    gap: 'W2'
  },
  childExtend: {
    tag: 'span',
    extend: Flex,
    props: {
      fontSize: 'Y1',
      textTransform: 'capitalize',
      align: 'center center',
      ':nth-child(7n-1), &:nth-child(7n)': { opacity: '.5' }
    }
  },
  ...[
    { text: 'Mo' },
    { text: 'Tu' },
    { text: 'We' },
    { text: 'Th' },
    { text: 'Fr' },
    { text: 'Sa' },
    { text: 'Su' }
  ]
}

export const DatePickerDay = {
  extend: Button,
  state: true,

  props: ({ state, key }) => {
    const isSelected = state.parent.activeDay === parseInt(key) + 1
    const gridColumnStart = 7 - state.parent.weekItems.weeks[0].dates.length

    return {
      isSelected,
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
        ':hover': { theme: 'secondary' },
        ':nth-child(7n-1), &:nth-child(7n)': { opacity: '.5' }
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

const monthNumbersContainer = {
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

const props = {
  yearRange: [1993, 2023],
  maxHeight: '318px',
  boxSize: 'fit-content fit-content',
  style: {
    button: {
      padding: '0'
    }
  }
}

export const DatePicker = {
  extend: [Dialog, Flex],
  state: {
    activeYear: 1993,
    activeMonth: 8,
    activeDay: 14
  },

  props,

  DatePickerYears: {},

  Flex: {
    props: {
      flow: 'column',
      padding: '20px - - -',
      position: 'relative'
    },

    DatePickerMonthsSlider: {},

    DatePickerWeekDays: {},

    monthNumbersContainer,

    DialogFooter: {}
  }
}

export const DatePickerTwoColumns = {
  extend: DatePicker,
  Flex: {
    DatePickerMonthsSlider: {
      maxWidth: `${544 / 16}em`
    },
    DatePickerWeekDays: {
      maxWidth: `${544 / 16}em`
    },
    monthNumbersContainer: {
      maxWidth: `${544 / 16}em`
    }
  }
}
