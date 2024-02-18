'use strict'

import { Hgroup } from '@symbo.ls/uikit'

export const DefaultBlock = {
  tag: 'section',
  extend: Hgroup,

  props: { gap: 'A' },

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
