'use strict'

import { isString } from '@domql/utils'

export const FLEX_PROPS = {
  flow: (value, el) => {
    const { props } = el
    // console.log('----flex')
    // console.log(value)
    // console.log(el)
    if (props.display !== 'flex') return
    const { reverse } = props
    if (!isString(value)) return
    let [direction, wrap] = (value || 'row').split(' ')
    if (value.startsWith('x') || value === 'row') direction = 'row'
    if (value.startsWith('y') || value === 'column') direction = 'column'
    return {
      flexFlow: (direction || '') + (!direction.includes('-reverse') && reverse ? '-reverse' : '') + ' ' + (wrap || '')
    }
  },

  wrap: (value, { props }) => {
    if (props.display !== 'flex') return
    return { flexWrap: value }
  },

  align: (value, { props }) => {
    if (props.display !== 'flex') return
    const [alignItems, justifyContent] = value.split(' ')
    return { alignItems, justifyContent }
  }
}
