'use strict'

import { Flex } from '@symbo.ls/atoms'
import { Button } from '@symbo.ls/button'

export const Label = {
  extend: Flex,
  props: {
    text: '-2.902x',
    fontSize: 'X2',
    boxSize: 'fit-content fit-content',
    padding: 'W2 Y2',
    round: 'Y1',
    fontWeight: '400'
  }
}

export const LabelButton = {
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
  props: {
    text: '-2.902x',
    fontSize: 'Y',
    background: '#F4454E',
    boxSize: 'fit-content fit-content',
    padding: 'W Y',
    round: 'Y'
  }
}
