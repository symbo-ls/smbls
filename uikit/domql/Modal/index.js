'use strict'

import { Flex } from '@symbo.ls/atoms'
import { TitleParagraph } from '@symbo.ls/textcomponents'
import { FieldWithTitle } from '@symbo.ls/field'
import { Button } from '@symbo.ls/button'
import { Icon } from '@symbo.ls/icon'
import { CheckMark } from '@symbo.ls/accessories'

export const Modal = {
  extend: Flex,
  header: {
    extend: Flex,
    close: {
      extend: Button,
      props: { icon: 'x' }
    }
  },
  content: { extend: Flex },
  footer: {},

  props: {
    background: '#1C1C1F',
    padding: 'A',
    flow: 'column',
    round: 'Z+V',
    header: {
      alignItems: 'center',
      title: { fontSize: 'B' },
      close: {
        margin: '- - - auto',
        background: 'transparent',
        color: 'white',
        fontSize: 'D',
        padding: '0'
      }
    }
  }
}

export const ResetCompleteModal = {
  extend: Modal,

  header: {},
  content: {
    icon: { extend: CheckMark },
    titleParagraph: {
      extend: TitleParagraph,
      title: { props: { text: 'Reset complete!' } },
      paragraph: { props: { text: 'Your request has been approved!' } }
    }
  },
  footer: {
    button: {
      extend: Button,
      props: { text: 'Done' }
    }
  },

  props: {
    minWidth: 'G+E',
    maxWidth: 'G+E',
    gap: 'B',
    content: {
      flow: 'column',
      align: 'center center',
      gap: 'B',
      titleParagraph: {
        align: 'center center',
        title: { fontSize: 'B' }
      }
    },
    footer: {
      minWidth: '100%',
      button: {
        background: '#0474F2',
        color: 'white',
        minWidth: '100%',
        padding: 'A -',
        round: 'A'
      }
    }
  }
}

export const MessageModal = {
  extend: Modal,

  header: {
    title: {
      tag: 'h5',
      props: { text: 'Message' }
    },
    close: {}
  },
  content: {
    p: {
      props: { text: 'Yes. If you change your mind and no longer wish to keep your iPhone, you have the option to return it to us. The returned iPhone must be in good condition and in the original packaging, which contains all accessories, manuals and instructions. Returns are subject to Apples Sales and Refunds Policy.' }
    }
  },
  footer: null,

  props: {
    minWidth: 'G+E',
    maxWidth: 'G+E',
    content: {
      p: { fontSize: 'Z' }
    }

  }
}
