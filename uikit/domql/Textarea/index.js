'use strict'

import { Input } from '@symbo.ls/input'

export const Textarea = {
  extend: [Input],
  tag: 'textarea',
  props: {
    theme: 'tertiary',
    round: 'Z2',
    boxSize: 'E1 G1',
    lineHeight: 1.4
  }
}
