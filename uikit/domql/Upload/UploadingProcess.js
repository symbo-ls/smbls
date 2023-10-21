'use strict'

import { Dialog } from '@symbo.ls/dialog'
import { Button } from '@symbo.ls/button'
import { TitleParagraph } from '@symbo.ls/titleparagraph'
import { UploadImage } from './UploadImage'

export const UploadingProcess = {
  extend: Dialog,
  props: {
    boxSize: 'fit-content',
    padding: 'Y1',
    round: 'Z1',
    gap: 'Y2',
    position: 'relative'
  },

  X: {
    extend: Button,
    props: {
      icon: 'x',
      fontSize: 'B',
      boxSize: 'fit-content',
      padding: '0',
      theme: 'transparent',
      position: 'absolute',
      top: 'Y1',
      right: 'Y1'
    }
  },

  Image: { extend: UploadImage },
  Flex: {
    extend: TitleParagraph,
    props: {
      justifyContent: 'space-between',
      padding: 'X -'
    },

    Title: {
      props: {
        text: 'Image.jpg',
        fontSize: 'Z2'
      }
    },

    Paragraph: {
      props: {
        flow: 'column',
        gap: 'Y2'
      },
      DoubleUnitValue: { fontSize: 'Y' },
      ProgressLine: { margin: '- X - -' }
    }
  }
}

export const UploadedProcess = {
  extend: UploadingProcess,
  Image: {},
  Flex: {
    Title: {},
    Paragraph: {
      DoubleUnitValue: null,
      span: {
        props: {
          text: 'Done',
          fontSize: 'Y',
          lineHeight: '1em',
          color: 'gray2'
        }
      },
      ProgressLine: {
        value: '1',
        style: { '&::-webkit-progress-value': { background: '#04F214' } }
      }
    }
  }
}

export const UploadingProcess2 = {
  extend: UploadingProcess,
  props: {
    border: 'solid, gray3',
    borderWidth: '1px'
  },

  Image: {
    props: { padding: 'Z2' },
    Icon: { fontSize: 'D' }
  },
  Flex: {
    props: { padding: 'Y - W -' },
    Title: { props: { fontSize: 'A2' } },
    Paragraph: {
      ProgressLineWithUnitValue: {
        margin: '- X - -',
        ProgressLine: {},
        UnitValue: { fontSize: 'Y2' }
      },
      DoubleUnitValue: null,
      ProgressLine: null
    }
  }
}
export const UploadedProcess2 = {
  extend: UploadingProcess2,
  Image: {},
  Flex: {
    Title: {},
    Paragraph: {
      ProgressLineWithUnitValue: {
        ProgressLine: {
          value: 1,
          style: { '&::-webkit-progress-value': { background: '#04F214' } }
        },
        UnitValue: { Value: { text: '100' } }
      }
    }
  }
}

export const UploadingProcess3 = {
  extend: UploadingProcess2,
  props: {
    minWidth: 'G+C2',
    gap: 'Z'
  },

  X: {
    props: {
      top: '50%',
      right: 'B',
      transform: 'translate(50%, -50%)',
      padding: 'Y',
      fontSize: 'A1',
      theme: 'tertiary'
    }
  },

  Image: {},
  Flex: {
    props: {
      padding: '0',
      justifyContent: 'center',
      gap: 'Z'
    },
    Title: { props: { fontSize: 'Z2' } },
    Paragraph: {
      ProgressLineWithUnitValue: null,
      ProgressCircleWithSideUnitValue: {}
    }
  }
}

export const UploadedProcess3 = {
  extend: UploadingProcess3,
  Image: {},
  Flex: {
    Title: {},
    Paragraph: {
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
}

export const UploadingProcess4 = {
  extend: UploadingProcess3,
  props: {
    alignItems: 'center',
    padding: 'Y2 Y2 Y2 Z',
    gap: 'Z1'
  },

  Image: null,
  ProgressCircleWithIcon: {
    boxSize: 'C+X1',
    Icon: { fontSize: 'C' }
  },

  Flex: {
    props: {
      gap: 'Y1',
      padding: 'W2 - - -'
    },
    Title: {},
    Paragraph: {
      tag: 'p',
      props: {
        text: 'Uploading . . .',
        margin: '0',
        padding: '0',
        fontSize: 'Y1',
        color: 'gray2'
      },
      ProgressCircleWithSideUnitValue: null
    }
  }
}

export const UploadedProcess4 = {
  extend: UploadingProcess4,

  ProgressCircleWithIcon: {
    ':after': {
      width: 'calc(100% - 3px)',
      height: 'calc(100% - 3px)'
    },
    Icon: {
      name: 'check',
      color: '#04F214',
      fontSize: 'E1'
    },
    Progress: {
      value: 1,
      style: {
        '&::-webkit-progress-value': { background: '#04F214' }
      }
    }
  },

  Flex: {
    Title: {},
    Paragraph: { text: 'Uploaded' }
  }
}
