'use strict'

import { Flex } from '@symbo.ls/atoms'
<<<<<<< HEAD
=======
import { FieldWithTitle } from '@symbo.ls/field'
>>>>>>> main
import { TitleParagraphWithButton } from '@symbo.ls/titleparagraph'

export const Modal = {
  extend: Flex,
  props: {
    flow: 'column',
    background: '#252527',
    boxSize: 'fit-content fit-content',
    round: 'Z+X',
    padding: 'A'
  },

  Header: {
    extend: TitleParagraphWithButton,
    Title: {
      h5: {
        props: {
          fontSize: 'B',
          fontWeight: '700'
        }
      },
      Button: { props: { fontSize: 'C' } }
    }
  },
  Content: { extend: Flex },
  Footer: { extend: Flex }
}

export const ModalWithTitleParagraph = {
<<<<<<< HEAD
//   extend: Modal,
//   header: { heading: { extend: TitleParagraph } },
//   props: {
//     header: {
//       alignItems: 'flex-start',
//       heading: {
//         gap: 'A',
//         title: { fontSize: 'B' }
//       }
//     }
//   }
=======
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
>>>>>>> main
}

export const ResetCompleteModal = {
//   extend: Modal,

<<<<<<< HEAD
  //   header: {},
  //   content: {
  //     icon: { extend: CheckMark },
  //     titleParagraph: {
  //       extend: TitleParagraph,
  //       title: { props: { text: 'Reset complete!' } },
  //       paragraph: { props: { text: 'Your request has been approved!' } }
  //     }
  //   },
  //   footer: {
  //     button: {
  //       extend: Button,
  //       props: { text: 'Done' }
  //     }
  //   },

//   props: {
//     minWidth: 'G+E',
//     maxWidth: 'G+E',
//     gap: 'B',
//     content: {
//       flow: 'column',
//       align: 'center center',
//       gap: 'B',
//       titleParagraph: {
//         align: 'center center',
//         title: { fontSize: 'B' }
//       }
//     },
//     footer: {
//       minWidth: '100%',
//       button: {
//         background: '#0474F2',
//         color: 'white',
//         minWidth: '100%',
//         padding: 'A -',
//         round: 'A'
//       }
//     }
//   }
=======
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
>>>>>>> main
}

export const MessageModal = {
//   extend: Modal,

<<<<<<< HEAD
  //   header: {
  //     title: {
  //       tag: 'h5',
  //       props: { text: 'Message' }
  //     },
  //     close: {}
  //   },
  //   content: {
  //     p: {
  //       props: { text: 'Yes. If you change your mind and no longer wish to keep your iPhone, you have the option to return it to us. The returned iPhone must be in good condition and in the original packaging, which contains all accessories, manuals and instructions. Returns are subject to Apples Sales and Refunds Policy.' }
  //     }
  //   },
  //   footer: null,

//   props: {
//     minWidth: 'G+E',
//     maxWidth: 'G+E',
//     content: { p: { fontSize: 'Z' } }
//   }
}

export const ChangePasswordModal = {
//   extend: ModalWithTitleParagraph,
//   header: {},
//   content: {
//     childExtend: { extend: FieldWithTitle },
//     ...[
//       { title: { props: { text: 'Old password' } } },
//       {
//         title: { props: { text: 'New password' } },
//         field: { input: {} },
//         subTitle: {
//           extend: IconText,
//           props: {
//             icon: { name: 'info' },
//             text: '8 character minimum',
//             align: 'center flex-start',
//             boxSize: 'fit-content'
//           }
//         }
//       },
//       {
//         title: { props: { text: 'Confirm new password' } },
//         field: {
//           input: {}
//         },
//         subTitle: {
//           extend: IconText,
//           props: {
//             icon: { name: 'info' },
//             text: '8 character minimum',
//             align: 'center flex-start',
//             boxSize: 'fit-content'
//           }
//         }
//       }
//     ]
//   },
//   footer: { 'CancenConfirmButtons.1': { ...[{}, { text: 'Reset password' }] } },

//   props: {
//     minWidth: 'H',
//     maxWidth: 'H',
//     gap: 'B',
//     content: {
//       flow: 'column',
//       gap: 'B',
//       childProps: {
//         field: {
//           width: '100%',
//           input: { type: 'password' }
//         }
//       }
//     },
//     footer: { justifyContent: 'flex-end' }
//   }
}

export const VerificationCodeModal = {
//   extend: ModalWithTitleParagraph,
//   header: {
//     heading: {
//       title: { props: { text: 'Verify your email' } },
//       paragraph: { props: { text: 'Verification code has been sent to you. Enter the code below.' } }
//     }
//   },

  //   content: {
  //     codeField: { extend: CodeField },
  //     paragraph: { extend: ParagraphWithUnderlineButton }
  //   },
  //   footer: { 'CancenConfirmButtons.1': { ...[{}, { text: 'Verify' }] } },

//   props: {
//     maxWidth: 'G+E',
//     minWidth: 'G+E',
//     gap: 'B',
//     content: { gap: 'B' },
//     footer: {
//       justifyContent: 'flex-end'
//     }
//   }
=======
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
>>>>>>> main
}
