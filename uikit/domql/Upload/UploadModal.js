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
    padding: '- - - A',
    boxSize: 'fit-content'
  },

  IconText: {
    extend: IconText,
    props: {
      icon: 'info',
      text: 'Support',
      gap: 'Y',
      fontSize: 'Z',
      fontWeight: '500'
    }
  },

  Buttons: {
    extend: CancelConfirmButtons,
    props: {
      childProps: {
        padding: 'Z2+V B',
        ':first-child': {
          theme: 'tertiary',
          padding: '- B'
        },
        caption: { fontWeight: '500' }
      }
    },
    ...[
      {
        caption: { props: { text: 'Cancel' } }
      },
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
    gap: 'Z2'
  },

  X: {
    props: {
      top: 'Z',
      right: 'Z'
    }
  },

  Header: {
    props: { padding: '- - - W' },
    Title: {
      props: {
        text: 'File Upload',
        fontSize: 'C'
      }
    },
    Paragraph: null
  },

  UploadLabel: {},

  UploadFooter: {
    props: {
      gap: '0',
      minWidth: '100%'
    }
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
