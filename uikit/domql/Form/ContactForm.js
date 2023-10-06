'use strict'

import { Modal } from '@symbo.ls/modal'
import { CommonForm } from './CommonForm'

export const ContactForm = {
  extend: Modal,
  props: {
    minWidth: 'H+B',
    maxWidth: 'H+B',
    padding: 'B A'
  },

  Header: {
    props: {
      gap: 'Y2',
      padding: '- - B1 W'
    },
    Title: {
      h5: {
        props: {
          text: 'We’d love to help',
          fontSize: 'D1'
        }
      }
    },
    Paragraph: {
      p: {
        props: {
          text: 'Reach out and we’ll get in touch within 24 hours.',
          color: 'gray4'
        }
      }
    }
  },

  Content: {
    props: { flow: 'column' },
    Form: {
      extend: CommonForm,
      props: { columns: 'repeat(2, 1fr)' },
      ...[
        {
          Title: { text: 'First name' },
          Field: { Input: { placeholder: 'First name' } },
          Hint: null
        },
        {
          Title: { text: 'Last name' },
          Field: { Input: { placeholder: 'Last name' } },
          Hint: null
        },
        {
          props: { gridColumn: '1 / span 2' },
          Title: { text: 'Email' },
          Field: { Input: { placeholder: 'example@email.com' } },
          Hint: null
        },
        {
          props: { gridColumn: '1 / span 2' },
          Title: { text: 'Message' },
          Field: null,
          Textarea: {},
          Hint: null
        }
      ]
    },

    ParagraphButtonWithCheckbox: {
      padding: 'A1 Z A1 Y',
      Checkbox: {},
      ParagraphButton: {
        P: { text: 'You agree to' },
        Button: { text: 'privacy policy' }
      }
    }
  },

  Footer: {
    Button: {
      text: 'Send message',
      theme: 'primary',
      flex: '1',
      round: 'Y+W',
      fontWeight: '500',
      padding: 'A -'
    }
  }
}
