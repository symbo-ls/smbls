'use strict'

import { Flex } from '@symbo.ls/atoms'
import { Dialog } from '@symbo.ls/dialog'

const props = {
  border: '1px solid #313141',
  boxSize: 'fit-content fit-content',
  align: 'center space-between',
  padding: 'B1 -',
  gap: 'A2',
  minWidth: 'H1',
  round: 'A',
  position: 'relative',
  maxHeight: 'C2'
}

export const Search = {
  extend: [Flex, Dialog],
  props,

  Button: {
    icon: 'search',
    padding: '0',
    background: 'transparent',
    color: 'white',
    boxSize: 'fit-content',
    position: 'absolute',
    left: 'A2',
    zIndex: '10'
  },

  Input: {
    placeholder: 'Type a command or search',
    background: 'transparent',
    color: 'white',
    flex: '1',
    round: 'A',
    position: 'absolute',
    boxSize: '100% 100%',
    left: '0',
    padding: '- - - C1',
    ':focus + button': { opacity: '1' }
  },

  Button_x: {
    icon: 'x',
    padding: '0',
    background: 'transparent',
    color: 'white',
    boxSize: 'fit-content fit-content',
    opacity: '0',
    position: 'absolute',
    right: 'A2',
    Icon: {
      width: `${12 / 16}em`,
      height: `${12 / 16}em`
    }
  }
}
