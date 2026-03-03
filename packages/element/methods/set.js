'use strict'

import { merge, overwrite } from '@domql/utils'

import { set, reset, updateContent, removeContent } from '../set.js'
import { update } from '../update.js'

import {
  call,
  error,
  getContext,
  getPath,
  getRef,
  getRoot,
  getRootContext,
  getRootData,
  getRootState,
  keys,
  log,
  lookdown,
  lookdownAll,
  lookup,
  nextElement,
  parse,
  parseDeep,
  previousElement,
  remove,
  setNodeStyles,
  setProps,
  spotByPath,
  variables,
  verbose,
  warn
} from '@domql/utils/methods'

export const addMethods = (element, parent, options = {}) => {
  const proto = {
    set,
    reset,
    update,
    variables,
    remove,
    updateContent,
    removeContent,
    setProps,
    lookup,
    lookdown,
    lookdownAll,
    getRef,
    getPath,
    getRootState,
    getRoot,
    getRootData,
    getRootContext,
    getContext,
    setNodeStyles,
    spotByPath,
    parse,
    parseDeep,
    keys,
    nextElement,
    previousElement,
    log,
    verbose,
    warn,
    error,
    call
  }
  if (element.context.methods) {
    ;(options.strict ? merge : overwrite)(proto, element.context.methods)
  }
  Object.setPrototypeOf(element, proto)
}
