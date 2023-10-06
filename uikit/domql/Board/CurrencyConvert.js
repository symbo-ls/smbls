'use strict'

import { Modal } from '@symbo.ls/modal'
import { ConvertCard } from '@symbo.ls/card'

export const CurrencyConvert = {
  extend: Modal,
  props: {
    boxSize: 'fit-content',
    minWidth: 'fit-content',
    gap: 'Z2',
    padding: 'A1'
  },

  Header: {
    Title: {
      h5: {
        props: {
          text: 'Convert',
          fontSize: 'Z1'
        }
      },
      Button: null
    },
    Paragraph: null
  },

  Content: {
    props: {
      flow: 'column',
      gap: 'Z'
    },
    childExtend: {
      extend: ConvertCard,
      props: {
        theme: 'dialog @dark .helper'
      }
    },
    ...[{}, {}]
  },

  Footer: {
    CommonButton: {
      flex: '1',
      padding: 'Z1 -',
      round: 'Z',
      Caption: { text: 'Convert', fontWeight: '500' }
    }
  }

}
