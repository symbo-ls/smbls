'use strict'

export const Label = {
  extend: 'Flex',
  props: {
    text: '-2.902x',
    fontSize: 'Z',
    theme: 'tertiary',
    boxSize: 'fit-content fit-content',
    padding: 'W2 Y2',
    lineHeight: '1',
    round: 'Y1',
    fontWeight: '400'
  }
}

export const LabelButton = {
  extend: 'Button',
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
    fontSize: 'Z',
    background: '#F4454E',
    boxSize: 'fit-content fit-content',
    padding: 'W Y',
    round: 'Y'
  }
}
