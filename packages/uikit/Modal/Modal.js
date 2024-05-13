'use strict'

export const Modal = {
  extend: 'Dialog',

  props: {
    boxSize: 'fit-content',
    align: 'stretch flex-start',
    minWidth: 'G3',
    position: 'relative',
    padding: 'Z2 A2',
    round: 'A1'
  },

  ModalHeader: { extend: 'DialogHeader' }
}
