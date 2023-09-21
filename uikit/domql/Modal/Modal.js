'use strict'

import { Flex } from '@symbo.ls/atoms'
import { TitleParagraphWithButton } from '@symbo.ls/titleparagraph'

export const Modal = {
  extend: Flex,
  props: {
    flow: 'column',
    background: 'gray3',
    boxSize: 'fit-content fit-content',
    round: 'Z+X',
    padding: 'A',
    minWidth: 'G3'
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
    }
  },
  Content: { extend: Flex },
  Footer: { extend: Flex }
}
