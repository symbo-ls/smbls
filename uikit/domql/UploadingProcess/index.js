'use strict'

import { Flex } from '@symbo.ls/atoms'
import { TitleParagraphWithButton } from '@symbo.ls/titleparagraph'

export const UploadingProcess = {
  extend: Flex,

  file: {
    Icon: { props: { icon: 'file' } }
  },
  content: {
    titleParagraph: {
      extend: TitleParagraphWithButton,
      title: { h5: { props: { text: 'Image.jpg' } } }
    },
    ProgressLine: {}
  }
}
