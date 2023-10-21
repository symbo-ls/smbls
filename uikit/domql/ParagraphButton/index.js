'use strict'

import { Flex } from '@symbo.ls/atoms'

export const ParagraphButton = {
  extend: Flex,
  props: {
    alignItems: 'center',
    gap: 'Y2',
    fontSize: 'Y2'
  },
  P: {
    props: {
      text: 'Didn\'t get the code?',
      color: 'gray4',
      margin: '0'
    }
  },
  Button: {
    text: 'Click to resend',
    padding: '0',
    background: 'transparent',
    color: 'white',
    textDecoration: 'underline',
    fontWeight: '500',
    Icon: { display: 'none' }
  }
}

export const ParagraphButtonWithCheckbox = {
  extend: Flex,
  tag: 'label',
  props: {
    gap: '1ch',
    alignItems: 'center'
  },
  Checkbox: {
    tag: 'div',
    props: {
      Input: {},
      Flex: { fontSize: 'A' }
    }
  },
  ParagraphButton: {
    P: { text: 'You agree to' },
    Button: { text: 'privacy policy' }
  }
}
