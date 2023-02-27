'use strict'

import { transformClassname } from './transform'
import { transformEmotion } from './emotion'

export const setClassname = (props, emotionCss) => {
  console.log(props)
  const transform = transformClassname(props)
  return transformEmotion(transform, emotionCss)
}
