'use strict'

import { window, deepMerge, merge, isUndefined } from '@domql/utils'
import { router as defaultRouter } from '@domql/router'

const DEFAULT_ROUTING_OPTIONS = {
  initRouter: true,
  injectRouterInLinkComponent: true,
  popState: true
}

export const resolveRouterElement = (root, path) => {
  if (!path) return root
  const parts = Array.isArray(path) ? path : path.split('.')
  let el = root
  for (const part of parts) {
    if (!el || !el[part]) return null
    el = el[part]
  }
  return el
}

export const initRouter = (element, context) => {
  if (context.router === false) return
  else if (context.router === true) context.router = DEFAULT_ROUTING_OPTIONS
  else context.router = merge(context.router || {}, DEFAULT_ROUTING_OPTIONS)

  const routerOptions = context.router

  const onRouterRenderDefault = async (el, s) => {
    if (!window.location) return
    const { pathname, search, hash } = window.location
    const url = pathname + search + hash

    let targetEl = el
    if (routerOptions.customRouterElement) {
      const resolved = resolveRouterElement(el, routerOptions.customRouterElement)
      if (resolved) {
        targetEl = resolved
        if (el.routes) targetEl.routes = el.routes
      }
    }

    if (targetEl.routes) await defaultRouter(url, targetEl, {}, { initialRender: true })
  }

  const hasRenderRouter =
    (element.on && !isUndefined(element.on.renderRouter)) ||
    !isUndefined(element.onRenderRouter) // || element.on.renderRouter
  if (routerOptions && routerOptions.initRouter && !hasRenderRouter) {
    if (element.on) {
      element.on.renderRouter = onRouterRenderDefault
    } else {
      element.on = {
        renderRouter: onRouterRenderDefault
      }
    }
  }

  injectRouterInLinkComponent(context, routerOptions)

  return routerOptions
}

let popStateFired
export const onpopstateRouter = (element, context) => {
  if (popStateFired) return
  popStateFired = true
  const routerOptions = context.router || DEFAULT_ROUTING_OPTIONS
  if (!routerOptions.popState) return
  const router =
    context.utils && context.utils.router ? context.utils.router : defaultRouter

  window.onpopstate = async e => {
    const { pathname, search, hash } = window.location
    const url = pathname + search + hash

    let targetEl = element
    if (routerOptions.customRouterElement) {
      const resolved = resolveRouterElement(element, routerOptions.customRouterElement)
      if (resolved) {
        targetEl = resolved
        if (element.routes) targetEl.routes = element.routes
      }
    }

    await targetEl.call(
      'router',
      url,
      targetEl,
      {},
      { pushState: false, scrollToTop: false, level: 0, event: e }
    )
  }
}

export const injectRouterInLinkComponent = (context, routerOptions) => {
  const { components } = context
  if (routerOptions && routerOptions.injectRouterInLinkComponent) {
    return deepMerge(
      components['Link'] || components['smbls.Link'],
      components['RouterLink'] || components['smbls.RouterLink']
    )
  }
}
