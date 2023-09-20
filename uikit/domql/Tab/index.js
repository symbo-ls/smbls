'use strict'

import { Button } from '@symbo.ls/button'

export const Tab = {
  extend: Button,
  props: {
    boxSize: 'fit-content fit-content',
    background: 'gray .92 +8',
    align: 'center flex-start',
    padding: 'Y1 Z1',
    round: 'Z',
    gap: 'Y2',
    position: 'relative'
  },

  Icon: {
    props: {
      name: 'arrowDownCircle',
      fontSize: 'C',
      color: 'white'
    }
  },

  Span: {
    text: 'Label',
    color: 'white',
    lineHeight: '1em',
    margin: 'V - - -'
  },

  CountIndicator: {
    text: '19',
    padding: 'Y'
  }
}

export const IconTab = {
  extend: Tab,
  props: { padding: 'Z+W' },

  Icon: {
    props: { name: 'messageCircle' }
  },

  Span: null,
  CountIndicator: {
    position: 'absolute',
    top: '-Z',
    right: '-Z',
    fontSize: 'X',
    fontWeight: '500',
    padding: 'X X+W'
  }
}
