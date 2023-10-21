'use strict'

import { Modal } from './Modal'

export const CompleteProcess = {
  extend: Modal,
  props: {
    alignItems: 'center',
    gap: 'B'
  },

  Header: null,
  SuccessIndicator: {
    fontSize: 'F2',
    margin: 'B - - -'
  },

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
      color: 'gray2'
    }
  },

  CommonButton: {
    fontWeight: '500',
    minWidth: '100%',
    padding: 'A -',
    margin: 'Y1 - - -',
    round: 'Z1',
    caption: { text: 'Done' }
  }
}
