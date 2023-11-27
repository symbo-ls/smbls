'use strict'

import { FlexButton } from '@symbo.ls/button'
import { IconText } from '@symbo.ls/icon'
import { CommonForm } from './CommonForm'

export const SignUp = {
  extend: CommonForm,
  props: { minWidth: 'H' },

  ModalHeader: {
    Title: { caption: { props: { text: 'Create your account' } } },
    Paragraph: { props: { text: 'Let’s get started with your 30 days free trial' } }
  },

  Form: {
    Fields: {
      ...[
        {
          Title: { props: { text: 'Full name' } },
          Field: { Input: { props: { placeholder: 'Enter your full name' } } }
        },
        {
          Title: { props: { text: 'Email' } },
          Field: { Input: { props: { placeholder: 'Email address' } } }
        },
        {
          Title: { props: { text: 'Password' } },
          Field: { Input: { props: { placeholder: 'Create a password' } } },
          Hint: {
            extend: IconText,
            props: {
              icon: 'info',
              text: '8 character minimum'
            }
          }
        },
        {
          Title: { props: { text: 'Confirm password' } },
          Field: { Input: { props: { placeholder: 'Repeat password' } } },
          Hint: {
            extend: IconText,
            props: {
              icon: 'info',
              text: '8 character minimum'
            }
          }
        }
      ]
    },
    ParagraphButtonWithCheckbox: {
      padding: 'Z2 Z1 - Z1',
      justifyContent: 'flex-end'
    },
    Submit: {
      extend: FlexButton,
      text: 'Create an account'
    }
  }
}
