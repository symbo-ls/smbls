'use strict'

import { Flex } from '@symbo.ls/atoms'
import { TitleParagraph, ParagraphWithUnderlineButton } from '@symbo.ls/textcomponents'
import { Button } from '@symbo.ls/button'
import { FieldWithTitle, CodeField } from '@symbo.ls/field'
import { CheckMark } from '@symbo.ls/accessories'

export const ModalHeader = {
  extend: Flex,
  props: {
  },
  title: {
    props: {
      fontSize: 'B'
    }
  },
  close: {
    extend: Button,
    props: {
      icon: 'x',
      margin: '- - - auto',
      background: 'transparent',
      color: 'white',
      fontSize: 'D',
      padding: '0'
    }
  }
}

export const ModalContent = {
  extend: Flex,
  props: {
    flow: 'column'
  }
}

export const ModalFooter = {
  extend: Flex,
  props: {
    flow: 'column'
  }
}

export const Modal = {
  extend: Flex,

  props: {
    background: '#1C1C1F',
    padding: 'A',
    flow: 'column',
    round: 'Z+V'
  },

  ModalHeader: {},
  ModalContent: {},
  ModalFooter: {}
}

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
      gap: 'B',
      childProps: {
        field: {
          width: '100%',
          input: { type: 'password' }
        }
      }
    },

    childExtend: FieldWithTitle,
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
      title: { props: { text: 'Verify your email' } },
      paragraph: { props: { text: 'Verification code has been sent to you. Enter the code below.' } }
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
      ...[{}, { text: 'Verify' }]
    }
  }
}
