'use strict'

import { Modal } from '@symbo.ls/modal'
import { CancelConfirmButtons } from '@symbo.ls/button'
import { CommonForm } from './CommonForm'

export const ResetPassword = {
  extend: CommonForm,
  props: { flow: 'column' },

  ...[{
    Title: { text: 'Old password' },
    Field: {},
    Hint: null
  }, {
    Title: { text: 'New password' },
    Field: {},
    Hint: {
      Icon: { props: { name: 'info' } },
      text: '8 character minimum'
    }
  }, {
    Title: { text: 'Confirm new password' },
    Field: {},
    Hint: {
      Icon: { props: { name: 'info' } },
      text: '8 character minimum'
    }
  }]
}

export const ResetPasswordInModal = {
  extend: Modal,

  Header: {
    props: { gap: 'Z2' },
    Title: { text: 'Choose new password' },
    Paragraph: { text: 'Almost done. Enter your new password and you\'re all set' }
  },

  Content: {
    extend: ResetPassword
  },

  Footer: {
    props: { justifyContent: 'flex-end' },
    Buttons: {
      extend: CancelConfirmButtons,
      props: { childProps: { ':first-child': { border: 'none' } } },
      ...[
        { Caption: { text: 'Cancel' } },
        { Caption: { text: 'Reset password' } }
      ]
    }
  }
}
