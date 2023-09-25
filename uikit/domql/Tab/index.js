'use strict'
import { IconCommonButton, IcontextButton } from '@symbo.ls/button'

export const Tab = {
  extend: IcontextButton,
  props: {
    boxSize: 'fit-content fit-content',
    background: 'gray .92 +8',
    align: 'center flex-start',
    padding: 'Z Z2',
    gap: 'Z',
    position: 'relative'
  },
  icon: {},

  Caption: {},

  CountIndicator: {
    text: '19',
    padding: 'Y Y1'
  }
}

export const IconTab = {
  extend: IconCommonButton,
  props: {
  },

  Span: null,
  CountIndicator: {
    position: 'absolute',
    top: '-Z',
    right: '-Z',
    fontSize: 'Y',
    fontWeight: '500',
    padding: 'X X+W',
    text: '19'
  }
}
