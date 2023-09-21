'use strict'

import { Flex } from '@symbo.ls/atoms'
import { Modal } from '@symbo.ls/modal'
import { NumberField } from '@symbo.ls/field'
import { ParagraphButton } from '@symbo.ls/paragraphbutton'
import { CancelConfirmButtons } from '@symbo.ls/button'

export const VerificationCode = {
  extend: Modal,
  props: {
    maxWidth: 'G3',
    gap: 'A2'
  },

  Header: {
    props: { gap: 'A' },
    Title: {
      h5: {
        props: {
          text: 'Verify your email'
        }
      }
    },
    Paragraph: {
      p: {
        props: {
          text: 'Verification code has been sent to you. Enter the code below.',
          fontSize: 'Z',
          lineHeight: 'B',
          color: 'white'
        }
      }
    }
  },

  Content: {
    props: {
      flow: 'column',
      gap: 'A2'
    },
    Fields: {
      extend: Flex,
      props: {
        justifyContent: 'space-between',
        flex: '1'
      },
      childExtend: NumberField,
      ...[{}, {}, {}, {}]
    },
    ParagraphButton: { extend: ParagraphButton }
  },

  Footer: {
    props: {
      justifyContent: 'flex-end',
      padding: 'Y2 - - -'
    },
    CancelConfirmButtons: {
      extend: CancelConfirmButtons,
      ...[
        {},
        { props: { text: 'Verify' } }
      ]
    }
  }
}
