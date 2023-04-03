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
    draggable:  ({ props }) => props.draggable
  }
}

export const RouterLink = {
  on: {
    click: (event, el, s, ctx) => {
      const { props } = el
      const { router } = ctx.utils
      const root = el.__ref.__root
      const { href } = props
      const firstThree = href[0] + href[1] + href[2]
      const routerOptions = props.routerOptions || {
        scrollToOptions: { behaviour: 'instant' }
      }
      if (href && firstThree !== 'htt' && firstThree !== 'ske') {
        (router || defaultRouter)(root, href, {}, routerOptions)
        event.preventDefault()
      }
    }
  }
}

export const RouteLink = {
  extend: [Link, RouterLink]
}
