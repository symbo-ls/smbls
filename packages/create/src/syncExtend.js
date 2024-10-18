'use strict'

import { isObjectLike, isUndefined, isDevelopment } from '@domql/utils'
import { SyncComponent } from '@symbo.ls/sync'
import { Inspect } from '@symbo.ls/sync/Inspect'
import { Notifications } from '@symbo.ls/sync/Notifications'

export const initializeExtend = (app, ctx) => {
  return isObjectLike(app.extend) ? app.extend : {}
}

export const initializeSync = (app, ctx) => {
  const { editor } = ctx
  if (!editor) return
  const liveSync = isUndefined(editor.liveSync) ? isDevelopment() : editor.liveSync
  if (liveSync) app.extend.push(SyncComponent)
}

export const initializeInspect = (app, ctx) => {
  const { editor } = ctx
  if (!editor) return
  const inspect = isUndefined(editor.inspect) ? isDevelopment() : editor.inspect
  if (inspect) app.extend.push(Inspect)
}

export const initializeNotifications = (app, ctx) => {
  const { editor } = ctx
  if (!editor) return
  const verbose = isUndefined(editor.verbose) ? isDevelopment() || ctx.verbose : editor.verbose
  if (verbose) app.extend.push(Notifications)
}
