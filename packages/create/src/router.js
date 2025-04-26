'use strict'

import { router as defaultRouter } from '@domql/router'
import { window, deepMerge, merge, isUndefined } from '@domql/utils'
import { Link, RouterLink } from '@symbo.ls/uikit'

const DEFAULT_ROUTING_OPTIONS = {
  initRouter: true,
  injectRouterInLinkComponent: true,
  popState: true
}

export const initRouter = (element, context) => {
  if (context.router === false) return
  else if (context.router === true) context.router = DEFAULT_ROUTING_OPTIONS
  else merge(context.router || {}, DEFAULT_ROUTING_OPTIONS)

  const routerOptions = context.router
  const router =
    context.utils && context.utils.router ? context.utils.router : defaultRouter

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
export const popStateRouter = (element, context) => {
  if (popStateFired) return
  popStateFired = true
  const routerOptions = context.router || DEFAULT_ROUTING_OPTIONS
  if (!routerOptions.popState) return
  const router =
    context.utils && context.utils.router ? context.utils.router : defaultRouter
  window.onpopstate = async event => {
    const { pathname, search, hash } = window.location
    const url = pathname + search + hash
    await router(
      url,
      element,
      {},
      { pushState: false, scrollToTop: false, level: 0, event }
    )
  }
}

export const injectRouterInLinkComponent = routerOptions => {
  if (routerOptions && routerOptions.injectRouterInLinkComponent) {
    return deepMerge(Link, RouterLink)
  }
}
