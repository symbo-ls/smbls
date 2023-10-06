'use strict'

import { Field } from './Field'

export const Search = {
  extend: Field,
  props: {
    minHeight: 'C+A',
    maxWidth: 'H',
    gap: 'Z+W',
    padding: '- A',
    background: 'gray .92 +8'
  },

  Icon: {
    props: {
      name: 'search',
      fontSize: 'D',
      margin: '0 - - -'
    }
  },

  Input: { props: { placeholder: 'Type a command or search' } }
}

export const SearchWithButton = {
  extend: Search,
  Icon: {},
  Input: { props: { ':focus ~ button': { opacity: '1' } } },
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
    background: 'gray',
    margin: '- Y - -'
  },
  Icon: {},
  Input: {},
  Button: {}
}
