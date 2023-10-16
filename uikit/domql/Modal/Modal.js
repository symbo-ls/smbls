'use strict'
import { TitleParagraph } from '@symbo.ls/titleparagraph'
import { Button } from '@symbo.ls/button'
import { Dialog } from '@symbo.ls/dialog'

export const Modal = {
  extend: Dialog,

  props: {
    flow: 'column',
    boxSize: 'fit-content',
    padding: 'Z1',
    minWidth: 'G3+Z1'
  },

  Header: {
    extend: TitleParagraph,
    props: { gap: 'Y2' },
    Title: {
      props: { align: 'center space-between' },
      caption: {
        props: {
          text: 'Title',
          fontSize: 'C',
          fontWeight: '700'
        }
      },
      closeBtn: {
        extend: Button,
        props: {
          icon: 'x',
          padding: '0',
          boxSize: 'fit-content',
          theme: 'transparent',
          fontSize: 'B1',
          margin: '- - - auto'
        }
      }
    },
    Paragraph: {
      props: {
        fontSize: 'Z',
        color: 'gray4'
      }
    }
  }
}
