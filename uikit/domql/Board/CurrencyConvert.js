'use strict'

<<<<<<< Updated upstream:uikit/domql/Board/CurrencyConvert.js
import { Modal } from '@symbo.ls/modal'
import { ConvertCard } from '@symbo.ls/card'
=======
import { Card, ConvertCard } from './'
>>>>>>> Stashed changes:uikit/domql/Card/CurrencyConvertCard.js

export const CurrencyConvert = {
  extend: Card,

  props: {
    boxSize: 'fit-content',
    minWidth: 'fit-content',
    gap: 'A',
    padding: 'A'
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
      margin: '- -X2',
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
    props: {
      margin: '- -X2 -X2'
    },
    CommonButton: {
      flex: '1',
      padding: 'Z1 -',
      round: 'Z',
      Caption: { text: 'Convert', fontWeight: '500' }
    }
  }
}
