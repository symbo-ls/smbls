'use strict'

import { Flex } from '@symbo.ls/atoms'
import { TitleParagraph } from '@symbo.ls/titleparagraph'

export const UploadLabel = {
  extend: Flex,

  Icon: { props: { icon: 'upload' } },
  paragraph: {
    extend: TitleParagraph,
    title: {
      h5: { props: { text: 'Drag & drop your files here or' } },
      UploadButton: {}
    },
    paragraph: { p: { props: { text: '50 MB max file size' } } }
  },

  props: {
    flow: 'column',
    align: 'center flex-start',
    boxSize: 'fit-content fit-content',
    gap: 'C',
    background: '#141416',
    padding: 'C D+Z',
    round: 'Z',

    Icon: {
      fontSize: 'I',
      color: '#818186'
    },

    paragraph: {
      align: 'center flex-start',
      gap: 'Y',
      title: {
        gap: 'Y',
        h5: {
          fontSize: 'A',
          fontWeight: '400'
        }
      },
      paragraph: { p: { fontSize: 'Z' } }
    }
  }
}

export const UploadLabel2 = {
  extend: UploadLabel,
  Icon: { props: { icon: 'file' } },
  paragraph: {
    title: {
      h5: {},
      UploadButton: null
    }
  },

  UploadButtonWithIcon: {},

  props: {
    gap: 'B',
    padding: 'C E+A'
  }
}
