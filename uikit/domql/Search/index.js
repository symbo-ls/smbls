'use strict'

import { Flex } from '@symbo.ls/atoms'
import { Input } from '@symbo.ls/input'
import { Icon } from '@symbo.ls/icon'
import { Button } from '@symbo.ls/button'

export const Search = {
  extend: Flex,

  props: {
    align: 'center space-between',
    padding: 'A1 B1',
    gap: 'A2',
    width: '100%',
    position: 'relative',
    maxHeight: 'C2',
    fontSize: 'A2',
    transition: 'A, defaultBezier',
    transitionProperty: 'background, color, outline, max-width',
    maxWidth: 'H',
    round: 'B1',
    theme: 'tertiary',

    ':focus-within': {

    }
  },

  Icon: {
    extend: Icon,
    props: { icon: 'search' }
  },

  Input: {
    extend: Input,
    props: {
      placeholder: 'Type a command or search',
      theme: null,
      background: 'transparent',
      color: 'currentColor',
      flex: '1',
      position: 'absolute',
      boxSize: '100% 100%',
      left: '0',
      padding: '- - - C3',
      ':hover': { background: 'transparent' },
      ':focus': { background: 'transparent' },
      ':focus ~ button': { opacity: '1' },
      ':focus ~ svg': { opacity: '0' }
    }
  },

  x: {
    extend: Button,
    props: {
      icon: 'x',
      padding: 'Z2',
      background: 'transparent',
      color: 'white',
      opacity: '0',
      position: 'absolute',
      right: 'A1',
      Icon: {
        width: 'X2',
        height: 'X2'
      }
    }
  }
}
