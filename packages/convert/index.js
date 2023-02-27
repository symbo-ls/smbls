'use strict'

// import { convert as conv } from 'domql-to-mitosis' // TODO: => @domql/mitosis
import { create } from '@symbo.ls/create'

export const convert = (component, dest, options) => {
  const element = create(component, options)
  // return conv(element, dest)
}
