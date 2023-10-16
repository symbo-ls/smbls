'use strict'

import { Modal } from './Modal'

export const CompleteProcess = {
  extend: Modal,
  props: {
    maxWidth: 'G3+W',
    minWidth: 'G3+W',
    alignItems: 'center',
    gap: 'B',
    padding: 'Z1 Z1 Z2 Z1'
  },

  Header: {
    props: { alignSelf: 'flex-end' },
    Title: { caption: null },
    Paragraph: null
  },

  SuccessIndicator: { fontSize: 'F2' },

  TitleParagraph: {
    alignItems: 'center',
    gap: 'Y',
    Title: {
      text: 'Reset complete!',
      fontSize: 'C2'
    },
    Paragraph: {
      text: 'Your request has been approved!',
      fontSize: 'Y2',
      color: 'gray2'
    }
  },

  CommonButton: {
    minWidth: '98.7%',
    fontWeight: '500',
    padding: 'A -',
    margin: 'Y1 - - -',
    round: 'Z1',
    caption: { text: 'Done' }
  }
}
