'use strict'

export const CompleteProcess = {
  extend: 'Modal',

  props: {
    align: 'center',
    gap: 'B'
  },

  ModalHeader: {
    Title: {
      Text: null,
      SquareButton_x: { margin: '- - - auto' }
    },
    Paragraph: null
  },

  SuccessIndicator: { fontSize: 'D' },

  Hgroup: {
    alignItems: 'center',
    gap: 'Y',
    Title: {
      text: 'Reset complete!'
    },
    Paragraph: {
      text: 'Your request has been approved!'
    }
  },

  FlexButton: {
    minWidth: '100%',
    margin: 'Y - - -',
    fontWeight: '500',
    Text: { text: 'Done' }
  }
}
