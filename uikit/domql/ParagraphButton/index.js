'use strict'

import { Flex } from '@symbo.ls/atoms'

export const ParagraphButton = {
  extend: Flex,
  props: {
    alignItems: 'center',
    gap: 'Y2'
  },
  P: {
    props: {
      text: 'Didn’t get the code?',
      color: 'gray2',
      margin: '0'
    }
  },
  Button: {
    text: 'Click to resend',
    padding: '0',
    background: 'transparent',
    color: 'white',
    textDecoration: 'underline'

  }
}
