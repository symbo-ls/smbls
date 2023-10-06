'use strict'

import { Modal } from './Modal'
import { UnitValue } from '@symbo.ls/unitvalue'

export const Pricing = {
  extend: Modal,
  props: {
    background: 'gray3',
    gap: 'A',
    minWidth: 'G+B',
    maxWidth: 'G+B',
    padding: 'A'
  },

  Header: null,
  Content: {
    props: {
      flow: 'column',
      gap: 'A'
    },
    childExtend: {
      extend: UnitValue,
      props: {
        justifyContent: 'space-between',
        textTransform: 'capitalize',
        color: 'white'
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

  Footer: {
    CommonButton: {
      flex: '1',
      padding: 'Z2 -',
      round: 'Y2',
      background: 'gray',
      Caption: {
        text: 'Add promo code',
        fontSize: 'Z',
        fontWeight: '500'
      }
    }
  }
}
