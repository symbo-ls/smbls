'use strict'

import { Button } from '@symbo.ls/button'

export const Tab = {
  extend: Button,
  props: {
    boxSize: 'fit-content fit-content',
    background: '#3F3F43',
    align: 'center flex-start',
    padding: 'Y Z',
    round: 'Z',
    gap: 'Y',
    position: 'relative'
  },

  Icon: {
    props: {
      name: 'circle',
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
  NotificationIndicator: {
    text: '19'
  }
}

export const IconTab = {
  extend: Tab,
  props: {
    padding: 'Z+W'
  },

  Icon: {},
  Span: null,
  NotificationIndicator: {
    position: 'absolute',
    top: '-Z',
    right: '-Z',
    fontSize: 'X',
    fontWeight: '500',
    padding: 'X X+W'
  }
}
