'use strict'

import { Field } from './Field'

export const Search = {
  extend: Field,
  props: {
    maxWidth: 'H',
    gap: 'Y2',
    padding: 'Z2 A1',
    background: 'gray .92 +8'
  },

  Icon: {
    props: {
      opacity: '.65',
      name: 'search',
      fontSize: 'B',
      margin: '0 - - -'
    }
  },

  Input: {
    props: { placeholder: 'Type a command or search' }
  }
}

export const SearchWithButton = {
  extend: Search,
  Icon: {},
  Input: { props: { ':focus ~ button': { opacity: '1' } } },

  Button: {
    props: {
      opacity: '0',
      fontSize: 'D',
      icon: 'x'
    },
    Icon: {
      on: {
        click: (e, el) => { el.parent.parent.Input.node.value = '' }
      }
    }
  }
}

export const SearchWithDropDownButton = {
  extend: SearchWithButton,
  props: {
    padding: '- A - 0',
    theme: 'tertiary',
    maxWidth: 'H+C'
  },
  DropDownButton: {
    background: 'gray',
    margin: '- Z - -'
  },
  Icon: {},
  Input: {},
  Button: {}
}
