'use strict'

import { Grid } from '@symbo.ls/atoms'

import { Section } from './Section'

export const color = {
  extend: Section,

  Title: { props: { text: 'Primary color' } },
  Paragraph: {
    extend: Grid,
    props: {
      columns: 'repeat(5, 1fr)',
      gap: 'A',
      '@tabletM': {
        columns: 'repeat(4, 1fr)'
      },
      childProps: {
        // border: '2px solid red',
        aspectRatio: '1 / 1',
        theme: 'dialog',
        padding: '100px 100px',
        round: 'Z'
      }
    }
  }
}
