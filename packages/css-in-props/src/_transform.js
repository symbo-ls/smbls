'use strict'

import { isObject } from '@domql/utils'
import { useCssInProps } from './transform'

export const transformClassname = (element) => {
  const { props } = element
  if (!isObject(props)) return
  return useCssInProps(props, element)
}
