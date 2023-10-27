'use strict'

import { Modal } from './Modal'

import { CommonButton } from '@symbo.ls/button'

export const CompleteProcess = {
  extend: Modal,
  props: {
    maxWidth: 'G3',
    gap: 'B1'
  },

  Header: {
    Title: {
      h5: null,
      Button: {
        props: {
          margin: '- - - auto'
        }
      }
    },
    Paragraph: null
  },

  Content: {
    props: {
      flow: 'column',
      align: 'center flex-start',
      gap: 'B1'
    },
    SuccessIndicator: {
      fontSize: 'G'
    },
    TitleParagraph: {
      props: {
        align: 'center flex-start',
        gap: 'Z1'
      },
      Title: {
        h5: {
          props: {
            text: 'Reset complete!',
            fontSize: 'B',
            fontWeight: '700'
          }
        }
      },
      Paragraph: {
        p: {
          props: {
            text: 'Your request has been approved!',
            fontSize: 'Z'
          }
        }
      }
    }
  },
  Footer: {
    extend: CommonButton,
    props: {
      minWidth: '100%',
      fontWeight: '500'
    }
  }
}
