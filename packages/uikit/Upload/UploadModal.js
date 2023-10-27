'use strict'

import { Flex } from '@symbo.ls/atoms'
import { IconText } from '@symbo.ls/icon'
import { CancelConfirmButtons } from '@symbo.ls/button'
import { UploadButtonWithBackground } from './UploadButton'
import { Modal } from '@symbo.ls/modal'

export const UploadFooter = {
  extend: Flex,
  props: {
    gap: 'E',
    align: 'center space-between',
    boxSize: 'fit-content'
  },

  IconText: {
    extend: IconText,
    props: {
      icon: 'info',
      text: 'Support',
      gap: 'Y',
      fontSize: 'Z',
      fontWeight: '400'
    }
  },

  Buttons: {
    extend: CancelConfirmButtons,
    props: {
      childProps: {
        padding: 'Z2 A1',
        ':first-child': {
          theme: 'tertiary',
          padding: '- A1'
        },
        caption: {
          fontSize: 'Z2',
          fontWeight: '400',
          letterSpacing: '.3px'
        }
      }
    },
    ...[
      { caption: { props: { text: 'Cancel' } } },
      {
        extend: UploadButtonWithBackground,
        caption: { props: { text: 'Attach file' } }
      }
    ]
  }
}

export const UploadModal = {
  extend: Modal,
  props: {
    gap: 'A',
    round: 'A1',
    padding: 'A'
  },

  Header: {
    Title: {
      caption: {
        props: {
          text: 'File Upload',
          fontSize: 'C'
        }
      },
      x: {
        props: { margin: '-V2 - - -' }
      }
    },
    Paragraph: null
  },

  UploadLabel: {},
  UploadFooter: {
    props: { minWidth: '100%', margin: '-W - - -' },
    IconText: { props: { padding: '- Z' } },
    Buttons: { props: { gap: 'Z2' } }
  }
}

export const UploadModal2 = {
  extend: UploadModal,
  Header: {},
  UploadLabel: null,
  UploadLabel2: {
    Icon: {},
    TitleParagraph: {},
    UploadButtonWithBackground: { theme: 'tertiary' }
  }
}

export const UploadModal3 = {
  extend: UploadModal2,
  Header: {},
  UploadLabel2: {},
  UploadFooter: {
    props: { padding: '0' },
    IconText: null,
    Buttons: {
      props: {
        minWidth: '100%',
        childProps: { flex: '1' }
      }
    }
  }
}

export const UploadModal4 = {
  extend: UploadModal3,
  Header: {},
  UploadLabel2: {},
  UploadingProcess4: {
    minWidth: '100%'
  },
  UploadFooter: {}
}
