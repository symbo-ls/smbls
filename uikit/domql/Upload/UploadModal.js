'use strict'

import { Modal } from '@symbo.ls/modal'
import { UploadLabel, UploadLabel2 } from './UploadLabel'

export const UploadModal = {
  extend: Modal,
  props: { gap: 'A' },

  Header: {
    props: { padding: '- X' },
    Title: { h5: { text: 'File Upload' } },
    Paragraph: null
  },

  Content: {
    extend: UploadLabel,
    props: { padding: 'C E' },
    Icon: {},
    TitleParagraph: {
      Title: {
        h5: {},
        UploadButton: null
      }
    }
  },

  Footer: {
    UploadButtonWithIcon: {
      flex: 1,
      Icon: { display: 'none' }
    }
  }

}

export const UploadModal2 = {
  extend: Modal,
  props: { gap: 'A' },

  Header: {
    props: { padding: '- X' },
    Title: { h5: { text: 'File Upload' } },
    Paragraph: null
  },

  Content: { extend: UploadLabel },

  Footer: {
    props: {
      align: 'center space-between',
      padding: '- X'
    },

    IconText: {
      icon: { name: 'info' },
      text: 'Support',
      gap: 'Z'
    },
    CancenConfirmButtons: {
      props: {
        childProps: {
          ':first-child': { background: '#141416' }
        }
      },
      ...[
        { props: { background: 'red' } },
        { text: 'Attach file' }
      ]
    }
  }
}

export const UploadModal3 = {
  extend: UploadModal2,
  Header: {},
  Content: { extend: UploadLabel2 },
  Footer: {
    IconText: null,
    CancenConfirmButtons: {
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
  Content: {},
  UploadingProcess4: {
    minWidth: '100%',
    background: 'black',
    ProgressCircleWithUnitValue: {
      boxSize: 'C+A C+A'
    }
  },
  Footer: {}
}
