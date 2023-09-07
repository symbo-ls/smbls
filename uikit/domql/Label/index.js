'use strict'

import { Flex } from '@symbo.ls/atoms'
import { Button } from '@symbo.ls/button'

export const Label = {
  extend: Flex,
  props: {
    text: '-2.902x',
    fontSize: 'Y',
    boxSize: 'fit-content fit-content',
    background: '#F4454E',
    padding: 'W Y',
    round: 'Y'
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
