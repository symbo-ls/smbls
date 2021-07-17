'use strict'
import { Block } from '../Block'
import { Shape } from '../Shape'
import { Text } from '../Text'

export const Label = {
  proto: [Shape, Block, Text],

  style: { lineHeight: 1 },

  props: {
    emoji: '😂',
    text: '3',
    spacing: 'X2 Z',
    round: 'C',
    theme: 'White'
  },

  emoji: ({ props }) => props.emoji
}
