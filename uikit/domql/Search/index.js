'use strict'

import { Focusable, Flex } from '@symbo.ls/atoms'
import { Dialog } from '@symbo.ls/dialog'


export const Search = {
  extend: Flex,
  props: {
    align: 'center space-between',
    theme: 'tertiary',
    padding: 'A1 B1',
    gap: 'A2',
    width: '100%',
    maxWidth: 'H1',
    round: 'B1',
    position: 'relative',
    maxHeight: 'C2',
    fontSize: 'A2',
    transition: 'A, defaultBezier',
    transitionProperty: 'background, color',
    
    ':focus-within': {
      '@dark': {
        background: 'gray 1 +8'
      },
      '@light': { 
        background: 'gray .15'
      }
    }
  },

  Icon: { icon: 'search' },

  Input: {
    placeholder: 'Type a command or search',
    theme: null,
    background: 'transparent',
    color: 'currentColor',
    flex: '1',
    round: 'A',
    position: 'absolute',
    boxSize: '100% 100%',
    left: '0',
    padding: '- - - C3',
    ':hover': { background: 'transparent' },
    ':focus': { background: 'transparent' },
    ':focus + button': { opacity: '1' }
  },

  Button_x: {
    icon: 'x',
    padding: 'Z2',
    background: 'transparent',
    color: 'white',
    boxSize: 'fit-content fit-content',
    opacity: '0',
    position: 'absolute',
    right: 'A1',
    Icon: {
      width: `${12 / 16}em`,
      height: `${12 / 16}em`
    }
  }
}
