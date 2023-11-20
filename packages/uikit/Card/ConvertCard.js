'use strict'

import { Card } from './Card'
import { TitleParagraph } from '@symbo.ls/titleparagraph'
import { UnitValueWithTitle } from '@symbo.ls/unitvalue'
import { DropDownButtonWithAvatar } from '@symbo.ls/button'

export const ConvertCard = {
  extend: [Card, TitleParagraph],
  props: {
    minWidth: 'G1_default',
    theme: 'dialog',
    round: 'Z2',
    padding: 'A Z2+V Y1 Z2+V',
    gap: 'A1'
  },
  Title: {
    props: {
      justifyContent: 'space-between',
      fontWeight: '400',
      color: 'caption'
    },
    caption: {
      props: {
        text: 'From'
      }
    },
    balance: {
      extend: UnitValueWithTitle,
      props: {
        // border: '1px sol'
      }
    }

  },
  Paragraph: {
    props: {
      align: 'center space-between',
      margin: '0',
      padding: '0'
    },
    value: {
      props: {
        text: '0.00',
        fontSize: 'E2'
      }
    },
    dropDownButton: {
      extend: DropDownButtonWithAvatar,
      props: {
        theme: 'tertiary',
        margin: '- -V'
      }
    }
  }
  // props: {
  //   boxSize: 'fit-content',
  //   gap: 'A',
  //   padding: 'Z2'
  // },
  // Title: {
  //   props: { gap: 'F' },
  //   caption: {
  //     props: {
  //       text: 'From',
  //       fontSize: 'Z1',
  //       fontWeight: '400'
  //     }
  //   },
  //   UnitValueWithTitle: { props: { fontWeight: '400' } }
  // },
  // Paragraph: {
  //   props: { align: 'center space-between' },
  //   Value: {
  //     props: {
  //       text: '0.00',
  //       fontSize: 'E2'
  //     }
  //   },
  //   DropDownButtonWithAvatar: { theme: 'card .child' }
  // }
}
