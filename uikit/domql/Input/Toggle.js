'use strict'

import { CheckBox, CheckBoxTitleParagraph } from './CheckBox'

export const Toggle = {
  extend: CheckBox,

  Input: {
    ':checked ~ div': {
      background: 'green2 +8',
      justifyContent: 'flex-end'
    }
  },

  Flex: {
    props: {
      boxSize: 'A+X B+Z',
      padding: '- W',
      round: 'D',
      align: 'center flex-start',
      background: 'gray .8 +68',
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

export const ToggleTitleParagraph = {
  extend: CheckBoxTitleParagraph,
  CheckBox: null,
  Toggle: {}
}
