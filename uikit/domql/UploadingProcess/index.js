'use strict'

import { Flex } from '@symbo.ls/atoms'
import { TitleParagraphWithButton } from '@symbo.ls/titleparagraph'

export const UploadingProcess = {
  extend: Flex,

  file: { Icon: { props: { icon: 'file' } } },

  content: {
    extend: Flex,
    titleParagraph: {
      extend: TitleParagraphWithButton,
      title: { h5: { props: { text: 'Image.jpg' } } },
      paragraph: {
        p: null,
        DoubleUnitValue: {}
      }
    },
    ProgressLine: {}
  },

  props: {
    background: '#141416',
    boxSize: 'fit-content fit-content',
    padding: 'Z A Z Z',
    round: 'Z+X',
    gap: 'Z',
    file: {
      padding: 'A+X',
      background: '#57575C',
      round: 'Z',
      Icon: { fontSize: 'D' }
    },

    content: {
      flow: 'column',
      boxSizing: 'border-box',
      justifyContent: 'space-between',
      padding: '- - V -',
      titleParagraph: { gap: 'W' }
    }
  }
}

export const UploadedProcess = {
  extend: UploadingProcess,
  file: {},
  content: {
    titleParagraph: {
      title: {},
      paragraph: {
        p: { props: { text: 'Done' } },
        DoubleUnitValue: null
      }
    },
    ProgressLine: {
      props: {
        value: 1,
        style: { '&::-webkit-progress-value': { background: '#04F214' } }
      }
    }
  }
}

export const UploadingProcess4 = {
  extend: UploadingProcess,
  file: {},
  content: {
    titleParagraph: {
      title: {},
      paragraph: null
    },
    ProgressLine: null,
    ProgressLineWithUnitValue: {}
  },

  props: {
    border: '1px solid #3F3F43',
    file: { padding: 'Z+Y' },
    content: {
      justifyContent: 'center',
      padding: '0 0 0 0',
      gap: 'Y'
    }
  }
}

export const UploadedProcess4 = {
  extend: UploadingProcess4,
  file: {},
  content: {
    titleParagraph: {},
    ProgressLineWithUnitValue: {
      props: {
        ProgressLine: {
          value: 1,
          style: { '&::-webkit-progress-value': { background: '#04F214' } }
        },
        UnitValue: {
          value: { text: '100' }
        }

      }
    }
  }
}

export const UploadingProcess2 = {
  extend: UploadingProcess,
  file: {},
  content: {
    titleParagraph: {
      title: {},
      paragraph: null
    },
    ProgressLine: null,
    ProgressCircleWithSideUnitValue: {}
  },

  props: {
    background: 'transparent',
    border: '1px solid #3F3F43',
    content: {
      justifyContent: 'center',
      gap: 'X',
      position: 'relative',
      minWidth: 'G+B',
      titleParagraph: {
        title: {
          Button: {
            padding: 'Y',
            background: '#252527',
            position: 'absolute',
            top: '50%',
            right: '0',
            transform: 'translate(0%, -50%)'
          }
        }
      }
    }
  }
}

export const UploadedProcess2 = {
  extend: UploadingProcess2,
  file: {},
  content: {
    titleParagraph: {},
    ProgressCircleWithSideUnitValue: {
      ProgressCircle: {},
      UnitValue: {
        props: { text: 'Done' },
        unit: null,
        value: null
      },

      props: {
        ProgressCircle: {
          progress: {
            value: 1,
            style: { '&::-webkit-progress-value': { background: '#04F214' } }
          }
        }
      }
    }
  }
}

export const UploadingProcess3 = {
  extend: UploadingProcess,
  file: null,
  ProgressCircleWithUnitValue: {},
  content: {
    titleParagraph: {
      title: { props: { gap: 'F+C' } },
      paragraph: {
        DoubleUnitValue: null,
        p: { props: { text: 'Uploading...' } }
      }
    },
    ProgressLine: null
  },

  props: {
    gap: 'A',
    padding: 'A',
    content: {
      justifyContent: 'center',
      position: 'relative',
      minWidth: 'G+B',
      titleParagraph: {
        gap: 'Y',
        title: {
          Button: {
            position: 'absolute',
            top: '50%',
            right: '0',
            transform: 'translate(0%, -50%)',
            padding: '0'
          }
        }
      }
    }
  }
}

export const UploadedProcess3 = {
  extend: UploadingProcess3,
  ProgressCircleWithUnitValue: null,
  ProgressCircleWithIcon: {
    Icon: {
      icon: 'check',
      fontSize: 'G',
      color: '#04F214'
    },

    progress: {
      value: 1,
      style: {
        '&::-webkit-progress-value': { background: '#04F214' }
      }
    }
  },
  content: {
    titleParagraph: {
      title: {},
      paragraph: { p: { props: { text: 'Uploaded' } } }
    }
  }
}
