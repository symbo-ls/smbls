'use strict'
import { TitleParagraph } from '@symbo.ls/titleparagraph'
import { Button } from '@symbo.ls/button'
import { Dialog } from '@symbo.ls/dialog'

export const Modal = {
  extend: Dialog,

  props: {
    flow: 'column',
    boxSize: 'fit-content',
    minWidth: 'G3',
    position: 'relative',
    padding: 'Z1 Z2',
    round: 'A1'
  },

  Header: {
    extend: TitleParagraph,
    props: {
      minWidth: '100%',
      gap: 'A'
    },

    Title: {
      props: { align: 'center space-between' },
      caption: {
        props: {
          text: 'Title',
          fontSize: 'D',
          padding: 'W2 W2 - W2'
        }
      },
      x: {
        extend: Button,
        props: {
          icon: 'x',
          fontSize: 'B2',
          boxSize: 'fit-content',
          theme: 'transparent',
          padding: '0'
        }
      }
    },

    Paragraph: {
      props: {
        fontSize: 'Z',
        color: 'caption',
        padding: '- Y'
      }
    }
  }
}
