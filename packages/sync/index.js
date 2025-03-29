'use strict'

import { router } from '@domql/router'
import { init } from '@symbo.ls/init'
import { connect } from '@symbo.ls/socket/client'
import { window, overwriteShallow } from '@domql/utils'
import { connectedToSymbols, Notifications } from './SyncNotifications'
import { Inspect } from './Inspect'
export { Inspect, Notifications }

const isLocalhost = window && window.location && window.location.host.includes('local')

const onConnect = (element, state) => {
  return (socketId, socket) => {
    // send('components', { COMPONENTS: a(COMPONENTS) })
  }
}

const onDisconnect = (element, state) => {
  return () => {}
}

const onChange = (el, s, ctx) => {
  return (event, data) => {
    if (event === 'change') {
      const obj = JSON.parse(data)
      if (!obj?.DATA) return
      const { state, designSystem, pages, components, snippets, functions } = obj.DATA
      const { utils } = ctx

      if (pages) {
        // overwriteShallow(ctx.pages, pages)
        overwriteShallow(ctx.pages, pages)
      }

      if (components) {
        overwriteShallow(ctx.components, components)
      }

      if (functions) {
        overwriteShallow(ctx.functions, functions)
      }

      if (snippets) {
        overwriteShallow(ctx.snippets, snippets)
      }

      if (state) {
        const route = state.route
        if (route) (utils.router || router)(route.replace('/state', '') || '/', el, {})
        else if (!(snippets && functions && components && pages)) s.update(state)
      }

      if (snippets || functions || components || pages) {
        const { pathname, search, hash } = ctx.window.location
        ;(utils.router || router)(pathname + search + hash, el, {})
      }

      if (designSystem) init(designSystem)
    }

    if (ctx.editor.verbose && event === 'clients') {
      connectedToSymbols(data, el, s)
    }
  }
}

export const connectToSocket = (el, s, ctx) => {
  return connect(ctx.key, {
    source: isLocalhost ? 'localhost' : 'client',
    socketUrl: isLocalhost ? 'localhost:13336' : 'socket.symbols.app',
    location: window.location.host,
    onConnect: onConnect(el, s, ctx),
    onDisconnect: onDisconnect(el, s, ctx),
    onChange: onChange(el, s, ctx)
  })
}

export const SyncComponent = {
  on: {
    initSync: connectToSocket
  }
}

export const DefaultSyncApp = {
  extends: [SyncComponent, Inspect, Notifications]
}
