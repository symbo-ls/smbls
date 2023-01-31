'use strict'

import { convert as c } from 'domql-to-mitosis' // TODO: => @domql/mitosis
import { create } from '@symbo.ls/create'

export const convert = (component, options) => {
  const element = create(component, options)
  return c(element)
}
e