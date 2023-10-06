'use strict'

import { Flex } from '@symbo.ls/atoms'
import { TitleParagraphWithButton } from '@symbo.ls/titleparagraph'
import { Dialog } from '../Dialog'

export const Modal = {
  extend: Dialog,

  props: {
    flow: 'column',
    boxSize: 'fit-content fit-content',
    padding: 'A',
    gap: 'B1',
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

  Content: { extend: Flex },
  Footer: { extend: Flex }
}
