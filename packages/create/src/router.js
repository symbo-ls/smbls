'use strict'

import { router as defaultRouter } from '@domql/router'
import { window } from '@domql/globals'
import { Link, RouterLink } from '@symbo.ls/uikit'
import { deepMerge, merge, isUndefined } from '@domql/utils'

const DEFAULT_ROUTING_OPTIONS = {
  initRouter: true,
  injectRouterInLinkComponent: true,
  popState: true
}

export const initRouter = (element, options) => {
  let routerOptions = merge(options.router || {}, DEFAULT_ROUTING_OPTIONS)

  if (routerOptions === false) return
  if (routerOptions === true) routerOptions = DEFAULT_ROUTING_OPTIONS

  const router = (options.snippets && options.snippets.router) ? options.snippets.router : defaultRouter

  const onRouterRenderDefault = (el, s) => {
    const { pathname, hash } = window.location
    const url = pathname + hash
    if (el.routes) router(url, el, {}, { initialRender: true })
  }

  const hasRenderRouter = element.on && !isUndefined(element.on.renderRouter)
  if (routerOptions.initRouter && !hasRenderRouter) {
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
  const router = (options.snippets && options.snippets.router) ? options.snippets.router : defaultRouter
  window.onpopstate = e => {
    const { pathname, hash } = window.location
    const url = pathname + hash
    router(url, element, {}, { pushState: false, level: 0 })
  }
}

export const injectRouterInLinkComponent = (routerOptions) => {
  if (routerOptions.injectRouterInLinkComponent) {
    return deepMerge(Link, RouterLink)
  }
}
