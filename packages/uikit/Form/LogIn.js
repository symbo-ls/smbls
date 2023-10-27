'use strict'

import { Flex } from '@symbo.ls/atoms'
import { CommonButton } from '@symbo.ls/button'
import { SocialLink } from '@symbo.ls/sociallink'
import { CommonForm } from './CommonForm'

export const LogIn = {
  extend: CommonForm,
  props: { minWidth: 'G3+C1' },

  Header: {
    Title: { caption: { props: { text: 'Log in to your account' } } },
    Paragraph: { props: { text: 'Enter your email address and password to log in.' } }
  },

  Form: {
    props: {
      ParagraphButtonWithCheckbox: { margin: 'A -' }
    },
    Fields: {
      ...[
        {
          Title: { props: { text: 'Email' } },
          Field: { Input: { props: { placeholder: 'Enter your email' } } }
        },
        {
          Title: { props: { text: 'Password' } },
          Field: {
            Icon: null,
            Input: { props: { placeholder: 'Enter your password' } },
            Button: { props: { icon: 'eye' } }

          }
        }
      ]
    },
    ParagraphButtonWithCheckbox: {
      padding: '- Y1',
      Checkbox: {},
      ParagraphButton: {
        flex: '1',
        justifyContent: 'space-between',
        P: { text: 'Keep me logged in' },
        Button: {
          text: 'Forgot your password?',
          fontWeight: '400',
          textDecoration: 'none'
        }
      }
    },
    Submit: {
      extend: CommonButton,
      props: { margin: 'A - - -' },
      caption: { props: { text: 'Sign in' } }
    }
  },

  DoubleHr: {},
  Footer: {
    extend: Flex,
    props: {
      flow: 'column',
      gap: 'Z2'
    },
    childExtend: {
      extend: SocialLink,
      props: {
        minWidth: '100%',
        color: 'gray4'
      }
    },
    ...[{}, {}]
  }
}
