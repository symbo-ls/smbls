'use strict'

import { ConvertCard } from './ConvertCard'

export const CurrencyConvert = {
  extend: 'Flex',

  props: {
    boxSize: 'fit-content',
    gap: 'Z',
    padding: 'Z A A A',
    flow: 'column',
    theme: 'dialog',
    round: 'A1'
  },

  Title: {
    props: {
      text: 'convert',
      textTransform: 'capitalize',
      fontSize: 'A2',
      padding: '- W',
      fontWeight: '500'
    }
  },

  Cards: {
    extend: 'Flex',
    props: {
      flow: 'column',
      gap: 'A'
    },
    childExtend: {
      extend: ConvertCard,
      props: {
        theme: 'tertiary',
        Paragraph: {
          dropDownButton: { theme: 'field' }
        }
      }
    },
    ...[{}, {}]
  },

  FlexButton: {
    minWidth: '100%',
    margin: 'Z - - -',
    text: 'convert',
    textTransform: 'capitalize'
  }
}
