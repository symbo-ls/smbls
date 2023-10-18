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
    gap: 'Y2'
  },

  Image: { extend: UploadImage },

  Flex: {
    extend: TitleParagraph,
    props: {
      justifyContent: 'space-between',
      gap: 'Y',
      flex: '1'
    },

    Title: {
      caption: {
        props: {
          text: 'Image.jpg',
          fontSize: 'Z2',
          margin: 'X - - -'
        }
      },
      closeBtn: {
        extend: Button,
        props: {
          icon: 'x',
          padding: '0',
          boxSize: 'fit-content',
          theme: 'transparent',
          fontSize: 'B',
          margin: 'V1 V1 - auto'
        }
      }
    },

    Paragraph: {
      props: { margin: '-V - - -' },
      DoubleUnitValue: { fontSize: 'Y' }
    },

    ProgressLine: { margin: '- X1 X -' }
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
    border: 'solid, gray3',
    borderWidth: '1px',
    gap: 'Y1',
    padding: 'Y'
  },
  Image: {
    props: { padding: 'Z2' },
    Icon: { fontSize: 'D' }
  },
  Flex: {
    Title: {
      caption: {
        props: {
          fontSize: 'A',
          margin: 'X2 - - -'
        }
      }
    },
    ProgressLineWithUnitValue: {
      fontSize: 'Y2',
      margin: '- X V -'
    },
    Paragraph: null,
    ProgressLine: null
  }
}
export const UploadedProcess2 = {
  extend: UploadingProcess2,
  Image: {},
  Flex: {
    Title: {},
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
    minWidth: 'G+C2',
    gap: 'Z'
  },
  Image: {},
  Flex: {
    props: {
      position: 'relative',
      justifyContent: 'center',
      gap: 'Z',
      padding: 'V1 - - -'
    },
    Title: {
      caption: {
        props: {
          margin: '0',
          fontSize: 'Z2'
        }
      },
      closeBtn: {
        props: {
          position: 'absolute',
          margin: '0',
          top: '50%',
          right: 'A1',
          transform: 'translate(50%, -50%)',
          padding: 'Y',
          fontSize: 'A1',
          theme: 'tertiary'
        }
      }
    },
    ProgressLineWithUnitValue: null,
    ProgressCircleWithSideUnitValue: {}
  }
}

export const UploadedProcess3 = {
  extend: UploadingProcess3,
  Image: {},
  Flex: {
    Title: {},
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
      DoubleUnitValue: null,
      props: {
        text: 'Uploading . . .',
        margin: '0',
        padding: '0',
        fontSize: 'Y1',
        color: 'gray2'
      }
    },
    ProgressCircleWithSideUnitValue: null
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
