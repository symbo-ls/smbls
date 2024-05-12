'use strict'

import { Flex } from '@symbo.ls/atoms'
import { IconText } from '@symbo.ls/icon'
import { CancelConfirmButtons } from '@symbo.ls/button'
import { UploadButtonWithBackground } from './UploadButton'
import { Modal } from '@symbo.ls/modal'

export const UploadFooter = {
  extend: 'Flex',
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
        }
      }
    },
    ...[
      { Text: 'Cancel' },
      {
        extend: UploadButtonWithBackground,
        Text: 'Attach file'
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

  ModalHeader: {
    Title: {
      Text: {
        text: 'File Upload'
      },
      SquareButton_x: {
        margin: '-V2 - - -'
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
  ModalHeader: {},
  UploadLabel: null,
  UploadLabel2: {
    width: '100%',
    Icon: {},
    Hgroup: {},
    UploadButtonWithBackground: { theme: 'tertiary' }
  }
}

export const UploadModal3 = {
  extend: UploadModal2,
  ModalHeader: {},
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
  ModalHeader: {},
  UploadLabel2: {},
  UploadingProcess4: {
    minWidth: '100%'
  },
  UploadFooter: {}
}
