'use strict'

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

const NOTIF_COLORS = {
  success: 'green',
  error: 'red',
  warning: 'yellow'
}

export const connectedToSymbols = (clients, element, state) => {
  console.log(clients)
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

export const Notifications = {
  state: {
    notifications: []
  },

  Notifications: {
    props: {
      position: 'fixed',
      left: 'A2',
      bottom: 'Z2',
      zIndex: '999'
    },
    childExtends: {
      extends: 'Notification',
      props: ({ state }) => ({
        animationDuration: 'C',
        background: NOTIF_COLORS[state.type || 'success'],
        icon: null,
        onRender: (e, el, s) => {
          el.setProps({ animation: 'fadeInUp' })
        },
        onClick: (e, el, s) => {
          delete s.notifications[el.key]
          el.setProps({ animation: 'fadeOutDown' })
          if (s.onClose) s.onClose(e, el, s)
        }
      }),
      Flex: {
        Title: {
          text: '{{ title }}'
        },
        P: {
          text: '{{ title }}'
        }
      },
      IconText: null
    },
    childrenAs: 'state',
    children: ({ state }) => state.notifications
  }
}
