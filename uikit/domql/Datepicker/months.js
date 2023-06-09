'use strict'

import { Flex } from '@symbo.ls/atoms'

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

  Button_left: { icon: 'arrowLeft' },

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

  Button_right: { icon: 'arrowRight' }
}
