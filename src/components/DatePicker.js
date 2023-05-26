'use strict'

import { Grid } from "@symbo.ls/atoms"
import { Flex, Button } from "smbls"


function sideScroll (element, direction, speed, distance, step) {
  var scrollAmount = 0
  var slideTimer = setInterval(function () {
    if (direction === 'left') {
      element.scrollLeft -= step
    } else {
      element.scrollLeft += step
    }
    scrollAmount += step
    if (scrollAmount >= distance) {
      window.clearInterval(slideTimer)
    }
  }, speed)
}

const years = {
  tag: 'aside',
  content: {
    extend: Flex,
    childExtend: Button,
    ...[
      { props: { text: '2023' } },
      { props: { text: '2022' } },
      { props: { text: '2021' } },
      { props: { text: '2020' } },
      { props: { text: '2019' } },
      { props: { text: '2018' } },
      { props: { text: '2017' } },
      { props: { text: '2016' } },
      { props: { text: '2015' } },
      { props: { text: '2014' } },
      { props: { text: '2013' } },
      { props: { text: '2012' } },
      { props: { text: '2012' } },
      { props: { text: '2012' } },
    ]
  }
}

const months = {
  extend: Flex,
  leftButton: {
     extend: Button, props: { icon: 'arrowLeft' }
    },
  content: {
    extend: Flex,
    childExtend: { tag: 'h6' },
    ...[
      { text: 'january' },
      { text: 'february' },
      { text: 'march' },
      { text: 'april' },
      { text: 'may' },
      { text: 'june' },
      { text: 'july' },
      { text: 'august' },
      { text: 'september' },
      { text: 'october' },
      { text: 'november' },
      { text: 'december' }
    ]
  },
  rightButton: { extend: Button, props: { icon: 'arrowRight' } },
}

const weekDays = {
  extend: Grid,
  childExtend: {
    tag: 'span',
    extend: Flex
  },
  ...[
    { text: 'mo' },
    { text: 'tu' },
    { text: 'we' },
    { text: 'th' },
    { text: 'fr' },
    { text: 'sa' },
    { text: 'su' }
  ]
}

const monthNumbers = {
  extend: Grid,
  childExtend: { extend: Button },
  ...[
    { text: '1' },
    { text: '2' },
    { text: '3' },
    { text: '4' },
    { text: '5' },
    { text: '6' },
    { text: '7' },
    { text: '8' },
    { text: '9' },
    { text: '10' },
    { text: '11' },
    { text: '12' },
    { text: '13' },
    { text: '14' },
    { text: '15' },
    { text: '16' },
    { text: '17' },
    { text: '18' },
    { text: '19' },
    { text: '20' },
    { text: '21' },
    { text: '22' },
    { text: '23' },
    { text: '24' },
    { text: '25' },
    { text: '26' },
    { text: '27' },
    { text: '28' },
    { text: '29' },
    { text: '30' }
  ]
}

const confirmButtons = {
  extend: Flex,
  childExtend: Button,
  ...[
    {
      text: 'cancel',
      on: {
        click: (event, element, state) => {
          const content = document.getElementById('tabsContent')
          sideScroll(content, 'left', 30, 300, 30)
        }
      }
    },
    {
      text: 'ok'
    }
  ]
}

const props = {
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

  sideBar: {
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
      background: 'red',
      background: 'linear-gradient(to top, rgba(20, 20, 22, 1) 0%, rgba(20, 20, 22, 0) 100%)'
    },
    content: {
      flow: 'column',
      gap: 'B',
      padding: `${26 / 16}em ${12 / 16}em A1 B1`,
      maxHeight: '100%',
      style: { overflowY: 'auto', '::-webkit-scrollbar': { display: 'none' } },
      childProps: {
        fontSize: 'Y1',
        color: 'white',
        opacity: '.4',
        background: 'transparent',
        transition: 'opacity .25s ease',
        ':hover': { opacity: '1' }
      }
    }
  },

  calendar: {
    flow: 'column',
    padding: '20px - - -',
    position: 'relative',
    months: {
      position: 'relative',
      overflow: 'hidden',
      alignItems: 'center',
      padding: '- - B -',
      maxWidth: `${272 / 16}em`,
      boxSizing: 'border-box',
      position: 'relative',
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
      },
      content: {
        flex: '1',
        style: { overflowX: 'auto', '::-webkit-scrollbar': { display: 'none' } },
        childProps: {
          fontSize: 'Z1',
          textTransform: 'capitalize',
          textAlign: 'center',
          boxSizing: 'content-box',
          minWidth: '272px'
        }
      }
    },

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

    monthNumbersContainer: {
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
        style: { overflowX: 'auto' },
        childProps: {
          columns: 'repeat(7, 32px)',
          gap: '4px',
          boxSizing: 'content-box',
          padding: `- ${12 / 16}em`,
          childProps: {
            color: 'white',
            textAlign: 'center',
            background: 'transparent',
            fontSize: 'Z1',
            ':hover': { background: '#0079FD' },
            ':nth-child(7n-1)': { color: 'rgba(255, 255, 255, .5)' },
            ':nth-child(7n)': { color: 'rgba(255, 255, 255, .5)' },
            round: '100%',
            height: '32px'
          }
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
  props,

  sideBar: { extend: years },
  calendar: {
    extend: Flex,
    months,

    weekDaysContainer: {
      extend: Flex,
      childExtend: weekDays,
      ...[{}, {}]
    },

    monthNumbersContainer: {
      // extend: Flex,
      content: {
        extend: Flex,
        childExtend: monthNumbers,
        ...[{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}]
      }
    },

    confirmButtons
  }
}

export const DatePickerTwoColumns = {
  extend: DatePicker,
  props: {

  }
}