'use strict'

import * as smblsUI from '@symbo.ls/uikit'
import { isObject } from '@domql/utils'
// import { getColor } from '@symbo.ls/scratch' // TODO: add in pkg.json
import { send } from '@symbo.ls/socket/client'

export const DevFocus = {
  props: {
    '.preventSelect': {
      userSelect: 'none'
    }
  },

  focus: {
    state: {},
    props: (el, s) => ({
      position: 'fixed',
      hide: !s.area || !s.parent.debugging
    }),
    class: {
      inset: (el, state) => {
        const { area } = state
        if (!area) return
        const { x, y, width, height } = area
        return {
          top: y - 6 + 'px',
          left: x - 6 + 'px',
          width: width + 12 + 'px',
          height: height + 12 + 'px'
        }
      }
    },
    style: {
      boxShadow: '0 0 10px #3686F733, 0 0 0 3px #3686F766, 0 0 100vmax 100vmax #000A',
      zIndex: '9999999',
      borderRadius: '10px',
      pointerEvents: 'none'
    },
    span: {
      props: {
        position: 'absolute',
        margin: 'A2 0',
        fontSize: 'Z',
        color: 'text',
        // color: 'blue',
        zIndex: '99999999',
        textDecoration: 'underline',
        fontWeight: '500',
        top: '100%'
      },
      style: {
        boxShadow: '0 25px 10px 35px black',
        textShadow: '0 0 10px black'
      },
      text: (el, s) => s.focusKey
    },

    on: {
      init: ({ context }) => {
        const { components } = context

        console.log(components)
        if (isObject(components)) {
          const { Content, ...rest } = components
          for (const key in rest) {
            if (smblsUI[key]) continue
            if (!rest[key].__ref) rest[key].__ref = {}
            if (!rest[key].__ref.__componentKey) {
              rest[key].__ref.__componentKey = key
            }
          }
        }
      }
    }
  },

  on: {
    mousemove: (ev, e, state) => {
      const el = ev.target.ref
      const component = findComponent(el)
      if (!component || !state.debugging || !component.__ref) return

      const focusState = e.focus.state
      const updateValue = (area) => {
        focusState.update({ area, focusKey: component.__ref.__componentKey })
      }

      const update = () => {
        if (ev.altKey && ev.shiftKey) {
          const { x, y, width, height } = component.node.getBoundingClientRect()
          const area = { x, y, width, height }

          if (!focusState.area) return updateValue(area)
          if (focusState.area.x !== area.x) updateValue(area)
        } else if (focusState.area) {
          focusState.update({ area: false })
        }
      }

      window.requestAnimationFrame(() => {
        update()
        window.requestAnimationFrame(update)
      })
    },
    click: (ev, elem, state) => {
      const el = ev.target.ref
      const component = findComponent(el)
      if (!component || !component.__ref.__componentKey || !state.debugging) return
      send('route', `/export/${component.__ref.__componentKey}`)
      return false
    }
  }
}

function findComponent (el) {
  if (!el || !el.__ref) return
  if (el.__ref.__componentKey) return el
  return findComponent(el.parent)
}

export const inspectOnKey = (app) => {
  window.onkeydown = (ev) => {
    if (ev.altKey && ev.shiftKey) {
      app.state.update({ debugging: true, preventSelect: true }, {
        preventContentUpdate: true,
        preventRecursive: true
      })
    }
  }
  window.onkeyup = (ev) => {
    if ((!ev.altKey || !ev.shiftKey) && app.state.debugging) {
      app.focus.state.update({ area: false })
      app.state.update({ debugging: false, preventSelect: false }, { // TODO: does not update false
        preventContentUpdate: true,
        preventRecursive: true,
        preventPropsUpdate: true
      })
    }
  }
}
