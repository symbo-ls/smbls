'use strict'

import { Flex } from '@symbo.ls/atoms'
import { IconText } from '@symbo.ls/icon'
// import { UploadLabel2 } from './UploadLabel'
import { CancelConfirmButtons } from '@symbo.ls/button'
import { UploadButtonWithBackground } from './UploadButton'
import { Modal } from '@symbo.ls/modal'

export const UploadFooter = {
  extend: Flex,
  props: {
    boxSize: 'fit-content',
    gap: 'E',
    align: 'center space-between'
  },
  IconText: {
    extend: IconText,
    props: {
      text: 'Support',
      gap: 'Y',
      fontSize: 'Z',
      fontWeight: '400'
    },
    Icon: {
      props: {
        name: 'info',
        fontSize: 'B'
      }
    }
  },
  Buttons: {
    extend: CancelConfirmButtons,
    props: {
      childProps: {
        padding: 'Z2 B',
        cursor: 'pointer',
        caption: {
          fontWeight: '500',
          fontSize: 'Z1'
        }
      }
    },
    ...[
      {
        props: {
          border: 'solid, gray2 .05',
          borderWidth: '1px'
        },
        caption: { text: 'Cancel' }
      },
      {
        extend: UploadButtonWithBackground,
        props: {
          border: 'solid, transparent',
          borderWidth: '1px'
        },
        caption: { text: 'Attach file' }
      }
    ]
  }
}

export const UploadModal = {
  extend: Modal,
  props: { gap: 'Z2' },

  Header: {
    Title: {
      props: {
        padding: 'V - - W1'
      },
      caption: {
        props: {
          text: 'File Upload',
          fontSize: 'B'
        }
      }
    },
    Paragraph: null
  },

  UploadLabel: { round: 'Z1' },
  UploadFooter: {
    boxSize: 'fit-content 100%',
    margin: '-W - - -',
    padding: '0 - - A1',
    boxSizing: 'border-box',
    alignSelf: 'center',
    gap: '0'
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
    padding: '0',
    IconText: { display: 'none' },
    Buttons: {
      minWidth: '100%',
      childProps: {
        flex: '1',
        padding: 'Z2+V -'
      }
    }

  }
}

export const UploadModal4 = {
  extend: UploadModal3
  // Header: {},
  // Content: {},
  // UploadingProcess4: {
  //   minWidth: '100%',
  //   background: 'black',
  //   ProgressCircleWithUnitValue: {
  //     boxSize: 'C+A C+A'
  //   }
  // },
  // Footer: {}
}
