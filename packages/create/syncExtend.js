'use strict'

import { Sync, DevFocus, inspectOnKey } from '@symbo.ls/socket-ui'
import { isDevelopment, isProduction, isTest } from '@domql/env'
import { isUndefined } from '@domql/utils'

export const applySyncDebug = (extend, options) => {
  const { editor } = options
  if (!editor) return extend
  const inspect = isUndefined(editor.inspect) ? isDevelopment() : editor.inspect
  const liveSync = isUndefined(editor.liveSync) ? isDevelopment() : editor.liveSync
  if (inspect) extend.push[DevFocus]
  if (liveSync) extend.push[Sync]
  return extend
}

export const applyKeyDebugListener = (root, options) => {
  const { editor } = options
  if (editor && editor.inspect) inspectOnKey(root)
}
