'use strict'

import { Flex } from '@symbo.ls/atoms'
<<<<<<< Updated upstream
import { TitleParagraphWithButton } from '@symbo.ls/titleparagraph'
import { Dialog } from '../Dialog'
=======
import { TitleParagraphButton } from '@symbo.ls/titleparagraph'
import { Dialog } from '@symbo.ls/dialog'
>>>>>>> Stashed changes

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
    extend: TitleParagraphButton,
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
