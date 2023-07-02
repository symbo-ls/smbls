'use strict'

import { Button } from '@symbo.ls/button'

const props = {
  gap: 'Z',
  theme: 'tertiary',
  round: 'Z2',
  padding: 'Y2 A',
  align: 'center center'
}

export const Tab = {
  extend: Button,
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
    margin: '- -X - A',
    padding: 'Y Y',
    round: 'Y1',
    textAlign: 'center'
  }
}