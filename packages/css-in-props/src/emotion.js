'use strict'

import { isFunction } from '@domql/utils'
import { emotion } from '@symbo.ls/emotion'
const { css } = emotion

export const transformEmotion = (props, callback) => isFunction(callback) ? callback(props) : css(props)
