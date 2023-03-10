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
    draggable: true
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
      const { router } = ctx.utils
      const root = el.__ref.__root
      const { href } = el.props
      const firstThree = href[0] + href[1] + href[2]
      if (href && firstThree !== 'htt' && firstThree !== 'ske') {
        (router || defaultRouter)(root, href, {})
        event.preventDefault()
      }
    }
  }
}

export const RouteLink = {
  extend: [Link, RouterLink]
}
