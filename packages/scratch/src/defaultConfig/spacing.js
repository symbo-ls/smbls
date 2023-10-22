'use strict'

import { SEQUENCE } from './sequence.js'
import { TYPOGRAPHY } from './typography.js'

const defaultProps = {
  base: TYPOGRAPHY.base,
  type: 'spacing',
  ratio: SEQUENCE.phi,
  range: [-5, +15],
  subSequence: true,
  mediaRegenerate: false,
  unit: 'em',
  sequence: {},
  scales: {},
  vars: {}
}

export const SPACING = defaultProps
