'use strict'

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
// export const UploadFileModal2 = {
//   extend: Modal,

//   header: {
//     title: { h5: { props: { text: 'File Upload' } } },
//     paragraph: null
//   },

//   content: {
//     UploadLabel: {}
//   },

//   footer: {
//     IconText: {
//       props: {
//         icon: { name: 'info' },
//         text: 'Support'
//       }
//     },
//     CancenConfirmButtons: {
//       ...[
//         {},
//         { text: 'Attach file' }
//       ]
//     }
//   },

//   props: {
//     gap: 'A',
//     header: { padding: '- - - Z' },
//     content: { flow: 'column' },
//     footer: {
//       align: 'center space-between',
//       padding: '- - - Z',
//       IconText: { gap: 'Z' },
//       CancenConfirmButtons: {
//         childProps: {
//           ':first-child': { background: '#1C1C1F' }
//         }
//       }
//     }
//   }
// }

// export const UploadFileModal3 = {
//   extend: UploadFileModal2,
//   header: {},
//   content: {
//     UploadLabel: {},
//     UploadingProcess: {}
//   },
//   footer: {},

//   props: {
//     content: {
//       gap: 'A',
//       UploadingProcess: {
//         boxSize: 'fit-content 100%',
//         content: {
//           flex: '1',
//           ProgressLine: { minWidth: '100%' }
//         }
//       }
//     }
//   }
// }

// export const UploadFileModal4 = {
//   extend: UploadFileModal2,

//   header: {},

//   content: {
//     UploadLabel: null,
//     UploadLabel2: {}
//   },

//   footer: {
//     IconText: null,
//     CancenConfirmButtons: {
//       minWidth: '100%',
//       childProps: { flex: '1' }
//     }
//   },
//   props: { footer: { padding: '0' } }
// }

// export const UploadFileModal5 = {
//   extend: UploadFileModal4,
//   header: {},
//   content: {
//     UploadLabel2: { border: '1px dashed #3F3F43' },
//     UploadingProcess3: {
//       background: '#040404',
//       boxSize: 'fit-content 100%',
//       border: '1px solid #3F3F43',
//       content: { flex: '1' }
//     }
//   },
//   props: { content: { gap: 'A' } }
// }
