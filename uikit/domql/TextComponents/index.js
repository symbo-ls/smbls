'use strict'

import { Flex } from '@symbo.ls/atoms'
import { Button } from '@symbo.ls/button'
import { Checkbox } from '@symbo.ls/check'

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
  p: { props: { text: 'Didnt get the code?' } },
  underlined: {
    extend: Button,
    props: { text: 'Click to resend' }
  },

  props: {
    align: 'center flex-start',
    gap: 'Z',
    fontSize: 'Z',
    p: {
      color: '#A3A3A8',
      margin: '0'
    },
    underlined: {
      padding: '0',
      background: 'transparent',
      color: '#E0E0E2',
      cursor: 'pointer',
      textDecoration: 'underline',
      fontWeight: '500'
    }
  }
}

export const ParagrapUnderlineLinkWithCheckbox = {
  extend: Flex,
  checkBox: { extend: Checkbox },
  paragraph: { extend: ParagraphWithUnderlineButton },

  props: {
    align: 'center flex-start',
    gap: 'W',
    checkBox: {
      Flex: { boxSize: 'A+X' }
    }
  }
}

export const CheckBoxWithParagraph = {
  extend: Flex,
  checkBox: { extend: Checkbox },
  p: { props: { text: 'Keep me logged in' } },
  props: {
    align: 'center flex-start',
    gap: 'W',
    checkBox: { Flex: { boxSize: 'A+X' } },
    p: { fontSize: 'Z', margin: '0' }
  }
}
