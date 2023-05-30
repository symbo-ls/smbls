'use strict'

import { Button } from '@symbo.ls/button'
import { Flex, Grid } from '@symbo.ls/atoms'

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
        isActive: state.activeYear === text,
        '.isActive': { opacity: '1' },
        ':hover': { opacity: '1' }
      }),
      on: {
        click: (event, element, state) => state.update({ activeYear: element.text }),
        render: (el, state) => {
          const { props } = el
          const { isActive } = props
          if (isActive) {
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

        isActive: state.activeMonth === parseInt(key),
        '.isActive': { opacity: '1' }
      }),

      render: (el, state) => {
        const { props } = el
        const { isActive } = props
        if (isActive) {
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
      ':nth-child(7n-1), &:nth-child(7n)': { opacity: '.5' },
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

export const DatePickerGrid = {
  extend: Grid,
  props: {
    columns: 'repeat(7, 1fr)',
    minWidth: '100%',
    gap: 'W2',
    padding: `- Z`
  },
  childExtend: {
    extend: Button,
    props: ({ state, key }) => ({
      isActive: state.activeDay === parseInt(key) + 1,
      textAlign: 'center',
      fontSize: 'Z1',
      round: '100%',
      height: 'B1',
      aspectRatio: '1/1',
      lineHeight: '.9',
      background: 'transparent',
      theme: 'secondary @dark .color',
      '.isActive': { theme: 'primary' },
      '!isActive': { 
        ':hover': { theme: 'secondary' },
        ':nth-child(7n-1), &:nth-child(7n)': { opacity: '.5' },
       },
    }),
    on: {
      click: (event, element, state) => {
        state.update({ activeDay: element.text })
        console.log(state.activeDay + '.' + state.activeMonth + '.' + state.activeYear)
      }
    }
  },
  $setPropsCollection: (el, s) => {
    const daysInMonth = new Date(s.activeYear, s.activeMonth, 0).getDate()
    const days = (new Array(daysInMonth)).fill(undefined)
      .map((v, k) => ({ text: k + 1 }))
    return days
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

  content: {
    extend: Flex,
    childExtend: DatePickerGrid,
    ...[{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}]
  }
}

const props = {
  yearRange: [1993, 2023],
  theme: 'tertiary',
  round: 'Z2',
  margin: 'E',
  overflow: 'hidden',
  maxHeight: '318px',
  boxSize: 'fit-content fit-content',
  padding: '- Z - -',
  style: {
    button: {
      padding: '0'
    }
  }
}

export const DatePicker = {
  extend: Flex,
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
      position: 'relative',
    },
    
    DatePickerMonthsSlider: {},

    DatePickerWeekDays: {},

    monthNumbersContainer,

    DialogFooter: {}
  }
}

export const DatePickerTwoColumns = {
  extend: DatePicker,
  props: {
    calendar: {
      months: {
        maxWidth: `${544 / 16}em`
      },
      weekDaysContainer: {
        maxWidth: `${544 / 16}em`
      },
      monthNumbersContainer: {
        maxWidth: `${544 / 16}em`
      }
    }
  }
}
