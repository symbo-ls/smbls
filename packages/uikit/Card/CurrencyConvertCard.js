'use strict'

import { ConvertCard } from '.'
import { Modal } from '@symbo.ls/modal'

export const CurrencyConvert = {
  extend: Modal,
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
      extend: {
        extend: 'Button',
        props: {
          theme: 'primary',
          boxSize: 'fit-content',
          padding: 'A A2',
          round: 'Z2',
          gap: 'Y2',
          position: 'relative'
        },
        Icon: {
          props: { fontSize: 'C' }
        },
        Caption: {
          props: {
            text: 'Button',
            line_height: '1em'
          }
        }
      },
      props: {
        flex: '1',
        padding: 'Z1 -',
        round: 'Z',
        Caption: { text: 'Convert', fontWeight: '500' }
      }
    }
  }

}
