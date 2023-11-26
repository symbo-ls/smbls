'use strict'

import { Modal } from './Modal'

export const CompleteProcess = {
  extend: Modal,
  props: {
    alignItems: 'center',
    gap: 'B',
    padding: 'A A A+V A'
  },

  Header: {
    Title: {
      caption: null,
      x: { props: { margin: '- - - auto' } }
    },
    Paragraph: null
  },

  SuccessIndicator: { fontSize: 'F2' },

  TitleParagraph: {
    alignItems: 'center',
    gap: 'Y',
    Title: {
      text: 'Reset complete!',
      fontSize: 'D1'
    },
    Paragraph: {
      text: 'Your request has been approved!',
      fontSize: 'Z',
      color: 'title'
    }
  },

  CommonButton: {
    minWidth: '100%',
    margin: 'Y - - -',
    text: 'Done',
    fontWeight: '500'
  }
}
