'use strict'

import { isFunction } from '@domql/utils'
import { emotion } from 'smbls/emotion.js'
const { css } = emotion

export const transformEmotion = (props, callback) => {
  return isFunction(callback) ? callback(props) : css(props)
}
