'use strict'

import { Flex } from '@symbo.ls/atoms'

export const UploadLabel = {
  extend: Flex,
  props: {
    flow: 'column',
    align: 'center flex-start',
    boxSize: 'fit-content fit-content',
    gap: 'B2',
    padding: 'C D1',
    round: 'Z',
    border: 'solid, gray2 .05',
    borderWidth: '1px',
    theme: 'dialog'
  },

  Icon: {
    name: 'file',
    fontSize: 'I1',
    color: '#818186'
  },

  TitleParagraph: {
    props: {
      align: 'center flex-start',
      gap: 'Z',
      fontWeight: '400'
    },

    Title: {
      props: {
        text: 'Drag & drop your files here or',
        flow: 'row-reverse',
        fontWeight: '400',
        gap: 'Y2',
        align: 'center flex-start',
        fontSize: 'Z',
        color: 'gray2'
      },
      UploadButton: {
        caption: {
          fontSize: 'A2',
          fontWeight: '500'
        }
      }
    },

    Paragraph: {
      props: {
        text: '50 MB max file size',
        fontSize: 'Z'
      }
    }
  }
}

export const UploadLabel2 = {
  extend: UploadLabel,
  props: {
    padding: 'B2 E1',
    gap: 'B'
  },
  Icon: {},
  TitleParagraph: { Title: { UploadButton: null } },
  UploadButtonWithBackground: {
    padding: 'A C',
    margin: 'Z - - -'
  }
}
