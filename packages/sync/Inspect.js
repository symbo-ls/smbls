'use strict'

import * as smblsUI from '@symbo.ls/uikit'
import { isObject, isString, isArray } from '@domql/utils'
import { send } from '@symbo.ls/socket/client'

function returnStringExtend (extend) {
  return isString(extend) ? extend : isArray(extend) ? extend.find(extItem => isString(extItem)) : ''
}

function getComponentKey (el) {
  if (!el) return
  const __componentKey = el.__ref.__componentKey
  const extendStr = el.extend && returnStringExtend(el.extend)
  const parentChildExtendStr = el.parent && el.parent.childExtends && returnStringExtend(el.parent.childExtends)
  return (__componentKey || extendStr || parentChildExtendStr || '').split('_')[0].split('.')[0].split('+')[0]
}

function findComponent (el) {
  if (!el || !el.__ref) return
  const { components, pages, editor } = el.context
  const componentKey = getComponentKey(el)
  if (editor && editor.onInitInspect) {
    const initInspectReturns = editor.onInitInspect(componentKey, el, el.state)
    if (!initInspectReturns) return findComponent(el.parent)
  }
  if (componentKey && (components[componentKey] || pages[componentKey])) {
    return el
  }
  return findComponent(el.parent)
}

const onInspect = (app, state, ctx) => {
  const windowOpts = ctx.window || window
  windowOpts.onkeydown = (ev) => {
    if (ev.altKey && ev.shiftKey) {
      app.state.update({ debugging: true, preventSelect: true }, {
        preventUpdate: true,
        preventContentUpdate: true,
        preventRecursive: true
      })
    }
  }
  windowOpts.onkeyup = (ev) => {
    if (app.state.preventSelect && (!ev.altKey || !ev.shiftKey)) {
      app.state.replace({ debugging: false, preventSelect: false }, {
        preventUpdate: true,
        preventContentUpdate: true,
        preventRecursive: true
      })
      app.Inspector.state.update({ area: false })
    }
  }
}

export const Inspect = {
  '.preventSelect': { userSelect: 'none' },
  '!preventSelect': { userSelect: 'auto' },

  onInspect,

  onMousemove: (ev, e, state) => {
    const el = ev.target.ref
    const component = findComponent(el)
    const focusState = e.Inspector.state

    if (!component || !state.debugging || !component.__ref) return focusState.update({ area: false })

    const componentKey = getComponentKey(component)
    const updateValue = (area) => {
      focusState.update({ area, focusKey: componentKey })
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

  onMousedown: (ev, elem, state) => {
    if (!state.debugging) return
    const el = ev.target.ref
    const component = findComponent(el)
    if (!component) return
    const componentKey = getComponentKey(component)
    if (!componentKey) return

    const editor = el.context.editor
    if (editor && editor.onInspect) {
      return editor.onInspect(componentKey, el, el.state, { allowRouterWhileInspect: true })
    }

    const data = JSON.stringify({
      componentKey: `${componentKey}`
    })
    send.call(el.context.socket, 'route', data)

    ev.preventDefault()
    ev.stopPropagation()
    return false
  },

  Inspector: {
    state: {},

    transition: 'all, defaultBezier, X',
    position: 'fixed',
    hide: (el, s) => !(s.area && s.parent.debugging),
    style: {
      boxShadow: '0 0 10px #3686F733, 0 0 0 3px #3686F766, 0 0 100vmax 100vmax #000A',
      zIndex: '9999999',
      borderRadius: '10px',
      pointerEvents: 'none'
    },

    Span: {
      position: 'absolute',
      margin: 'A2 0',
      fontSize: 'Z',
      color: 'text',
      // color: 'blue',
      zIndex: '99999999',
      transition: 'all, defaultBezier, X',
      textDecoration: 'underline',
      fontWeight: '500',
      top: '100%',
      style: {
        boxShadow: '0 25px 10px 35px black',
        textShadow: '0 0 10px black'
      },
      text: '{{ focusKey }}'
    },

    onInit: ({ context }) => {
      const { components } = context

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
    },
    onBeforeUpdate: (ch, el, s) => {
      const { area } = s
      const isDebugging = s.area && s.parent.debugging

      let style
      if (!isDebugging) {
        style = 'display: none !important'
      } else if (area) {
        const { x, y, width, height } = area
        // el.node.style = Object.stringify({
        //   top: y - 6 + 'px',
        //   left: x - 6 + 'px',
        //   width: width + 12 + 'px',
        //   height: height + 12 + 'px'
        // })
        style = `
            display: block !important;
            top: ${y - 6}px;
            left: ${x - 6}px;
            width: ${width + 12}px;
            height: ${height + 12}px;
          `
      }

      el.node.style = style
      el.Span.node.innerText = s.focusKey

      return false
    }
  }
}
