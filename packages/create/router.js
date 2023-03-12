'use strict'

import { router } from '@domql/router'
import { Link, RouterLink } from 'smbls'
import { deepMerge } from '@domql/utils'

const DEFAULT_ROUTING_OPTIONS = {
  initRouter: true,
  injectRouterInLinkComponent: true
}

export const initRouter = (root, options = DEFAULT_ROUTING_OPTIONS) => {
  if (options === true) options = DEFAULT_ROUTING_OPTIONS

  const onRender = (el, s) => {
    router(el, window.location.pathname, {})
  }

  if (options.initRouter) {
    if (root.on) {
      root.on.render = onRender
    } else {
      root.on = {
        render: onRender
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
