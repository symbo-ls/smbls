'use strict'

import { IconCommonButton, IcontextButton } from '@symbo.ls/button'

export const Tab = {
  extend: IcontextButton,
  props: {
    boxSize: 'fit-content fit-content',
    theme: 'secondary',
    align: 'center flex-start',
    gap: 'Z',
    position: 'relative'
  },
  icon: {},

  Caption: {},

  CountIndicator: {
    fontSize: 'Y2',
    margin: '- -X - X',
    text: '19'
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
    fontSize: 'Y',
    fontWeight: '500',
    padding: 'X1',
    text: '19'
  }
}
