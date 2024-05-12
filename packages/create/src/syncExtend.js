'use strict'

import { Sync, DevFocus, inspectOnKey } from '@symbo.ls/socket-ui'
import { isUndefined, isDevelopment, isProduction, isTest } from '@domql/utils' // eslint-disable-line no-unused-vars

export const applySyncDebug = (extend, options) => {
  const { editor } = options
  if (!editor) return extend
  const inspect = isUndefined(editor.inspect) ? isDevelopment() : editor.inspect
  if (inspect) extend.push(DevFocus)
  const liveSync = isUndefined(editor.liveSync) ? isDevelopment() : editor.liveSync
  if (liveSync) extend.push(Sync)
  return extend
}

export const applyInspectListener = (root, options) => {
  const { editor } = options
  if (!editor) return
  const inspect = isUndefined(editor.inspect) ? isDevelopment() : editor.inspect
  if (inspect) inspectOnKey(root, options)
}
