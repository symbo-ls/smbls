'use strict'

import { Modal } from './Modal'
import { UnitValue } from '@symbo.ls/unitvalue'

export const Pricing = {
  extend: Modal,

  props: {
    background: 'gray3',
    gap: 'B',
    minWidth: 'G+B',
    maxWidth: 'G+B',
    padding: 'A1'
  },

  ModalHeader: null,

  Content: {
    props: {
      flow: 'column',
      gap: 'A1'
    },
    childExtend: {
      extend: UnitValue,
      props: {
        justifyContent: 'space-between',
        textTransform: 'capitalize'
      }
    },
    ...[
      {
        Unit: { props: { text: 'subtotal' } },
        Value: { props: { text: '$5,499.00' } }
      },
      {
        Unit: { props: { text: 'Shipping' } },
        Value: { props: { text: 'Free' } }
      },
      {
        Unit: { props: { text: 'Savings' } },
        Value: { props: { text: '$1,600.00' } }
      }
    ]
  },

  ModalFooter: {
    props: {
      margin: '- -X -X'
    },
    FlexButton: {
      flex: '1',
      padding: 'Z2 -',
      round: 'Y2',
      theme: 'secondary',
      margin: '- -X -X',
      text: 'Add promo code',
      fontSize: 'Z',
      fontWeight: '500'
    }
  }
}
