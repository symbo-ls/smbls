'use strict'

import { SquareButton, FlexButton } from '@symbo.ls/button'

export const Tab = {
  extend: FlexButton,
  props: {
    boxSize: 'fit-content fit-content',
    align: 'center flex-start',
    position: 'relative',
    padding: 'Z Z1',
    icon: 'smile'
  },

  Icon: {},

  Text: { text: 'Caption' },

  CountIndicator: {
    fontSize: 'Z1',
    text: '19',
    margin: '- - - X1'
  }
}

export const IconTab = {
  extend: SquareButton,

  Span: null,
  CountIndicator: {
    fontSize: 'Z',
    position: 'absolute',
    top: '-Y2',
    right: '-Y2',
    text: '19'
  }
}
