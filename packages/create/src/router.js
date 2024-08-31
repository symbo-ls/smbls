'use strict'

import { router as defaultRouter } from '@domql/router'
import { window, deepMerge, merge, isUndefined } from '@domql/utils'
import { Link, RouterLink } from '@symbo.ls/uikit'

const DEFAULT_ROUTING_OPTIONS = {
  initRouter: true,
  injectRouterInLinkComponent: true,
  popState: true
}

export const initRouter = (element, options) => {
  if (options.router === false) return
  else if (options.router === true) options.router = DEFAULT_ROUTING_OPTIONS
  else merge(options.router || {}, DEFAULT_ROUTING_OPTIONS)

  const routerOptions = options.router
  const router = (options.snippets && options.snippets.router) ? options.snippets.router : defaultRouter

  const onRouterRenderDefault = (el, s) => {
    const { pathname, search, hash } = window.location
    const url = pathname + search + hash
    if (el.routes) router(url, el, {}, { initialRender: true })
  }

  const hasRenderRouter = element.on && !isUndefined(element.on.renderRouter)
  if (routerOptions && routerOptions.initRouter && !hasRenderRouter) {
    if (element.on) {
      element.on.renderRouter = onRouterRenderDefault
    } else {
      element.on = {
        renderRouter: onRouterRenderDefault
      }
    }
  }

  injectRouterInLinkComponent(routerOptions)

  return routerOptions
}

let popStateFired
export const popStateRouter = (element, options) => {
  if (popStateFired) return
  popStateFired = true
  const routerOptions = options.router || DEFAULT_ROUTING_OPTIONS
  if (!routerOptions.popState) return
  const router = (options.snippets && options.snippets.router)
    ? options.snippets.router
    : defaultRouter
  window.onpopstate = e => {
    const { pathname, search, hash } = window.location
    const url = pathname + search + hash
    router(url, element, {}, { pushState: false, scrollToTop: false, level: 0 })
  }
}

export const injectRouterInLinkComponent = (routerOptions) => {
  if (routerOptions && routerOptions.injectRouterInLinkComponent) {
    return deepMerge(Link, RouterLink)
  }
}
