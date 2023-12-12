'use strict'

import { Field } from './Field'

export const Search = {
  extend: Field,
  tag: 'search',

  props: {
    maxWidth: 'G3',
    gap: 'Z',
    theme: 'dialog',
    padding: 'Z+V Z+V2'
  },

  Form: {
    SquareButton: {
      name: 'search',
      color: 'title',
      margin: 'V - - -'
    },

    Input: {
      props: {
        placeholder: 'type a command or search',
        '::placeholder': { color: 'paragraph' }
      }
    }
  }
}

export const SearchWithButton = {
  extend: Search,
  props: {
    Button: { fontSize: 'B' }
  },

  Form: {
    Icon: {},
    Input: { props: { ':focus ~ button': { opacity: '1' } } },

    Button: {
      props: {
        opacity: '0',
        icon: 'x'
      },
      Icon: {
        on: {
          click: (e, el) => { el.parent.parent.Input.node.value = '' }
        }
      }
    }
  }
}

export const SearchWithDropDownButton = {
  extend: SearchWithButton,
  props: {
    theme: 'tertiary',
    maxWidth: 'G3+C',
    padding: '0 A 0 0',
    gap: 'Z'
  },
  DropDownButton: {},
  Input: { props: { padding: '- - - X' } },
  Button: {},
  Icon: {}
}
