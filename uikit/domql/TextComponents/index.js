'use strict'

import { Flex } from '@symbo.ls/atoms'
<<<<<<< HEAD
import { Button } from '@symbo.ls/button'
=======
>>>>>>> main

// export const TitleParagraph = {
//   extend: Flex,

//   title: {
//     tag: 'h5',
//     props: { text: 'Log in to your account' }
//   },
//   paragraph: {
//     tag: 'p',
//     props: { text: 'Enter your email address and password to log in.' }
//   },

//   props: {
//     flow: 'column',
//     gap: 'Y',
//     maxWidth: 'fit-content',
//     title: { fontSize: 'D' },
//     paragraph: {
//       fontSize: 'Z',
//       padding: '0',
//       margin: '0',
//       color: '#E0E0E2'
//     }
//   }
// }

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
<<<<<<< HEAD

  Checkbox: {
    Flex: { boxSize: 'A+X' }
  },

  ParagraphWithUnderlineButton: { },
=======
>>>>>>> main

  props: {
    align: 'center flex-start',
    gap: 'W',
    checkBox: {
    }
  }
}

export const CheckBoxWithParagraph = {
  extend: Flex,
<<<<<<< HEAD

=======
  Checkbox: {},
  p: { props: { text: 'Keep me logged in' } },
>>>>>>> main
  props: {
    align: 'center flex-start',
    gap: 'W'
  },

  Checkbox: {
    Flex: { boxSize: 'A+X' }
  },

  P: {
    fontSize: 'Z',
    margin: '0',
    text: 'Keep me logged in'
  }
}
