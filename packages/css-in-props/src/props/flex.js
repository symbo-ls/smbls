'use strict'

import { isString } from '@domql/utils'

export const FLEX_PROPS = {
  flow: (value, el) => {
    const { props } = el
    const DISPLAY_FLEX_ALLOWED = ['flex', 'inline-flex']
    if (!DISPLAY_FLEX_ALLOWED.includes(props.display)) return
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
    const DISPLAY_FLEX_ALLOWED = ['flex', 'inline-flex']
    if (!DISPLAY_FLEX_ALLOWED.includes(props.display)) return
    return { flexWrap: value }
  },

  align: (value, { props }) => {
    const DISPLAY_FLEX_ALLOWED = ['flex', 'inline-flex']
    if (!DISPLAY_FLEX_ALLOWED.includes(props.display)) return
    const [alignItems, justifyContent] = value.split(' ')
    return { alignItems, justifyContent }
  }
}
