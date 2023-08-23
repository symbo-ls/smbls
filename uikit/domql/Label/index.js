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

export const CardLabel = {
  text: '-2.902x',
  props: {
    fontSize: 'Y',
    background: '#F4454E',
    boxSize: 'fit-content fit-content',
    padding: 'W Y',
    round: 'Y'
  }
}
