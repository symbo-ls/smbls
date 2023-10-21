'use strict'
import { TitleParagraph } from '@symbo.ls/titleparagraph'
import { Button } from '@symbo.ls/button'
import { Dialog } from '@symbo.ls/dialog'

export const Modal = {
  extend: Dialog,

  props: {
    flow: 'column',
    boxSize: 'fit-content',
    padding: 'A',
    minWidth: 'G3',
    round: 'Z2',
    position: 'relative'
  },

  X: {
    extend: Button,
    props: {
      icon: 'x',
      fontSize: 'C',
      boxSize: 'fit-content',
      padding: '0',
      theme: 'transparent',
      position: 'absolute',
      // top: 'Z',
      // right: 'Z'
      top: 'Y2',
      right: 'Y2'
    }
  },

  Header: {
    extend: TitleParagraph,
    props: {
      gap: 'Z',
      padding: '- - - V1'
    },

    Title: {
      props: {
        fontSize: 'D',
        text: 'Title'
      }
    },

    Paragraph: {
      props: {
        fontSize: 'Z',
        padding: '- - - V1',
        color: 'gray4'
      }
    }
  }
}
