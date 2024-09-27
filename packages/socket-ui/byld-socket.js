'use strict'

import { router } from '@domql/router'
import { init } from '@symbo.ls/init'
// import { set } from '@symbo.ls/scratch'
import { connect } from '@symbo.ls/socket/client'
import { window } from '@domql/globals'
import { overwriteShallow } from '@domql/utils'

const isLocalhost = window && window.location && window.location.host.includes('local')

// const ANIMATION = {
//   fadeInUp: {
//     from: {
//       transform: 'translate3d(0, 12.5%, 1px)',
//       opacity: 0
//     },
//     to: {
//       transform: 'translate3d(0, 0, 1px)',
//       opacity: 1
//     }
//   },
//   fadeOutDown: {
//     from: {
//       transform: 'translate3d(0, 0, 1px)',
//       opacity: 1
//     },
//     to: {
//       transform: 'translate3d(0, 12.5%, 1px)',
//       opacity: 0
//     }
//   }
// }

// const COLOR = {
//   black: '#000000',
//   blue: '#3686F7'
// }

// set({
//   COLOR,
//   ANIMATION
// })

const connectedToSymbols = (clients, element, state) => {
  if (clients.symbols) {
    if (!state.connected) {
      state.notifications.connected = {
        title: 'Connected',
        message: 'to the Symbols live server'
      }

      state.update({ connected: true })

      const t = setTimeout(() => {
        delete state.notifications.connected
        element.notifications.content.connected
          .setProps({ animation: 'fadeOutDown' })
        state.update({ connected: true })
        clearTimeout(t)
      }, 3000)
    }
  } else {
    if (state.connected) {
      state.notifications.connected = {
        title: 'Disconnected',
        type: 'error'
      }

      state.update({ connected: false })

      const t = setTimeout(() => {
        delete state.notifications.connected
        if (element.notifications.content.connected) {
          element.notifications.content.connected
            .setProps({ animation: 'fadeOutDown' })
        }
        state.update({ connected: true })
        clearTimeout(t)
      }, 3000)
    }
  }
}

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
      const { state, designSystem, pages, components, snippets } = obj.DATA
      const { utils } = ctx

      if (pages) {
        // overwriteShallow(ctx.pages, pages)
        overwriteShallow(ctx.pages, pages)
      }

      if (components) {
        overwriteShallow(ctx.components, components)
      }

      if (snippets) {
        overwriteShallow(ctx.snippets, snippets)
      }

      if (state) {
        const route = state.route
        if (route) (utils.router || router)(route.replace('/state', '') || '/', el, {})
        else if (!(snippets && components && pages)) s.update(state)
      }

      if (snippets || components || pages) {
        ;(utils.router || router)(window.location.pathname, el, {})
      }

      if (designSystem) init(designSystem)
    }

    if (event === 'clients') {
      connectedToSymbols(data, el, s)
    }
  }
}

const NOTIF_COLORS = {
  success: 'green',
  error: 'red',
  warning: 'yellow'
}

const Notifications = {
  props: {
    position: 'fixed',
    left: 'A2',
    bottom: 'Z2',
    zIndex: '999'
  },
  childExtend: {
    extend: 'Notification',
    props: ({ state }) => ({
      animation: 'fadeInUp',
      animationDuration: 'C',
      background: NOTIF_COLORS[state.type || 'success'],
      icon: null,
      Flex: {
        Title: {
          text: state.title
        },
        P: {
          text: state.message
        }
      }
    }),
    on: { click: (e, el) => el.setProps({ animation: 'fadeOutDown' }) }
  },
  $stateCollection: ({ state }) => state.notifications
}

export const Sync = {
  notifications: Notifications,

  state: {
    notifications: {}
  },

  on: {
    render: (el, s, ctx) => {
      ctx.socket = connect(ctx.key, {
        source: isLocalhost ? 'localhost' : 'client',
        socketUrl: isLocalhost ? 'localhost:13336' : 'socket.symbols.app',
        location: window.location.host,
        onConnect: onConnect(el, s, ctx),
        onDisconnect: onDisconnect(el, s, ctx),
        onChange: onChange(el, s, ctx)
      })
    }
  }
}

export * from './devFocus'
