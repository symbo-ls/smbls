'use strict'

import { Flex } from '@symbo.ls/atoms'
import { Link } from '@symbo.ls/link'
import { IconText } from '@symbo.ls/icon'
import { Dialog } from '@symbo.ls/dialog'
import { UploadLabel } from './UploadLabel'

export const UploadModalFooter = {
  extend: Flex,
  props: {
    margin: 'X2 -X2 X2 W',
    align: 'center space-between'
  },

  IconText: {
    extend: [IconText, Link],
    props: {
      icon: 'info',
      color: 'gray .65 120',
      fontWeight: 'regular',
      target: '_blank',
      gap: 'Y1',
      fontSize: 'Z2',
      textTransform: 'capitalize',
      text: 'support'
    }
  },

  DialogFooter: {
    props: {
      padding: '0',
      gap: 'Y',
      childProps: {
        round: 'A'
      }
    },

    cancel: {
      text: 'cancel'
    },
    ok: {
      props: {
        theme: 'secondary'
      },
      text: 'Attach File'
    }
  }
}

export const UploadModalLabel = {
  extend: UploadLabel,
  props: {
    margin: 'X -X',
    cursor: 'pointer',
    padding: 'C1',
    gap: 'X2',
    round: 'Z1',
    userSelect: 'none',
    border: '1px, dashed, gray 1 25',
    background: 'gray 1 6',
    transition: 'A defaultBezier',
    transitionProperty: 'background',
    ':hover': {
      background: 'gray 1 5'
    }
  },
  Input: {},
  Icon: {
    fontSize: 'D',
    color: 'gray 1 150'
  },
  P_2: {
    extend: Flex,
    props: {
      margin: 'W -',
      gap: 'X2',
      flexWrap: 'wrap',
      textAlign: 'center',
      align: 'center center'
    },
    childExtend: {
      tag: 'span',
      props: {
        whiteSpace: 'nowrap',
        '&:nth-child(1)': {
          fontSize: 'A',
          fontWeight: '400',
          color: '#CFCFD1'
        },
        '&:nth-child(2)': {
          fontSize: 'A',
          fontWeight: '500',
          theme: 'primary @dark .color-only',
          cursor: 'pointer'
        }
      }
    },
    ...[
      { text: 'Drag & drop your files here or' },
      { text: 'Choose file' }
    ]
  },
  P: {
    text: '50 MB max file size',
    Span: null
  }
}

export const UploadModal = {
  extend: [Flex, Dialog],

  props: {
    flow: 'column',
    padding: 'Z A',
    width: '100%',
    maxWidth: 'H+C',
    gap: 'X2',
    round: 'Z1'
  },

  Flex_header: {
    props: {
      padding: '0 X',
      align: 'center space-between'
    },
    H6: {
      text: 'file upload',
      fontSize: 'A1',
      textTransform: 'capitalize'
    },
    SquareButton: {
      margin: '- -Y2 - -',
      color: 'gray 1 105',
      theme: 'tertiary',
      icon: 'x',
      ':hover': { theme: 'secondary' },
      ':active': { theme: 'secondary @dark :active' }
    }
  },

  UploadModalLabel: {},

  UploadModalFooter: {}
}
