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
    gap: 'Y'
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
