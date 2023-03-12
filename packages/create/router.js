'use strict'

import { router } from '@domql/router'
import { Link, RouterLink } from 'smbls'
import { deepMerge } from '@domql/utils'

const DEFAULT_ROUTING_OPTIONS = {
  initRouter: true,
  injectRouterInLinkComponent: true
}

export const initRouter = (root, options = DEFAULT_ROUTING_OPTIONS) => {
  if (options === false) return
  if (options === true) options = DEFAULT_ROUTING_OPTIONS

  const onRender = (el, s) => {
    if (el.routes) router(el, window.location.pathname, {})
  }

  if (options.initRouter) {
    if (root.on) {
      root.on.renderRouter = onRender
    } else {
      root.on = {
        renderRouter: onRender
      }
    }
  }

  if (options.injectRouterInLinkComponent) {
    injectRouterInLinkComponent(options)
  }
}

export const injectRouterInLinkComponent = () => {
  return deepMerge(Link, RouterLink)
}
