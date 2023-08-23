'use strict'

import { Flex } from '@symbo.ls/atoms'
import { Button } from '@symbo.ls/button'
import { Icon } from '../Icon'
import { Avatar } from '../Avatar'

export const DropdownList = {
  extend: Flex,

  props: {
    padding: '0 Y',
    maxHeight: 'G',
    flow: 'column',
    theme: 'quaternary',
    overflow: 'hidden auto',
    style: { listStyleType: 'none' }
  },

  childExtend: {
    extend: Button,
    state: {},
    props: ({ key, state }) => ({
      active: state.active === key,
      position: 'relative',
      round: '0',
      align: 'center flex-end',
      flow: 'row-reverse',
      padding: 'Z2 C Z2 Y2',
      margin: '0',
      gap: 'Y2',
      theme: 'quaternary .child',

      ':hover': {
        style: {
          svg: { opacity: '0.5' }
        }
      },

      icon: {
        active: state.active === key,
        name: 'checkmark',
        opacity: '0.1',
        '.active': { opacity: '1' }
      },

      ':not(:first-child)': {
        '@dark': { border: 'gray4 .65, solid' },
        '@light': { border: 'gray11, solid' },
        borderWidth: '1px 0 0'
      }
    })
  }
}

export const DropdownParent = {
  props: {
    position: 'relative',
    zIndex: 999,
    style: {
      '&:hover': {
        zIndex: 1000,
        '& [dropdown]': {
          transform: 'translate3d(0,0,0)',
          opacity: 1,
          visibility: 'visible'
        }
      }
    }
  }
}

export const DropDownWithAvatar = {
  extend: Flex,
  avatar: { extend: Avatar },
  titles: {
    childExtend: { tag: 'H6' },
    ...[{ props: { text: 'eth' } }]
  },
  downArrow: {
    extend: Button,
    props: { icon: 'arrowDown' }
  },

  props: {
    boxSize: 'fit-content fit-content',
    align: 'center flex-start',
    padding: 'Y Z',
    gap: 'Z',
    round: 'Z',
    background: 'rgba(28, 28, 31, 1)',
    avatar: { boxSize: 'A+Y' },
    titles: {
      childProps: {
        fontSize: 'Z',
        textTransform: 'uppercase'
      }
    },
    downArrow: {
      padding: '0',
      background: 'transparent',
      color: 'white',
      fontSize: 'Y'
    }
  }
}
