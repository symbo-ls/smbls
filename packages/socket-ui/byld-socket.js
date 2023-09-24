'use strict'

import { router } from '@domql/router'
import { init } from '@symbo.ls/init'
import { set } from '@symbo.ls/scratch'
import { connect } from '@symbo.ls/socket/client'
import { Notification } from '@symbo.ls/notification'
import { window } from '@domql/globals'

const isLocalhost = window && window.location && window.location.host.includes('local')

const ANIMATION = {
  fadeInUp: {
    from: {
      transform: 'translate3d(0, 12.5%, 1px)',
      opacity: 0
    },
    to: {
      transform: 'translate3d(0, 0, 1px)',
      opacity: 1
    }
  },
  fadeOutDown: {
    from: {
      transform: 'translate3d(0, 0, 1px)',
      opacity: 1
    },
    to: {
      transform: 'translate3d(0, 12.5%, 1px)',
      opacity: 0
    }
  }
}

const COLOR = {
  black: '#000000',
  blue: '#3686F7'
}

set({
  COLOR,
  ANIMATION
})

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
        message: 'from the Symbols live server',
        type: 'error'
      }

      state.update({ connected: false })

      const t = setTimeout(() => {
        delete state.notifications.connected
        element.notifications.content.connected
          .setProps({ animation: 'fadeOutDown' })
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

const onChange = (element, state, context) => {
  return (event, data) => {
    if (event === 'change') {
      const obj = JSON.parse(data)
      const { PROJECT_STATE, PROJECT_DESIGN_SYSTEM } = obj
      const { utils } = context

      if (PROJECT_STATE) {
        const route = PROJECT_STATE.route
        if (route) (utils.router || router)(route.replace('/state', '') || '/', element, {}, true, false)
        else state.update(PROJECT_STATE)
      }

      if (PROJECT_DESIGN_SYSTEM) init(PROJECT_DESIGN_SYSTEM)
    }

    if (event === 'clients') {
      connectedToSymbols(data, element, state)
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
    extend: [Notification],
    props: ({ state }) => ({
      animation: 'fadeInUp',
      animationDuration: 'C',
      background: NOTIF_COLORS[state.type || 'success'],
      icon: null,
      article: {
        title: { text: state.title },
        p: { text: state.message }
      }
    }),
    on: { click: (e, el) => el.setProps({ animation: 'fadeOutDown' }) }
  },
  $setStateCollection: ({ state }) => state.notifications
}

export const Sync = {
  notifications: Notifications,

  state: {
    notifications: {}
  },

  on: {
    render: (el, s, ctx) => {
      connect(ctx.key, {
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
