'use strict'

import { ModalWithTitleParagraph } from '@symbo.ls/modal'
import { FieldWithTitle } from '@symbo.ls/field'
import { ParagrapUnderlineLinkWithCheckbox } from '@symbo.ls/textcomponents'

const fields = {
  props: {
    flow: 'column',
    gap: 'A'
  },

  Flex: {
    props: {
      gap: 'B+Z'
    },
    childExtend: {
      extend: FieldWithTitle,
      props: {
        width: '50%',
        CustomizedField: { width: '100%' }
      }
    },
    ...[{
      Title: { props: { text: 'First name' } },
      CustomizedField: { placeholder: 'First name' }
    }, {
      Title: { props: { text: 'Last name' } },
      CustomizedField: { placeholder: 'Last name' }
    }]
  },

  FieldWithTitle: {
    props: {},
    Title: { text: 'Email' },
    CustomizedField: {
      width: '100%',
      placeholder: 'example@email.com'
    }
  },

  TextareaWithTitle: {
    textArea: { width: '100%' }
  }
}

const checkParagraph = {
  extend: ParagrapUnderlineLinkWithCheckbox,

  props: {
    padding: 'A - - -'
  },

  Checkbox: {},

  ParagraphWithUnderlineButton: {
    props: {},

    P: {
      color: '#E0E0E2',
      text: 'You agree to '
    },
    Button: {
      fontWeight: '400',
      text: 'privacy policy'
    }
  }
}

const fields = {
  names: {
    extend: Flex,
    childExtend: FieldWithTitle,
    ...[
      {
        title: { props: { text: 'First name' } },
        field: { input: { props: { placeholder: 'First name' } } }
      },
      {
        title: { props: { text: 'Last name' } },
        field: { input: { props: { placeholder: 'Last name' } } }
      }
    ]
  },

  mail: {
    extend: FieldWithTitle,
    title: { props: { text: 'Email' } },
    field: { input: { props: { placeholder: 'example@email.com' } } }
  },

  message: { extend: TextareaWithTitle },

  props: {
    flow: 'column',
    gap: 'A',
    names: {
      gap: 'B+Z',
      childProps: {
        width: '50%',
        field: { width: '100%' }
      }
    },
    mail: { field: { width: '100%' } },
    message: { textArea: { width: '100%' } }
  }
}

const checkParagraph = {
  extend: ParagrapUnderlineLinkWithCheckbox,
  checkBox: {},
  paragraph: {
    p: { props: { text: 'You agree to ' } },
    underlined: { props: { text: 'privacy policy' } }
  },
  props: {
    padding: 'A - - -',
    paragraph: {
      p: { color: '#E0E0E2' },
      underlined: { fontWeight: '400' }
    }
  }
}

export const ContactForm = {
  extend: ModalWithTitleParagraph,
  header: {
    heading: {
      title: { props: { text: 'We’d love to help' } },
      paragraph: { props: { text: 'Reach out and we’ll get in touch within 24 hours.' } }
    }
  },

  content: {
    fields,
    checkParagraph
  },

  footer: {
    sendButton: {
      extend: Button,
      props: { text: 'Send message' }
    }
  },

  props: {
    padding: 'B',
    minWidth: 'H+C',
    maxWidth: 'H+C',
    header: {
      heading: {
        gap: 'Y',
        title: {
          fontSize: `${24 / 16}em`,
          fontWeight: '800'
        }
      }
    }
  },

  header: {
    heading: {
      title: { props: { text: 'We’d love to help' } },
      paragraph: { props: { text: 'Reach out and we’ll get in touch within 24 hours.' } }
    }
  },

  content: {
    props: {
      padding: 'B - A -'
    },
    content: {
      padding: 'B - A -'
    },
    footer: {
      sendButton: {
        background: '#0474F2',
        color: 'white',
        minWidth: '100%',
        padding: 'A -',
        round: 'Z',
        fontWeight: '500'
      }
    }
  }
}
