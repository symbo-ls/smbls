'use strict'

import { Dialog } from '@symbo.ls/dialog'
import { Button } from '@symbo.ls/button'

const props = {
  border: '1px solid #313141',
  gap: 'Z',
  round: 'Z2',
  padding: 'Y2 Z1',
  align: 'center center'
}

export const Tab = {
  extend: [Dialog, Button],
  props,
  Icon: {
    props: {
      name: 'star',
      fontSize: 'A1'
    }
  },
  Span: {
    textTransform: 'capitalize',
    text: 'label'
  },
  Box: {
    text: '19',
    background: '#313141',
    padding: 'Y Y',
    round: 'Y1',
    textAlign: 'center'
  }
}
