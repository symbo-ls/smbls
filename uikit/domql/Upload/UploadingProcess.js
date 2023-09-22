'use strict'

import { Flex } from '@symbo.ls/atoms'
import { TitleParagraphWithButton } from '@symbo.ls/titleparagraph'

export const UploadingProcess = {
  extend: Flex,
  props: {
    background: '#141416',
    boxSize: 'fit-content fit-content',
    padding: 'Z A Z Z',
    round: 'Z+X',
    gap: 'Z'
  },

  File: {
    props: {
      padding: 'A+X',
      background: '#57575C',
      round: 'Z'
    },
    Icon: {
      name: 'file',
      fontSize: 'D'
    }
  },

  Flex: {
    props: {
      flex: '1',
      flow: 'column',
      boxSizing: 'border-box',
      gap: 'Y',
      padding: '- - V -'
    },

    TitleParagraph: {
      extend: TitleParagraphWithButton,
      props: { gap: 'X' },
      Title: { h5: { text: 'Image.jpg' } },
      Paragraph: {
        p: null,
        DoubleUnitValue: {}
      }
    },
    ProgressLine: {}
  }
}
export const UploadedProcess = {
  extend: UploadingProcess,
  File: {},
  Flex: {
    TitleParagraph: {
      Title: {},
      Paragraph: {
        p: { props: { text: 'Done' } },
        DoubleUnitValue: null
      }
    },
    ProgressLine: {
      value: '1',
      style: { '&::-webkit-progress-value': { background: '#04F214' } }
    }
  }
}

export const UploadingProcess2 = {
  extend: UploadingProcess,
  props: {
    border: '1px solid #3F3F43'
  },

  File: { props: { padding: 'Z+Y' } },
  Flex: {
    props: {
      justifyContent: 'center',
      padding: '0 0 0 0',
      gap: 'Y',
      position: 'relative'
    },
    TitleParagraph: {
      Title: {},
      Paragraph: null
    },
    ProgressLine: null,
    ProgressLineWithUnitValue: {}
  }
}
export const UploadedProcess2 = {
  extend: UploadingProcess2,
  File: {},
  Flex: {
    TitleParagraph: {},
    ProgressLineWithUnitValue: {
      ProgressLine: {
        value: 1,
        style: { '&::-webkit-progress-value': { background: '#04F214' } }
      },
      UnitValue: { Value: { text: '100' } }
    }
  }
}

export const UploadingProcess3 = {
  extend: UploadingProcess2,
  props: {
    minWidth: 'G+E'
  },
  File: {},
  Flex: {
    TitleParagraph: {
      Title: {
        h5: {},
        Button: {
          props: {
            padding: 'Y',
            background: '#252527',
            position: 'absolute',
            top: '50%',
            right: '0',
            transform: 'translate(0%, -50%)'
          }
        }
      },
      Paragraph: null
    },
    ProgressLineWithUnitValue: null,
    ProgressCircleWithSideUnitValue: {}
  }
}
export const UploadedProcess3 = {
  extend: UploadingProcess3,
  File: {},
  Flex: {
    TitleParagraph: {},
    ProgressCircleWithSideUnitValue: {
      ProgressCircle: {
        Progress: {
          value: 1,
          style: { '&::-webkit-progress-value': { background: '#04F214' } }
        }
      },
      UnitValue: {
        Value: { text: 'Done' },
        Unit: { display: 'none' }
      }
    }
  }
}

export const UploadingProcess4 = {
  extend: UploadingProcess,
  props: {
    minWidth: 'G+E',
    background: 'transparent',
    border: '1px solid #3F3F43',
    gap: 'A',
    padding: 'A',
    round: 'Z+X'
  },
  File: null,
  ProgressCircleWithUnitValue: {},

  Flex: {
    props: {
      justifyContent: 'center',
      position: 'relative'
    },
    TitleParagraph: {
      props: { justifyContent: 'center' },
      Title: {
        h5: {},
        Button: {
          props: {
            position: 'absolute',
            top: '50%',
            right: '0',
            transform: 'translate(0%, -50%)',
            padding: '0'
          }
        }
      },
      Paragraph: {
        p: { text: 'Uploading...' },
        DoubleUnitValue: { display: 'none' }
      }
    },
    ProgressLine: null
  }
}

export const UploadedProcess4 = {
  extend: UploadingProcess4,

  ProgressCircleWithUnitValue: null,
  ProgressCircleWithIcon: {
    Icon: {
      name: 'check',
      color: '#04F214',
      fontSize: 'H'
    },
    Progress: {
      value: 1,
      style: {
        '&::-webkit-progress-value': { background: '#04F214' }
      }
    }
  },
  Flex: {
    TitleParagraph: {
      Title: {},
      Paragraph: { p: { text: 'Uploaded' } }
    }
  }
}
