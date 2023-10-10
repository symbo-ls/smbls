'use strict'

import { Card } from './Card'
import { TitleParagraphButton } from '@symbo.ls/titleparagraph'

export const BalanceCard = {
  extend: [Card, TitleParagraphButton],
  props: {
    theme: 'card .secondary'
  },

  Title: {
    props: { gap: 'E1' },
    h5: { props: { text: 'Total crypto assets' } },
    Button: { props: { Icon: { name: 'arrowUpRight' } } }
  },

  Paragraph: {
    props: {
      flow: 'column',
      gap: 'Z1'
    },
    UnitValueWithLabel: {
      UnitValue: {},
      UnitValue2: {
        theme: 'card .secondary .child'
      }
    },
    UnitValue: {
      color: 'gray4',
      flow: 'row-reverse',
      justifyContent: 'flex-end',
      gap: 'X',
      fontSize: 'Z',
      fontWeight: '400',
      Unit: { text: 'Last update:' },
      Value: { text: 'an hour ago' }
    },
    p: null
  }
}
