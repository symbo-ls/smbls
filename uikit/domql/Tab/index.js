'use strict'

import { IconCommonButton, IcontextButton } from '@symbo.ls/button'

export const Tab = {
  extend: IcontextButton,
  props: {
    boxSize: 'fit-content fit-content',
    theme: 'secondary',
    align: 'center flex-start',
    position: 'relative',
    padding: 'Z Z1'
  },
  Icon: {},

  caption: {},

  CountIndicator: {
    fontSize: 'Y1',
    text: '19',
    margin: '- - - X1'

  }
}

export const IconTab = {
  extend: IconCommonButton,
  props: {
  },

  Span: null,
  CountIndicator: {
    position: 'absolute',
    top: '-Y1',
    right: '-Y1',
    fontSize: 'X',
    text: '19'
  }
}
