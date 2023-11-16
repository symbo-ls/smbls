'use strict'

import { Card } from './Card'
import { TitleParagraph } from '@symbo.ls/titleparagraph'
import { Button } from '@symbo.ls/button'

export const BalanceCard = {
  extend: [Card, TitleParagraph],
  props: {
    theme: 'card .secondary',
    gap: 'Z2',
    padding: 'A A'
  },

  Title: {
    props: {
      justifyContent: 'space-between',
      gap: 'E'
    },
    caption: {
      props: {
        text: 'Total crypto assets',
        fontSize: 'Z2',
        fontWeight: '500'
      }
    },
    arrowBtn: {
      extend: Button,
      props: {
        padding: '0',
        theme: 'transparent',
        fontSize: 'D',
        color: 'caption',
        margin: '-X -W2 - -',
        Icon: { name: 'arrowUpRight' }
      }
    }
  },

  Paragraph: {
    props: {
      flow: 'column',
      align: 'flex-start flex-start',
      gap: 'A'
    },
    UnitValueWithLabel: {
      UnitValue: {},
      UnitValue2: { theme: 'card .secondary .child' }
    },
    UnitValue: {
      flow: 'row-reverse',
      color: 'paragraph',
      fontWeight: '400',
      fontSize: 'Z',
      gap: 'Y',
      Value: { text: 'an hour ago' },
      Unit: { text: 'Last update:' }
    }
  }

  // Title: {
  //   props: { gap: 'E1' },
  //   h5: { props: { text: 'Total crypto assets' } },
  //   Button: { props: { Icon: { name: 'arrowUpRight' } } }
  // },

  // Paragraph: {
  //   props: {
  //     flow: 'column',
  //     gap: 'Z1'
  //   },
  //   UnitValueWithLabel: {
  //     UnitValue: {},
  //     UnitValue2: {
  //       theme: 'card .secondary .child'
  //     }
  //   },
  //   UnitValue: {
  //     color: 'gray4',
  //     flow: 'row-reverse',
  //     justifyContent: 'flex-end',
  //     gap: 'X',
  //     fontSize: 'Z',
  //     fontWeight: '400',
  //     Unit: { text: 'Last update:' },
  //     Value: { text: 'an hour ago' }
  //   },
  //   p: null
  // }
}
