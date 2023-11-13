'use strict'

import { Flex } from '@symbo.ls/atoms'

export const Color = {
  tag: 'section',
  extend: Flex,
  props: {
    flow: 'column',
    gap: 'B2'
  },

  TitleParagraph: {
    props: {
      gap: 'Z1',
      padding: '- - - Y',
      align: 'flex-start flex-start'
    },

    Title: {
      props: {
        text: 'Primary Colors',
        fontSize: 'C',
        fontWeight: '900'
      }
    },

    Paragraph: {
      props: {
        text: 'A logo doesn’t make a brand, but our logo contains a number of ideas about the Skillshare brand within it.',
        maxWidth: 'G3',
        fontWeight: '400'
      }
    }
  },

  Grid: {
    props: {
      columns: 'repeat(3, 1fr)',
      minHeight: '650px',
      gap: 'Z',
      childProps: {
        theme: 'dialog',
        round: 'Z'
      }
    }
  }
}
