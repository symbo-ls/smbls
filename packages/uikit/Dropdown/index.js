'use strict'

export const DropdownList = {
  extends: 'Flex',

  attr: {
    dropdown: true
  },

  padding: '0 Y',
  maxHeight: 'G',
  flow: 'column',
  theme: 'quaternary',
  overflow: 'hidden auto',
  style: { listStyleType: 'none' },
  transition: 'B defaultBezier',
  transitionProperty: 'transform, opacity, visibility',
  children: ({ props }) => props.options || [],
  childrenAs: 'props',

  '.hidden': {
    transform: 'translate3d(0,10%,0)',
    opacity: 0,
    visibility: 'hidden'
  },

  childExtends: {
    extends: 'Button',
    state: {},
    isActive: ({ key, state }) => state.active === key,
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

    Icon: {
      isActive: ({ key, state }) => state.active === key,
      name: 'checkmark',
      opacity: '0.1',
      '.active': { opacity: '1' }
    },

    ':not(:first-child)': {
      '@dark': { border: 'gray4 .65, solid' },
      '@light': { border: 'gray11, solid' },
      borderWidth: '1px 0 0'
    }
  }
}

export const DropdownParent = {
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
