'use strict'

import { CustomizedField } from '@symbo.ls/field'
import { Button } from '@symbo.ls/button'
import { DropDownButton } from '@symbo.ls/dropdownbutton'

export const Search = {
  extend: CustomizedField,

  Icon: { props: { name: 'search' } },
  input: {},
  x: { extend: Button, props: { icon: { name: 'x' } } },

  props: {
    padding: '- B',
    width: 'H+D',
    minHeight: 'C+A',
    gap: 'A',
    round: 'Z',
    overflow: 'hidden',

    input: {
      placeholder: 'Type a command or search',
      ':focus ~ button': { opacity: '1' }
    },

    x: {
      padding: '0',
      background: 'transparent',
      color: 'white',
      opacity: '0',
      margin: '- - - auto',
      icon: {
        fontSize: 'C'
      }
    }
  }
}

export const SearchWithDropDownButton = {
  extend: Search,
  dropDownButton: { extend: DropDownButton },
  props: {
    padding: '- B - 0',
    background: '#1C1C1F',
    dropDownButton: {
      minHeight: '100%'
    }
  }
}
