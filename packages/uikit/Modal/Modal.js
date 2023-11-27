'use strict'

import { TitleParagraph } from '@symbo.ls/titleparagraph'
import { Dialog } from '@symbo.ls/dialog'

export const Modal = {
  extend: Dialog,

  props: {
    flow: 'column',
    boxSize: 'fit-content',
    align: 'stretch flex-start',
    minWidth: 'G3',
    position: 'relative',
    padding: 'Z2 A2',
    round: 'A1'
  },

  ModalHeader: {
    extend: TitleParagraph,
    props: {
      minWidth: '100%',
      gap: 'A'
    },

    Title: {
      props: { align: 'center space-between' },
      Text: {
        text: 'Title'
      },
      SquareButton_x: {
        icon: 'x',
        theme: 'transparent'
      }
    },

    Paragraph: {
      props: {
        color: 'caption'
      }
    }
  }
}
