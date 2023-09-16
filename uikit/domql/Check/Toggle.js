'use strict'

import { Flex } from '@symbo.ls/atoms'
import { Checkbox } from './Checkbox'

export const Toggle = {
  extend: Checkbox,

  Input: {
    ':checked ~ div': {
      background: '#47FF09',
      justifyContent: 'flex-end'
    }
  },

  check: {
    props: {
      boxSize: 'A+X B+Z',
      padding: '- W',
      round: 'D',
      align: 'center flex-start',
      background: '#CFCFD1',
      border: 'none',
      transition: 'opacity .15s ease',
      ':after': {
        content: '""',
        boxSize: 'A A',
        round: '100%',
        background: 'white',
        boxShadow: '1px, 1px, Z, gray .2'
      }
    },
    Icon: null
  }
}

export const ToggleWithTitleParagraph = {
  extend: Flex,
  props: {
    align: 'flex-start flex-start',
    gap: 'Z'
  },

  Toggle: {},
  TitleParagraph: {}
}
