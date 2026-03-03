'use strict'

import { isObjectLike, isUndefined, isDevelopment, isArray } from '@domql/utils'
import { SyncComponent, Inspect, Notifications } from '@symbo.ls/sync'

export const initializeExtend = (app, ctx) => {
  return isObjectLike(app.extends) ? app.extends : []
}

export const initializeSync = (app, ctx) => {
  const { editor } = ctx
  if (!editor) return
  const liveSync = isUndefined(editor.liveSync) ? isDevelopment() : editor.liveSync
  if (liveSync) {
    if (isArray(app.extends)) app.extends.push(SyncComponent)
    else if (app.extends) {
      app.extends = [app.extends, SyncComponent]
    } else {
      app.extends = [SyncComponent]
    }
  }
}

export const initializeInspect = (app, ctx) => {
  const { editor } = ctx
  if (!editor) return
  const inspect = isUndefined(editor.inspect) ? isDevelopment() : editor.inspect
  if (inspect) {
    if (isArray(app.extends)) app.extends.push(Inspect)
    else if (app.extends) {
      app.extends = [app.extends, Inspect]
    } else {
      app.extends = [Inspect]
    }
  }
}

export const initializeNotifications = (app, ctx) => {
  const { editor } = ctx
  if (!editor) return
  const verbose = isUndefined(editor.verbose) ? isDevelopment() || ctx.verbose : editor.verbose
  if (verbose) {
    if (isArray(app.extends)) app.extends.push(Notifications)
    else if (app.extends) {
      app.extends = [app.extends, Notifications]
    } else {
      app.extends = [Notifications]
    }
  }
}
