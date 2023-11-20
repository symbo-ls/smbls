'use strict'

import { Grid } from '@symbo.ls/atoms'

import { Section } from './Section'

export const color = {
  extend: Section,

  Title: {
    props: {
      text: 'Primary color',
      padding: 'C1 - B1 -'
    }
  },
  Paragraph: {
    extend: 'Flex',
    props: {
      flow: 'row wrap',
      gap: 'D1',
      '@tabletM': {
      },
      childProps: {
        // border: '2px solid red',
        minWidth: 'F1',
        aspectRatio: '1 / 1',
        theme: 'dialog',
        round: 'W'
      }
    }
  }
}
