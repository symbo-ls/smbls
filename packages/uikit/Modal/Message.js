'use strict'

import { Modal } from './Modal'

export const Message = {
  extend: Modal,

  on: {
    // init: () => { debugger }
  },

  props: {
    maxWidth: 'G3',
    padding: 'Z1 Z2 Z2 Z2'
  },

  Header: {
    Title: {
      caption: {
        props: { text: 'Message', fontSize: 'C2' }
      },
      x: {
        props: { padding: 'V2' }
      }
    },
    Paragraph: {
      props: {
        text: 'Yes. If you change your mind and no longer wish to keep your iPhone, you have the option to return it to us. The returned iPhone must be in good condition and in the original packaging, which contains all accessories, manuals and instructions. Returns are subject to Apple’s Sales and Refunds Policy.'
      }
    }
  }
}
