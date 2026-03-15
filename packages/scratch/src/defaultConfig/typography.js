'use strict'

import { sequence } from './sequence.js'

const defaultProps = {
  browserDefault: 16,
  base: 16,
  type: 'font-size',
  ratio: sequence['minor-third'],
  range: [-3, +12],
  h1Matches: +6,
  lineHeight: 1.5,
  subSequence: true,
  mediaRegenerate: false,
  unit: 'em',
  templates: {},
  sequence: {},
  scales: {},
  vars: {}
}

export const typography = defaultProps
