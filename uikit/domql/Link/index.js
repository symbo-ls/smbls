'use strict'

import { router as defaultRouter } from '@domql/router'
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
    href: (el, s, ctx) => {
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
    click: (event, el, s, ctx) => {
      const { props } = el
      const { utils, routerOptions } = ctx
      const { router } = utils
      const root = el.__ref.__root
      const { href } = props
      const linkIsExternal = href.includes('mailto') ||
        href.includes('http') ||
        href.includes('tel')
      const options = props.routerOptions || routerOptions || {
        scrollToOptions: { behaviour: 'instant' }
      }
      if (href && linkIsExternal) {
        (router || defaultRouter)(href, root, {}, options)
        event.preventDefault()
      }
    }
  }
}

export const RouteLink = {
  extend: [Link, RouterLink]
}
