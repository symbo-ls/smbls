'use strict'

export const isScalingUnit = unit => {
  return unit === 'em' || unit === 'rem' || unit === 'vw' || unit === 'vh' || unit === 'vmax' || unit === 'vmin'
}
