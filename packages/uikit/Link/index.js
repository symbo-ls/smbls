'use strict'

import { router as defaultRouter } from '@domql/router'

export const Link = {
  extend: 'Focusable',
  tag: 'a',
  props: {
    aria: {},
    fontWeight: 'bold',
    textDecoration: 'none',
    color: 'currentColor',
    draggable: false
  },
  attr: {
    href: (el, s, ctx) => {
      const { isString, exec, replaceLiteralsWithObjectFields } = ctx.utils
      const href = exec(el.props.href, el) || exec(el.props, el).href
      if (isString(href) && href.includes('{{')) {
        return replaceLiteralsWithObjectFields(href, s)
      }
      return href
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
      const { exec, isString, replaceLiteralsWithObjectFields, isDefined } = ctx.utils
      let href = exec(h, el, s)

      if (isString(href) && href.includes('{{')) {
        href = replaceLiteralsWithObjectFields(href, s)
      }

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
