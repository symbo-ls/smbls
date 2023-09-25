'use strict'

import { Modal } from './Modal'

export const Message = {
  extend: Modal,
  props: {
    maxWidth: 'G3',
    gap: 'A'
  },

  Header: {
    props: { gap: 'A' },
    Title: { h5: { text: 'Message' } },
    Paragraph: {
      p: {
        props: {
          text: 'Yes. If you change your mind and no longer wish to keep your iPhone, you have the option to return it to us. The returned iPhone must be in good condition and in the original packaging, which contains all accessories, manuals and instructions. Returns are subject to Apple’s Sales and Refunds Policy.',
          lineHeight: '1.4em'
        }
      }
    }
  },
  Content: null,
  Footer: null

}
