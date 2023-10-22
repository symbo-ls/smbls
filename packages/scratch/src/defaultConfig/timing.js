'use strict'

import { SEQUENCE } from './sequence'

const defaultProps = {
  default: 150,
  base: 150,
  type: 'timing',
  ratio: SEQUENCE['perfect-fourth'],
  range: [-3, +12],
  mediaRegenerate: false,
  unit: 'ms',
  sequence: {},
  scales: {},
  vars: {}
}

export const TIMING = defaultProps
