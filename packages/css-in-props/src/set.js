'use strict'

import { transformClassname } from './_transform'
import { transformEmotion } from './emotion'

export const setClassname = (props, emotionCss) => {
  const transform = transformClassname(props)
  return transformEmotion(transform, emotionCss)
}
