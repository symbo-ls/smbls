'use strict'

import { isString } from '@domql/utils'

export const FLEX_PROPS = {
  flow: (value, el) => {
    const { props } = el
    const { reverse } = props
    if (!isString(value)) return
    let [direction, wrap] = (value || 'row').split(' ')
    if (value.startsWith('x') || value === 'row') direction = 'row'
    if (value.startsWith('y') || value === 'column') direction = 'column'
    return {
      display: 'flex',
      flexFlow:
        (direction || '') +
        (!direction.includes('-reverse') && reverse ? '-reverse' : '') +
        ' ' +
        (wrap || '')
    }
  },

  wrap: (value, { props }) => {
    return { display: 'flex', flexWrap: value }
  },

  align: (value, { props }) => {
    const [alignItems, justifyContent] = value.split(' ')
    return { display: 'flex', alignItems, justifyContent }
  }
}
