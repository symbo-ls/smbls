'use strict'

import { TitleParagraphButton } from '@symbo.ls/titleparagraph'
import { Dialog } from '@symbo.ls/dialog'
import { UploadImage } from './UploadImage'

export const UploadingProcess = {
  extend: Dialog,
  props: {
    boxSize: 'fit-content fit-content',
    padding: 'Z A Z Z',
    round: 'Z+X',
    gap: 'Z'
  },

  Image: { extend: UploadImage },

  Flex: {
    props: {
      flex: '1',
      flow: 'column',
      boxSizing: 'border-box',
      justifyContent: 'center',
      gap: 'Y2'
    },

    TitleParagraphRows: {
      extend: TitleParagraphButton,
      props: { gap: 'Y2' },
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
  Image: {},
  Flex: {
    TitleParagraphRows: {
      Title: {},
      Paragraph: {
        Span: { props: { text: 'Done' } },
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

  Image: { props: { padding: 'Z+Y' } },
  Flex: {
    props: {
      justifyContent: 'center',
      padding: '0 0 0 0',
      gap: 'Y2',
      position: 'relative'
    },
    TitleParagraphRows: {
      Title: {},
      Paragraph: null
    },
    ProgressLine: null,
    ProgressLineWithUnitValue: {}
  }
}
export const UploadedProcess2 = {
  extend: UploadingProcess2,
  Image: {},
  Flex: {
    TitleParagraphRows: {},
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
  Image: {},
  Flex: {
    TitleParagraphRows: {
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
  Image: {},
  Flex: {
    TitleParagraphRows: {},
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
  Image: null,
  ProgressCircleWithUnitValue: {},

  Flex: {
    props: {
      justifyContent: 'center',
      position: 'relative'
    },
    TitleParagraphRows: {
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
    TitleParagraphRows: {
      Title: {},
      Paragraph: { p: { text: 'Uploaded' } }
    }
  }
}
