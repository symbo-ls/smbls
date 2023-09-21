'use strict'

import { Modal } from './Modal'

export const Message = {
  extend: Modal,
  props: {
    minWidth: 'G3',
    maxWidth: 'G3',
    gap: 'A'
  },

  Header: {
    Title: { h5: { props: { text: 'Message' } } },
    Paragraph: null
  },

  Content: {
    P: {
      props: {
        text: 'Yes. If you change your mind and no longer wish to keep your iPhone, you have the option to return it to us. The returned iPhone must be in good condition and in the original packaging, which contains all accessories, manuals and instructions. Returns are subject to Apple’s Sales and Refunds Policy.',
        fontSize: 'Z',
        margin: '0'
      }
    }
  }

}
