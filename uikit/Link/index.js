'use strict'

import { router } from '@domql/router'
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
    href: element => {
      const { exec } = element.context.utils
      return exec(element.props.href, element) || exec(element.props, element).href
    },
    target: ({ props }) => props.target,
    'aria-label': ({ props }) => props.aria ? props.aria.label : props.text,
    draggable:  ({ props }) => props.draggable
  }
}

export const RouterLink = {
  on: {
    click: (event, element, state) => {
      const root = element.__ref.__root
      const { href } = element.props
      const firstThree = href[0] + href[1] + href[2]
      if (href && firstThree !== 'htt' && firstThree !== 'ske') {
        router(root, href, {})
        event.preventDefault()
      }
    }
  }
}

export const RouteLink = {
  extend: [Link, RouterLink]
}
