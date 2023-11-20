'use strict'

import { Button } from '@symbo.ls/button'

export const DatePickerYears = {
  tag: 'aside',
  props: {
    overflow: 'hidden',
    position: 'relative',

    style: {
      button: {
        padding: '0'
      }
    },

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

  if: ({ state }) => state.yearRange,

  Flex: {
    props: {
      flow: 'column',
      gap: 'B',
      padding: 'A Z A1 B',
      maxHeight: '100%',
      overflow: 'hidden auto',
      '::-webkit-scrollbar': { display: 'none' }
    },

    childExtend: {
      extend: Button,
      props: ({ state, text }) => ({
        fontSize: 'Y1',
        opacity: '.4',
        background: 'transparent',
        transition: 'opacity .25s ease',
        isSelected: state.activeYear === text,
        '.isSelected': { opacity: '1' },
        ':hover': { opacity: '1' }
      }),
      on: {
        click: (event, element, state) => state.update({
          activeYear: element.text
        }, { isHoisted: true }),
        render: (el, state) => {
          const { props } = el
          const { isSelected } = props
          if (!isSelected) return
          window.requestAnimationFrame(() => {
            el.parent.parent.node.scrollTop = el.node.offsetTop - 100
          })
        }
      }
    },

    $setPropsCollection: (element) => {
      const { yearRange } = element.state
      if (!yearRange) return

      const [start, end] = yearRange
      const yearsArray = (new Array(end + 1 - start)).fill(undefined).map((v, k) => {
        return { text: start + k }
      }).reverse()
      return yearsArray
    }
  }
}
