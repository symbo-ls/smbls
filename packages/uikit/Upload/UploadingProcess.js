'use strict'

import { Flex } from '@symbo.ls/atoms'
import { TitleParagraphWithButton } from '@symbo.ls/titleparagraph'
import { UploadImage } from './UploadImage'
export const UploadingProcess = {
  extend: Flex,
  props: {
    background: '#141416',
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

    TitleParagraph: {
      extend: TitleParagraphWithButton,
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

  Image: { props: { padding: 'Z+Y' } },
  Flex: {
    props: {
      justifyContent: 'center',
      padding: '0 0 0 0',
      gap: 'Y2',
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
  Image: {},
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
  Image: {},
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
  Image: {},
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
  Image: null,
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
