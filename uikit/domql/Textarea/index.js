'use strict'

import { Input } from '@symbo.ls/input'

export const Textarea = {
  extend: [Input],
  tag: 'textarea',
  props: {
    theme: 'tertiary',
    round: 'Z2',
    width: 'G1',
    height: 'E1',
    lineHeight: 1.4
  }
}
