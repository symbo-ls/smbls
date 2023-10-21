'use strict'

import { CommonButton } from '@symbo.ls/button'
import { IconText } from '@symbo.ls/icon'
import { CommonForm } from './CommonForm'

export const SignUp = {
  extend: CommonForm,
  props: { minWidth: 'H' },

  Header: {
    Title: { props: { text: 'Create your account' } },
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
      padding: '0 Z1 - 0',
      justifyContent: 'flex-end'
    },
    Submit: {
      extend: CommonButton,
      caption: { props: { text: 'Create an account' } }
    }
  }
}
