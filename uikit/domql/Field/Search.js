'use strict'

import { Field } from './Field'

export const Search = {
  extend: Field,
  props: {
    minHeight: 'C+A',
    maxWidth: 'H',
    gap: 'Z+W',
    padding: '- A',
    background: '#141416'
  },

  Icon: {
    props: {
      name: 'search',
      fontSize: 'D',
      margin: '0 - - -'
    }
  },
  Input: { placeholder: 'Type a command or search' }
}

export const SearchWithButton = {
  extend: Search,
  Icon: {},
  Input: { ':focus ~ button': { opacity: '1' } },
  Button: {
    opacity: '0',
    fontSize: 'D',
    icon: { name: 'x' }
  }
}

export const SearchWithDropDownButton = {
  extend: SearchWithButton,
  props: {
    padding: '- A - 0',
    background: '#1C1C1F',
    maxWidth: 'H+C'
  },
  DropDownButton: {
    background: '#141416',
    margin: '- Y - -'
  },
  Icon: {},
  Input: {},
  Button: {}
}
