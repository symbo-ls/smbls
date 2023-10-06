'use strict'

import { Modal } from '@symbo.ls/modal'
import { CommonForm } from './CommonForm'

export const SignUp = {
  extend: Modal,
  props: {
    minWidth: 'H+B',
    maxWidth: 'H+B',
    padding: 'A2 A2'
  },

  Header: {
    props: { gap: 'Y1' },
    Title: {
      h5: {
        props: {
          text: 'Create your account',
          fontSize: 'D1'
        }
      }
    },
    Paragraph: {
      p: {
        props: {
          text: 'Let’s get started with your 30 days free trial',
          color: 'gray4'
        }
      }
    }
  },

  Content: {
    props: { flow: 'column' },
    Form: {
      extend: CommonForm,
      props: {
        gap: 'B',
        padding: 'B - - -',
        childProps: {
          Field: {
            background: 'gray3',
            border: 'none'
          }
        }
      },
      ...[
        {
          Title: { text: 'Full name' },
          Field: { Input: { placeholder: 'Enter your full name' } }
        },
        {
          Title: { text: 'Email' },
          Field: { Input: { placeholder: 'Email address' } }
        },
        {
          Title: { text: 'Password' },
          Field: { Input: { placeholder: 'Create a password' } },
          Hint: {
            Icon: { props: { name: 'info' } },
            text: '8 characters reqired'
          }
        },
        {
          Title: { text: 'Confirm password' },
          Field: { Input: { placeholder: 'Repeat password' } },
          Hint: {
            Icon: { props: { name: 'info' } },
            text: '8 characters reqired'
          }
        }
      ]
    },
    ParagraphButtonWithCheckbox: {
      padding: 'A1 Z - W',
      Checkbox: {},
      ParagraphButton: {
        P: { text: 'You agree to' },
        Button: { text: 'Privacy Policy' }
      }
    }
  },

  Footer: {
    CommonButton: {
      flex: '1',
      round: 'Y+W',
      Caption: { text: 'Create an account' }
    }
  }

}
