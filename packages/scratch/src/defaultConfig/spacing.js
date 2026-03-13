'use strict'

import { sequence } from './sequence.js'
import { typography } from './typography.js'

const defaultProps = {
  base: typography.base,
  type: 'spacing',
  ratio: sequence.phi,
  range: [-5, +15],
  subSequence: true,
  mediaRegenerate: false,
  unit: 'em',
  sequence: {},
  scales: {},
  vars: {}
}

export const spacing = defaultProps
