'use strict'

import { Flex } from '@symbo.ls/atoms'

export const TitleParagraph = {
  extend: Flex,

  props: {
    flow: 'column',
    gap: 'Y',
    maxWidth: 'fit-content'
  },

  Title: {
    tag: 'h5',
    props: {
      fontSize: 'D',
      text: 'Log in to your account'
    }
  },

  P: {
    fontSize: 'Z',
    padding: '0',
    margin: '0',
    color: '#E0E0E2',
    text: 'Enter your email address and password to log in.'
  }
}

export const ParagraphWithUnderlineButton = {
  extend: Flex,

  props: {
    align: 'center flex-start',
    gap: 'Z',
    fontSize: 'Z'
  },

  P: {
    color: '#A3A3A8',
    margin: '0',
    text: 'Didnt get the code?'
  },

  Button: {
    text: 'Click to resend',
    padding: '0',
    background: 'transparent',
    color: '#E0E0E2',
    cursor: 'pointer',
    textDecoration: 'underline',
    fontWeight: '500'
  }
}

export const ParagrapUnderlineLinkWithCheckbox = {
  extend: Flex,

  props: {
    align: 'center flex-start',
    gap: 'W'
  },

  Checkbox: {
    props: {},
    Flex: { boxSize: 'A+X' }
  },

  ParagraphWithUnderlineButton: { }
}

export const CheckBoxWithParagraph = {
  extend: Flex,

  props: {
    align: 'center flex-start',
    gap: 'W'
  },

  Checkbox: {
    props: {},
    Flex: { boxSize: 'A+X' }
  },

  P: {
    text: 'Keep me logged in',
    fontSize: 'Z',
    margin: '0'
  }
}
