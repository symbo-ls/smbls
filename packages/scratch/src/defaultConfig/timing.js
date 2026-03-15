'use strict'

import { sequence } from './sequence'

const defaultProps = {
  default: 150,
  base: 150,
  type: 'timing',
  ratio: sequence['perfect-fourth'],
  range: [-3, +12],
  mediaRegenerate: false,
  unit: 'ms',
  sequence: {},
  scales: {},
  vars: {}
}

export const timing = defaultProps
