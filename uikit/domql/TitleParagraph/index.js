'use strict'

import { Flex } from '@symbo.ls/atoms'

export const TitleParagraph = {
  extend: Flex,
  h5: { props: { text: 'Title' } },
  p: { props: { text: 'paragraph' } },

  props: {
    flow: 'column',
    p: {
      margin: '0',
      color: '#A3A3A8'
    }
  }
}
