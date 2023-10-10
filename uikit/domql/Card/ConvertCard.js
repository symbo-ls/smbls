'use strict'

import { Card } from './Card'
import { TitleParagraphRows } from '@symbo.ls/titleparagraph'

export const ConvertCard = {
  extend: [Card, TitleParagraphRows],
  props: {
    boxSize: 'fit-content',
    gap: 'A',
    padding: 'Z2 A',
    round: 'Z'
  },
  Title: {
    props: { gap: 'F' },
    h5: {
      props: {
        text: 'From',
        fontSize: 'Z1',
        fontWeight: '400'
      }
    },
    UnitValueWithTitle: {}
  },
  Paragraph: {
    p: null,
    UnitValue: {
      props: {
        justifyContent: 'space-between',
        flex: '1'
      },
      Value: {
        props: {
          text: '0.00',
          fontSize: 'F'
        }
      },
      Unit: null,
      DropDownButtonWithAvatar: {
        theme: 'card .child'
      }
    }
  }
}
