'use strict'

import { TitleParagraphWithButton } from '@symbo.ls/titleparagraph'

export const BalanceCard = {
  extend: TitleParagraphWithButton,
  props: {
    boxSize: 'fit-content',
    padding: 'Z2 A',
    round: 'Z',
    gap: 'Z1',
    background: 'linear-gradient(to right, #0474F2, #003067)'
  },

  Title: {
    props: { gap: 'E1' },
    h5: { props: { text: 'Total crypto assets' } },
    Button: { props: { icon: { name: 'arrowUpRight' } } }
  },

  Paragraph: {
    props: {
      flow: 'column',
      gap: 'Z1'
    },
    UnitValueWithLabel: {
      UnitValue: {},
      UnitValue2: {
        background: 'black .35',
        color: 'white'
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
