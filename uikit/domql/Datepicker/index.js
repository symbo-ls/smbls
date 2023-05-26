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
      background: 'linear-gradient(to bottom, rgba(20, 20, 22, 1) 0%, rgba(20, 20, 22, 0) 100%)',
      zIndex: '10'
    },
    ':after': {
      content: '""',
      boxSize: 'B 100%',
      position: 'absolute',
      bottom: '0',
      left: '0',
      background: 'linear-gradient(to top, rgba(20, 20, 22, 1) 0%, rgba(20, 20, 22, 0) 100%)'
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

const months = {
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
      background: 'linear-gradient(to right, rgba(20, 20, 22, 1) 0%, rgba(20, 20, 22, 0) 100%)',
      left: '0',
      top: '0',
      zIndex: '30',
      pointerEvents: 'none'
    },
    ':after': {
      content: '""',
      position: 'absolute',
      boxSize: '100% 100px',
      background: 'linear-gradient(to left, rgba(20, 20, 22, 1) 0%, rgba(20, 20, 22, 0) 100%)',
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

const weekDays = {
  extend: Grid,
  childExtend: {
    tag: 'span',
    extend: Flex
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

const monthNumbers = {
  extend: Grid,
  props: {
    columns: 'repeat(7, 32px)',
    gap: '4px',
    boxSizing: 'content-box',
    padding: `- ${12 / 16}em`
  },
  childExtend: {
    extend: Button,
    props: ({ state, key }) => ({
      color: 'white',
      textAlign: 'center',
      background: 'transparent',
      fontSize: 'Z1',
      round: '100%',
      height: '32px',
      ':hover': { theme: 'secondary' },
      ':nth-child(7n-1)': { color: 'rgba(255, 255, 255, .5)' },
      ':nth-child(7n)': { color: 'rgba(255, 255, 255, .5)' },
      isActive: state.activeDay === parseInt(key) + 1,
      '.isActive': { theme: 'secondary' }
    }),
    on: {
      click: (event, element, state) => {
        state.update({ activeDay: element.text })
        console.log(state.activeDay + '.' + state.activeMonth + '.' + state.activeYear)
      }
    }
  },
  $setCollection: (el, s) => {
    const daysInMonth = new Date(s.activeYear, s.activeMonth, 0).getDate()
    const days = (new Array(daysInMonth)).fill(undefined)
      .map((v, k) => ({ text: k + 1 }))
    return days
  }
}

const confirmButtons = {
  extend: Flex,
  childExtend: Button,
  ...[
    {
      text: 'cancel',
      on: {
        click: (event, element, state) => {
        }
      }
    },
    {
      text: 'ok'
    }
  ]
}

const monthNumbersContainer = {
  props: {
    maxWidth: `${272 / 16}em`,
    position: 'relative',
    ':before': {
      content: '""',
      position: 'absolute',
      boxSize: '100% 12px',
      background: 'linear-gradient(to right, rgba(20, 20, 22, 1) 0%, rgba(20, 20, 22, 0) 100%)',
      left: '0',
      top: '0',
      zIndex: '30'
    },
    ':after': {
      content: '""',
      position: 'absolute',
      boxSize: '100% 12px',
      background: 'linear-gradient(to left, rgba(20, 20, 22, 1) 0%, rgba(20, 20, 22, 0) 100%)',
      right: '0',
      top: '0',
      zIndex: '30'
    },
    content: {
      style: { overflowX: 'auto' }
    }
  },
  content: {
    extend: Flex,
    childExtend: monthNumbers,
    ...[{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}]
  }
}

const props = {
  yearRange: [1993, 2023],
  round: 'Z2',
  margin: 'E',
  overflow: 'hidden',
  maxHeight: '318px',
  boxSize: 'fit-content fit-content',
  background: '#141416',
  padding: '- Z - -',
  style: {
    button: {
      padding: '0'
    }
  },

  calendar: {
    flow: 'column',
    padding: '20px - - -',
    position: 'relative',

    weekDaysContainer: {
      overflow: 'hidden',
      padding: '- - Z1 -',
      boxSizing: 'content-box',
      maxWidth: `${272 / 16}em`,
      childProps: {
        maxWidth: 'fit-content',
        columns: 'repeat(7, 32px)',
        gap: '4px',
        boxSizing: 'content-box',
        padding: `- ${12 / 16}em`,
        childProps: {
          fontSize: 'Y1',
          textTransform: 'capitalize',
          ':nth-child(7n-1)': { color: 'rgba(255, 255, 255, .5)' },
          ':nth-child(7n)': { color: 'rgba(255, 255, 255, .5)' },
          align: 'center center'
        }
      }
    },

    confirmButtons: {
      align: 'center flex-end',
      gap: 'A1',
      padding: 'A A1 - -',
      childProps: {
        color: '#0079FD',
        fontSize: 'Y',
        textTransform: 'uppercase',
        background: 'transparent'
      }
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

  calendar: {
    extend: Flex,

    months,

    weekDaysContainer: {
      extend: Flex,
      childExtend: weekDays,
      ...[{}, {}]
    },

    monthNumbersContainer,

    confirmButtons
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
