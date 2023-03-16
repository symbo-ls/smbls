'use strict'

import { router as defaultRouter } from '@domql/router'
import { Link, RouterLink } from '@symbo.ls/uikit'
import { deepMerge } from '@domql/utils'

const DEFAULT_ROUTING_OPTIONS = {
  initRouter: true,
  injectRouterInLinkComponent: true,
  popState: true
}

export const initRouter = (root, options) => {
  let routerOptions = options.routerOptions || DEFAULT_ROUTING_OPTIONS

  if (routerOptions === false) return
  if (routerOptions === true) routerOptions = DEFAULT_ROUTING_OPTIONS

  const router = options.snippets && options.snippets.router || defaultRouter

  const onRender = (el, s) => {
    if (el.routes) router(el, window.location.pathname, {})
  }

  if (routerOptions.initRouter) {
    if (root.on) {
      root.on.renderRouter = onRender
    } else {
      root.on = {
        renderRouter: onRender
      }
    }
  }

  injectRouterInLinkComponent(routerOptions)

  return router
}

export const popStateRouter = (root, options) => {
  const routerOptions = options.routerOptions || DEFAULT_ROUTING_OPTIONS
  if (!routerOptions.popState) return
  const router = options.snippets && options.snippets.router || defaultRouter
  window.onpopstate = e => router(root, window.location.pathname, {}, 0, false)
}

export const injectRouterInLinkComponent = (routerOptions) => {
  if (routerOptions.injectRouterInLinkComponent)
    return deepMerge(Link, RouterLink)
}
