'use strict'

import { TitleParagraph } from '@symbo.ls/titleparagraph'

export const ConvertCard = {
  extend: TitleParagraph,
  props: {
    boxSize: 'fit-content',
    gap: 'A',
    background: 'gray',
    padding: 'Z2 A',
    round: 'Z'
  },
  Title: {
    props: { gap: 'F' },
    h5: {
      props: {
        text: 'From',
        fontSize: 'Z1',
        color: 'gray4',
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
      DropDownButtonWithAvatar: {}
    }
  }
}
