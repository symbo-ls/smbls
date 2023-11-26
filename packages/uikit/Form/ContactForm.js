'use strict'

import { CommonButton } from '@symbo.ls/button'
import { TextAreaField } from '@symbo.ls/field'
import { CommonForm } from './CommonForm'

export const ContactForm = {
  extend: CommonForm,

  Header: {
    Title: { caption: { props: { text: 'We’d love to help' } } },
    Paragraph: { props: { text: 'Reach out and we’ll get in touch within 24 hours.' } }
  },

  Form: {
    Fields: {
      props: { columns: 'repeat(2, 1fr)' },
      ...[
        {
          props: { gridColumn: '1' },
          Title: { props: { text: 'First name' } },
          Field: { Input: { props: { placeholder: 'First name' } } }
        },
        {
          props: { gridColumn: '2' },
          Title: { props: { text: 'Last name' } },
          Field: { Input: { props: { placeholder: 'Last name' } } }
        },
        {
          props: { gridColumn: '1 / span 2' },
          Title: { props: { text: 'Email' } },
          Field: { Input: { props: { placeholder: 'example@email.com' } } }
        },
        {
          props: { gridColumn: '1 / span 2' },
          Title: { props: { text: 'Message' } },
          Field: {
            extend: TextAreaField
          }
        }
      ]
    },
    ParagraphButtonWithCheckbox: { padding: 'Z1 Z - Z' },
    Submit: {
      extend: CommonButton,
      text: 'Send message'
    }
  }
}
