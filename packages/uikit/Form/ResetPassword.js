'use strict'

import { CancelConfirmButtons } from '@symbo.ls/button'
import { IconText } from '@symbo.ls/icon'
import { CommonForm } from './CommonForm'

export const ResetPassword = {
  extend: CommonForm,
  props: { minWidth: 'G3+D' },

  ModalHeader: {
    Title: { caption: { props: { text: 'Choose new password' } } },
    Paragraph: { props: { text: 'Almost done. Enter your new password and you’re all set' } }
  },

  Form: {
    Fields: {
      ...[{
        Title: { props: { text: 'Old password' } },
        Field: {}
      }, {
        Title: { props: { text: 'New password' } },
        Field: {},
        Hint: {
          extend: IconText,
          props: {
            icon: 'info',
            text: '8 character minimum'
          }
        }
      }, {
        Title: { props: { text: 'Confirm new password' } },
        Field: {},
        Hint: {
          extend: IconText,
          props: {
            icon: 'info',
            text: '8 character minimum'
          }
        }
      }]
    },

    Submit: {
      extend: CancelConfirmButtons,
      props: { justifyContent: 'flex-end' },
      ...[
        { Text: 'Cancel' },
        { Text: 'Reset password' }
      ]
    }
  }
}
