'use strict'

import { convert as conv } from 'domql-to-mitosis' // TODO: => @domql/mitosis
import { create } from '@symbo.ls/create'

const CONVERT_OPTIONS = {
  verbose: false
}

export const convert = (component, dest, options = CONVERT_OPTIONS) => {
  const element = create(component, options)
  return conv(element, dest)
}
