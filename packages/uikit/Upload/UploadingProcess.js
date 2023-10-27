'use strict'

import { Dialog } from '@symbo.ls/dialog'
import { Button } from '@symbo.ls/button'
import { TitleParagraph } from '@symbo.ls/titleparagraph'
import { UploadImage } from './UploadImage'

export const UploadingProcess = {
  extend: Dialog,
  props: {
    boxSize: 'fit-content',
    padding: 'Y2 Z2 Y2 Y2',
    round: 'A',
    gap: 'Y2',
    position: 'relative'
  },

  Image: { extend: UploadImage },
  Flex: {
    extend: TitleParagraph,
    props: {
      justifyContent: 'space-between',
      padding: 'W2 -'
    },

    Title: {
      props: { justifyContent: 'space-between' },
      caption: {
        props: {
          text: 'Image.jpg',
          fontSize: 'Z2'
        }
      },
      x: {
        extend: Button,
        props: {
          icon: 'x',
          fontSize: 'B',
          boxSize: 'fit-content',
          padding: '0',
          theme: 'transparent',
          margin: '- -V1 - -'
        }
      }
    },

    Paragraph: {
      props: {
        flow: 'column',
        gap: 'Y2'
      },
      DoubleUnitValue: { fontSize: 'Y' },
      ProgressLine: {}
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
          color: 'gray2',
          display: 'block'
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
    Title: { caption: { props: { fontSize: 'A1' } } },
    Paragraph: {
      ProgressLineWithUnitValue: {
        ProgressLine: {},
        UnitValue: { fontSize: 'Y1' }
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
    props: { margin: '- - -V2 -' },
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

  Image: {},
  Flex: {
    props: {
      padding: '0',
      justifyContent: 'center',
      gap: 'Z'
    },
    Title: {
      caption: {
        props: { fontSize: 'Z2' }
      },
      x: {
        props: {
          position: 'absolute',
          top: '50%',
          right: 'B+W1',
          transform: 'translate(50%, -50%)',
          padding: 'Y',
          fontSize: 'A1',
          theme: 'tertiary'
        }
      }
    },
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
