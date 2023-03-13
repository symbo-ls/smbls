'use strict'

import { Sync, DevFocus, inspectOnKey } from '@symbo.ls/socket-ui'
import { isProduction, isTest } from '@domql/env'

const { NODE_ENV } = process.env

export const applySyncDebug = (extend, options) => {
  const { editor } = options
  if (!editor) return extend
  if (editor.debug) extend.push[DevFocus]
  if (editor.socket) extend.push[Sync]
  return extend
}

export const applyKeyDebugListener = (root, options) => {
  const { editor } = options
  if (editor && editor.debug) inspectOnKey(root)
}

const extend = isProduction(NODE_ENV) || isTest(NODE_ENV)  [Sync, DevFocus]
