'use strict'

import { CustomizedField } from '@symbo.ls/field'
import { Button } from '@symbo.ls/button'

export const Search = {
  extend: CustomizedField,
  Icon: { props: { name: 'search' } },
  input: {},
  x: {
    extend: Button,
    props: { icon: 'x' }
  },

  props: {
    padding: '- A',
    gap: 'Z',
    round: 'Z',
    width: 'H',

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
      Icon: {
        width: 'X2',
        height: 'X2'
      }
    }
  }
}
