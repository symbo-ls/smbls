'use strict'

import { Flex } from '@symbo.ls/atoms'
import { Checkbox } from './Checkbox'

export const Radio = {
  extend: Checkbox,

  Input: {
    type: 'radio',
    ':checked ~ div:after': { opacity: '1' }
  },

  Check: {
    props: {
      round: '100%',
      ':after': {
        content: '""',
        display: 'block',
        boxSize: 'Y Y',
        round: '100%',
        background: 'white',
        opacity: '0',
        transition: 'opacity .15s ease-in-out'
      }
    },
    Icon: null
  }
}

export const RadioWithTitleParagraph = {
  extend: Flex,
  props: {
    align: 'flex-start flex-start',
    gap: 'Z'
  },

  Radio: { check: { boxSize: 'A+Y A+Y' } },
  TitleParagraph: {}
}
