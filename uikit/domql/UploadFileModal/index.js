'use strict'

import { Modal } from '@symbo.ls/modal'
import { UploadLabel } from '@symbo.ls/uploadlabel'
import { UploadButtonWithIcon } from '@symbo.ls/uploadbutton'

export const UploadFileModal = {
  extend: Modal,

  header: {
    title: { h5: { props: { text: 'File Upload' } } },
    paragraph: null
  },

  content: {
    extend: UploadLabel,
    Icon: {},
    paragraph: {
      title: {
        h5: {},
        UploadButton: null
      }
    }
  },

  footer: {
    extend: UploadButtonWithIcon,
    icon: null
  },

  props: {
    gap: 'A',
    header: { padding: '- - - Z' },
    content: {
      padding: 'C E',
      border: '1px dashed #57575C'
    },
    footer: {
      text: 'Choose file',
      boxSize: 'fit-content 100%'
    }
  }
}

export const UploadFileModal2 = {
  extend: Modal,

  header: {
    title: { h5: { props: { text: 'File Upload' } } },
    paragraph: null
  },

  content: {
    UploadLabel: {}
  },

  footer: {
    IconText: {
      props: {
        icon: { name: 'info' },
        text: 'Support'
      }
    },
    CancenConfirmButtons: {
      ...[
        {},
        { text: 'Attach file' }
      ]
    }
  },

  props: {
    gap: 'A',
    header: { padding: '- - - Z' },
    content: { flow: 'column' },
    footer: {
      align: 'center space-between',
      padding: '- - - Z',
      IconText: { gap: 'Z' },
      CancenConfirmButtons: {
        childProps: {
          ':first-child': { background: '#1C1C1F' }
        }
      }
    }
  }
}

export const UploadFileModal3 = {
  extend: UploadFileModal2,
  header: {},
  content: {
    UploadLabel: {},
    UploadingProcess: {}
  },
  footer: {},

  props: {
    content: {
      gap: 'A',
      UploadingProcess: {
        boxSize: 'fit-content 100%',
        content: {
          flex: '1',
          ProgressLine: { minWidth: '100%' }
        }
      }
    }
  }
}

export const UploadFileModal4 = {
  extend: UploadFileModal2,

  header: {},

  content: {
    UploadLabel: null,
    UploadLabel2: {}
  },

  footer: {
    IconText: null,
    CancenConfirmButtons: {
      minWidth: '100%',
      childProps: { flex: '1' }
    }
  },
  props: { footer: { padding: '0' } }
}

export const UploadFileModal5 = {
  extend: UploadFileModal4,
  header: {},
  content: {
    UploadLabel2: { border: '1px dashed #3F3F43' },
    UploadingProcess3: {
      background: '#040404',
      boxSize: 'fit-content 100%',
      border: '1px solid #3F3F43',
      content: { flex: '1' }
    }
  },
  props: { content: { gap: 'A' } }
}
