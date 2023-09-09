'use strict'

import { Button } from '@symbo.ls/button'

export const DropDownButton = {
  extend: Button,
  props: {
    gap: 'Y',
    boxSize: 'fit-content fit-content',
    padding: 'A B',
    round: 'Z',
    background: '#141416',
    color: 'white',
    icon: {
      name: 'chevronDown',
      fontSize: 'D'
    },
    text: 'All'
  }
}
