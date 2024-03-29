'use strict'

import { router as defaultRouter } from '@domql/router'
import { exec, isDefined } from '@domql/utils'
import { Focusable } from '@symbo.ls/atoms'

export const Link = {
  extend: Focusable,
  tag: 'a',
  props: {
    aria: {},
    fontWeight: 'bold',
    textDecoration: 'none',
    color: 'currentColor',
    draggable: false
  },
  attr: {
    href: (el) => {
      const { context: ctx } = el
      const { exec } = ctx.utils
      return exec(el.props.href, el) || exec(el.props, el).href
    },
    target: ({ props }) => props.target,
    'aria-label': ({ props }) => props.aria ? props.aria.label : props.text,
    draggable: ({ props }) => props.draggable
  }
}

export const RouterLink = {
  on: {
    click: (event, el, s) => {
      const { props, context: ctx } = el
      const { href: h, scrollToTop, stopPropagation } = props
      const href = exec(h, el, s)
      if (stopPropagation) event.stopPropagation()
      if (!href) return
      const { utils, snippets, routerOptions } = ctx
      const root = el.__ref.root
      const linkIsExternal = href.includes('http://') ||
        href.includes('https://') ||
        href.includes('mailto:') ||
        href.includes('tel:')
      if (href && !linkIsExternal) {
        try {
          (snippets.router || utils.router || defaultRouter)(href, root, {}, {
            scrollToOptions: { behaviour: 'instant' },
            scrollToTop: isDefined(scrollToTop) ? scrollToTop : true,
            ...routerOptions,
            ...props.routerOptions
          })
          event.preventDefault()
        } catch (e) {
          console.warn(e)
        }
      }
    }
  }
}

export const RouteLink = {
  extend: [Link, RouterLink]
}
