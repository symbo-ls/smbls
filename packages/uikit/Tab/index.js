'use strict'

import { IconFlexButton, IcontextButton } from '@symbo.ls/button'

export const Tab = {
  extend: IcontextButton,
  props: {
    boxSize: 'fit-content fit-content',
    align: 'center flex-start',
    position: 'relative',
    padding: 'Z Z1'
  },

  Icon: {},

  Text: 'Caption',

  CountIndicator: {
    fontSize: 'Z1',
    text: '19',
    margin: '- - - X1'
  }
}

export const IconTab = {
  extend: IconFlexButton,

  Span: null,
  CountIndicator: {
    fontSize: 'Z',
    position: 'absolute',
    top: '-Y2',
    right: '-Y2',
    text: '19'
  }
}
