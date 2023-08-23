'use strict'

import { Button } from '@symbo.ls/button'

export const Label = {
  extend: Button,

  props: {
    theme: 'tertiary',
    fontSize: 'Z2',
    emoji: '👍',
    text: '3',
    padding: 'X2 Z',
    round: 'C',
    lineHeight: 1,
    gap: 'X2',
    fontWeight: '500'
  },

  emoji: {
    props: ({ parent }) => ({ text: parent.props.emoji })
  }
}
