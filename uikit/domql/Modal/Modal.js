'use strict'

import { Flex } from '@symbo.ls/atoms'
import { TitleParagraphWithButton } from '@symbo.ls/titleparagraph'

export const Modal = {
  extend: Flex,
  props: {
    flow: 'column',
    background: 'gray',
    boxSize: 'fit-content fit-content',
    round: 'Z+X',
    padding: 'A',
    minWidth: 'G3+Z1'
  },

  Header: {
    extend: TitleParagraphWithButton,
    Title: {
      h5: {
        props: {
          fontSize: 'B',
          fontWeight: '700'
        }
      },
      Button: { props: { fontSize: 'C' } }
    },

    Paragraph: {
      p: { props: { color: 'white' } }
    }
  },

  Content: { extend: [Flex] },
  Footer: { extend: Flex }
}
