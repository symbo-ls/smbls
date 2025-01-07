'use strict'

import { isObjectLike, isUndefined, isDevelopment, isArray } from '@domql/utils'
import { SyncComponent, Inspect, Notifications } from '@symbo.ls/sync'

export const initializeExtend = (app, ctx) => {
  return isObjectLike(app.extend) ? app.extend : []
}

export const initializeSync = (app, ctx) => {
  const { editor } = ctx
  if (!editor) return
  const liveSync = isUndefined(editor.liveSync) ? isDevelopment() : editor.liveSync
  if (liveSync) {
    if (isArray(app.extend)) app.extend.push(SyncComponent)
    else if (app.extend) {
      app.extend = [app.extend, SyncComponent]
    } else {
      app.extend = [SyncComponent]
    }
  }
}

export const initializeInspect = (app, ctx) => {
  const { editor } = ctx
  if (!editor) return
  const inspect = isUndefined(editor.inspect) ? isDevelopment() : editor.inspect
  if (inspect) {
    if (isArray(app.extend)) app.extend.push(Inspect)
    else if (app.extend) {
      app.extend = [app.extend, Inspect]
    } else {
      app.extend = [Inspect]
    }
  }
}

export const initializeNotifications = (app, ctx) => {
  const { editor } = ctx
  if (!editor) return
  const verbose = isUndefined(editor.verbose) ? isDevelopment() || ctx.verbose : editor.verbose
  if (verbose) {
    if (isArray(app.extend)) app.extend.push(Notifications)
    else if (app.extend) {
      app.extend = [app.extend, Notifications]
    } else {
      app.extend = [Notifications]
    }
  }
}
