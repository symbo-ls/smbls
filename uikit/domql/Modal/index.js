'use strict'

import { Flex } from '@symbo.ls/atoms'
import { FieldWithTitle } from '@symbo.ls/field'
import { TitleParagraphWithButton } from '@symbo.ls/titleparagraph'

export const Modal = {
  extend: Flex,
  header: { extend: TitleParagraphWithButton },
  content: { extend: Flex },
  footer: { extend: Flex },

  props: {
    flow: 'column',
    background: '#252527',
    boxSize: 'fit-content fit-content',
    round: 'Z',
    padding: 'A',
    header: {
      title: {
        h5: {
          fontSize: 'B',
          color: 'white'
        },
        Button: {
          icon: {
            fontSize: 'D',
            color: 'white'
          }
        }
      }
    }
  }
}

// export const Modal = {
//   extend: Flex,
//   header: {
//     extend: Flex,
//     close: {
//       extend: Button,
//       props: { icon: 'x' }
//     }
//   },
//   content: { extend: Flex },
//   footer: { extend: Flex },

//   props: {
//     background: '#1C1C1F',
//     padding: 'A',
//     flow: 'column',
//     round: 'Z+V',
//     header: {
//       title: { fontSize: 'B' },
//       close: {
//         margin: '- - - auto',
//         background: 'transparent',
//         color: 'white',
//         fontSize: 'D',
//         padding: '0'
//       }
//     },
//     content: { flow: 'column' }
//   }
// }

export const ModalWithTitleParagraph = {
  extend: Modal,
  ModalHeader: {
    props: {},
    TitleParagraph: {
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

  props: {
    minWidth: 'G+E',
    maxWidth: 'G+E',
    gap: 'B'
  },

  ModalHeader: {},
  ModalContent: {
    props: {
      flow: 'column',
      align: 'center center',
      gap: 'B',
      titleParagraph: {
        align: 'center center',
        title: { fontSize: 'B' }
      }
    },
    CheckMark: {},
    TitleParagraph: {
      title: { text: 'Reset complete!' },
      paragraph: { text: 'Your request has been approved!' }
    }
  },
  ModalFooter: {
    props: {
      minWidth: '100%',
      button: {
        background: '#0474F2',
        color: 'white',
        minWidth: '100%',
        padding: 'A -',
        round: 'A'
      }
    },
    Button: {
      props: { text: 'Done' }
    }
  }
}

export const MessageModal = {
  extend: Modal,

  props: {
    minWidth: 'G+E',
    maxWidth: 'G+E'
  },

  ModalHeader: {
    title: {
      tag: 'h5',
      props: { text: 'Message' }
    },
    close: {}
  },
  ModalContent: {
    props: {
      p: { fontSize: 'Z' }
    },
    p: {
      props: { text: 'Yes. If you change your mind and no longer wish to keep your iPhone, you have the option to return it to us. The returned iPhone must be in good condition and in the original packaging, which contains all accessories, manuals and instructions. Returns are subject to Apples Sales and Refunds Policy.' }
    }
  },
  ModalFooter: null
}

export const ChangePasswordModal = {
  extend: ModalWithTitleParagraph,

  props: {
    minWidth: 'H',
    maxWidth: 'H',
    gap: 'B'
  },

  ModalHeader: {},

  ModalContent: {
    props: {
      flow: 'column',
      gap: 'B'
    },

    childExtend: {
      extend: FieldWithTitle,
      props: {
        CustomizedField: {
          width: '100%',
          input: { type: 'password' }
        }
      }
    },
    ...[
      {
        Title: { props: { text: 'Old password' } }
      },
      {
        Title: { props: { text: 'New password' } },
        CustomizedField: { input: {} },
        IconText: {
          props: {
            icon: { name: 'info' },
            text: '8 character minimum',
            align: 'center flex-start',
            boxSize: 'fit-content'
          }
        }
      },
      {
        Title: { props: { text: 'Confirm new password' } },
        CustomizedField: {
          input: {}
        },
        IconText: {
          icon: { name: 'info' },
          text: '8 character minimum',
          align: 'center flex-start',
          boxSize: 'fit-content'
        }
      }
    ]
  },

  ModalFooter: {
    props: {
      justifyContent: 'flex-end'
    },
    CancelConfirmButtons: {
      props: {},
      ...[{}, { text: 'Reset password' }]
    }
  }
}

export const VerificationCodeModal = {
  extend: ModalWithTitleParagraph,

  props: {
    maxWidth: 'G+E',
    minWidth: 'G+E',
    gap: 'B'
  },

  ModalHeader: {
    props: {},
    heading: {
      title: { text: 'Verify your email' },
      paragraph: { text: 'Verification code has been sent to you. Enter the code below.' }
    }
  },

  ModalContent: {
    props: {
      gap: 'B'
    },
    CodeField: { },
    ParagraphWithUnderlineButton: { }
  },

  ModalFooter: {
    props: {
      justifyContent: 'flex-end'
    },
    CancelConfirmButtons: {
      props: {},
      ...[{}, { text: 'Verify' }]
    }
  }
}
