'use strict'

import { Hgroup } from '@symbo.ls/hgroup'

export const DemoSection = {
  tag: 'section',
  extend: Hgroup,
  props: {
    gap: 'A'
  },

  Title: {
    tag: 'h5',
    props: {
      fontSize: 'A',
      fontWeight: '500',
      '@tabletS<': { alignItems: 'flex-end' },
      letterSpacing: '.2em',
      padding: '- Z1',
      textTransform: 'uppercase'
    }
  }
}
