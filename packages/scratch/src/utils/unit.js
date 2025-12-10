'use strict'

export const isScalingUnit = (unit) => {
  return (
    unit === 'em' ||
    unit === 'rem' ||
    unit === 'vw' ||
    unit === 'vh' ||
    unit === 'vmax' ||
    unit === 'vmin'
  )
}

export const CSS_UNITS = [
  // Absolute
  'px',
  'cm',
  'mm',
  'in',
  'pt',
  'pc',

  // Font-relative
  'em',
  'rem',
  'ex',
  'cap',
  'ch',
  'ic',
  'lh',
  'rlh',

  // Viewport-relative
  '%',
  'vw',
  'vh',
  'vmin',
  'vmax',
  'svw',
  'svh',
  'lvw',
  'lvh',
  'dvw',
  'dvh',

  // Container query units
  'cqw',
  'cqh',
  'cqi',
  'cqb',
  'cqmin',
  'cqmax',

  // Angle
  'deg',
  'rad',
  'grad',
  'turn',

  // Time
  's',
  'ms',

  // Resolution
  'dpi',
  'dpcm',
  'dppx',

  // Grid fractional
  'fr',
  'auto'
]
