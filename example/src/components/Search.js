'use strict'

import { Flex, Input, Button } from "smbls"

const props = {
  border: '1px solid #313141',
  boxSize: 'fit-content fit-content',
  align: 'center space-between',
  padding: `${28 / 16}em -`,
  gap: 'A2',
  minWidth: 'H1',
  round: 'A',
  position: 'relative',
  maxHeight: 'C2',
  background: '#1C1C1F',

  searchButton: {
    padding: '0',
    background: 'transparent',
    color: 'white',
    boxSize: 'fit-content fit-content',
    position: 'absolute',
    left: 'A2',
    zIndex: '10',
  },
  input: {
    placeholder: 'Type a command or search',
    background: 'transparent',
    color: 'white',
    padding: '0',
    round: '0',
    flex: '1',
    round: 'A',
    position: 'absolute',
    boxSize: '100% 100%',
    left: '0',
    padding: `- - - ${44 / 16}em`,
    ':focus': { border: '1px solid #0474F2' },
    ':focus + button': { opacity: '1' }
  },
  xButton: {
    padding: '0',
    background: 'transparent',
    color: 'white',
    boxSize: 'fit-content fit-content',
    opacity: '0',
    position: 'absolute',
    right: 'A2',
    style: {
      '> svg': {
        width: `${12 / 16}em`,
        height: `${12 / 16}em`
      }
    }
  }
}

export const Search = {
  extend: Flex,
  props,
  searchButton: {
    extend: Button,
    props: { icon: { name: 'search'} }
  },
  class: {
    show: (event, element, state) => {
    }
  },

  input: {
    extend: Input,
    attr: { id: 'value'},
    on: {
      click: (event, element, state) => {
        state.update({activeBorder: true})
      }
    }
  },

  xButton: {
    extend: Button,
    props: { icon: 'x'}
  }
}