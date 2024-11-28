'use strict'

import { Card } from './Card'
import { Hgroup } from '@symbo.ls/atoms'

export const ConvertCard = {
  extend: [Card, Hgroup],
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
    UnitValueWithTitle: {}
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
        fontSize: 'C1'
      }
    },

    DropDownButtonWithAvatar: {
      theme: 'tertiary',
      margin: '- -V'
    }
  }
}
