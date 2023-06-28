'use strict'

import { IconText } from '@symbo.ls/icon'
import { Flex } from '@symbo.ls/atoms'
import { Button } from '@symbo.ls/button'
import { UploadLabel } from './UploadLabel'

const props = {
  flow: 'column',
  width: 'fit-content',
  padding: 'A',
  gap: 'A',
  round: 'Z1',
  background: '#252527',

  header: {
    align: 'center space-between',
    title: {
      fontSize: 'A1',
      textTransform: 'capitalize'
    },
    closeButton: {
      padding: '0',
      background: 'transparent',
      color: 'white',
      boxSize: 'fit-content fit-content'
    }
  },

  content: {
    background: '#141416',
    cursor: 'initial',
    padding: 'C1 D1',
    round: 'Z1',
    border: '1px dashed #57575C',
    Icon: {
      color: '#818186',
      opacity: '1'
    },
    p: {
      gap: `${5 / 16}em`,
      maxWidth: `${350 / 16}em`,
      flexWrap: 'wrap',
      textAlign: 'center',
      align: 'center center',
      childProps: {
        whiteSpace: 'nowrap',
        '&:nth-child(1)': {
          fontSize: 'A',
          fontWeight: '400',
          color: '#CFCFD1'
        },
        '&:nth-child(2)': {
          fontSize: 'A',
          fontWeight: '500',
          color: '#0474F2',
          cursor: 'pointer'
        },
        '&:nth-child(3)': {
          fontSize: 'Z1',
          fontWeight: '400',
          color: '#818186'
        }
      }
    }
  },

  footer: {
    align: 'center space-between',
    iconText: {
      gap: 'Z1',
      textTransform: 'capitalize'
    },
    confirmButtons: {
      gap: 'Y2',
      childProps: {
        textTransform: 'capitalize',
        padding: 'A B',
        round: 'A',
        color: 'white',
        '&:first-child': { background: '#141416' },
        '&:last-child': { background: '#0474F2' }
      }
    }
  }

}

export const UploadModal = {
  extend: Flex,
  props,

  header: {
    extend: Flex,
    title: {
      tag: 'h6',
      text: 'file upload'
    },
    closeButton: {
      extend: Button,
      props: { icon: 'x' }
    }
  },

  content: {
    extend: UploadLabel,
    Input: {},
    Icon: {},
    P: null,
    p: {
      extend: Flex,
      childExtend: { tag: 'span' },
      ...[
        { text: 'Drag & drop your files here or' },
        { text: 'Choose file' },
        { text: '50 MB max file size' }
      ]
    }
  },

  footer: {
    extend: Flex,
    iconText: {
      extend: IconText,
      props: {
        icon: 'info',
        text: 'support'
      }
    },
    confirmButtons: {
      extend: Flex,
      childExtend: Button,
      ...[
        { text: 'cancel' },
        { text: 'attach file' }
      ]
    }
  }
}
