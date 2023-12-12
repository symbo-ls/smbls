'use strict'

import { CheckIndicator } from './CheckIndicator'

export const SuccessIndicator = {
  extend: CheckIndicator,
  props: {
    theme: 'success',
    padding: 'X+V2',
    fontSize: 'F'
  }
}
