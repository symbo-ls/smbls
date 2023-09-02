'use strict'

import { Flex } from '@symbo.ls/atoms'
import { TitleParagraph } from '@symbo.ls/textcomponents'
import { Button, CancenConfirmButtons } from '@symbo.ls/button'
import { FieldWithTitle } from '../Field'
import { IconText } from '@symbo.ls/icon'
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
  footer: { extend: Flex },

  props: {
    background: '#1C1C1F',
    padding: 'A',
    flow: 'column',
    round: 'Z+V',
    gap: 'B',
    header: {
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

export const ModalWithTitleParagraph = {
  extend: Modal,
  header: { heading: { extend: TitleParagraph } },
  props: {
    header: {
      alignItems: 'flex-start',
      heading: {
        gap: 'A',
        title: { fontSize: 'B' }
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
    content: { p: { fontSize: 'Z' } }
  }
}

export const ChangePasswordModal = {
  extend: ModalWithTitleParagraph,
  header: {},
  content: {
    childExtend: { extend: FieldWithTitle },
    ...[
      { title: { props: { text: 'Old password' } } },
      {
        title: { props: { text: 'New password' } },
        field: { input: {} },
        subTitle: {
          extend: IconText,
          props: {
            icon: { name: 'info' },
            text: '8 character minimum',
            align: 'center flex-start',
            boxSize: 'fit-content'
          }
        }
      },
      {
        title: { props: { text: 'Confirm new password' } },
        field: { input: {} },
        subTitle: {
          extend: IconText,
          props: {
            icon: { name: 'info' },
            text: '8 character minimum',
            align: 'center flex-start',
            boxSize: 'fit-content'
          }
        }
      }
    ]
  },
  footer: { 'CancenConfirmButtons.1': { ...[{}, { text: 'Reset password' }] } },

  props: {
    minWidth: 'H',
    maxWidth: 'H',
    content: {
      flow: 'column',
      gap: 'B',
      childProps: {
        field: { width: '100%' }
      }
    },
    footer: { justifyContent: 'flex-end' }
  }
}
