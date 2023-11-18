'use strict'

import { Grid } from '@symbo.ls/atoms'

import { Section } from './Section'

export const color = {
  extend: Section,

  Title: {
    props: { text: 'Primary color' }
  },
  Paragraph: {
    extend: Grid,
    props: {
      columns: 'repeat(5, 1fr)',
      gap: 'Z',
      childProps: {
        // border: '2px solid red',
        theme: 'dialog',
        padding: 'E -',
        round: 'Z'
      }
    }
  }
}
