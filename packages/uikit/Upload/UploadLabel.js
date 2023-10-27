'use strict'

import { Flex } from '@symbo.ls/atoms'

export const UploadLabel = {
  extend: Flex,
  props: {
    flow: 'column',
    align: 'center flex-start',
    boxSize: 'fit-content fit-content',
    gap: 'C',
    background: 'gray',
    padding: 'C D+Z',
    round: 'Z+X',
    border: '1px dashed #57575C'
  },

  Icon: {
    name: 'upload',
    fontSize: 'I',
    color: '#818186'
  },

  TitleParagraph: {
    props: {
      align: 'center flex-start',
      gap: 'Y'
    },

    Title: {
      props: {
        gap: 'Y',
        h5: {
          text: 'Drag & drop your files here or',
          fontSize: 'A',
          fontWeight: '400'
        }
      },
      h5: {},
      UploadButton: {}
    },

    Paragraph: {
      props: {
        p: {
          text: '50 MB max file size',
          fontSize: 'Z'
        }
      }
    }
  }
}

export const UploadLabel2 = {
  extend: UploadLabel,
  props: {
    gap: 'B',
    padding: 'C E+A'
  },

  Icon: { name: 'file' },

  TitleParagraph: {
    Title: {
      h5: { text: 'Drag & drop your files here' },
      UploadButton: { display: 'none' }
    },
    Paragraph: {
      p: { text: '50 MB max file size' }
    }
  },

  UploadButtonWithIcon: {}
}
