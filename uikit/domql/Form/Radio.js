'use strict'

import { Focusable } from '@symbo.ls/atoms'

export const Radio = {
  extend: [Focusable],
  tag: 'input',
  attr: {
    type: 'radio'
  }
}
