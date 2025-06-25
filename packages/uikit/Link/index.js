'use strict'

import { router as defaultRouter } from '@domql/router'

export const Link = {
  extends: 'Focusable',
  tag: 'a',

  aria: {},
  fontWeight: 'bold',
  textDecoration: 'none',
  color: 'currentColor',
  draggable: false,

  attr: {
    href: (el, s, ctx) => {
      const props = el.props
      const href =
        el.call('exec', props.href, el) ||
        el.call('exec', el.call('exec', props, el).href, el)
      if (el.call('isString', href) && href.includes('{{')) {
        return el.call('replaceLiteralsWithObjectFields', href)
      }
      return href
    },
    target: ({ props }) => props.target,
    'aria-label': ({ props }) => (props.aria ? props.aria.label : props.text),
    draggable: ({ props }) => props.draggable
  }
}

export const RouterLink = {
  onClick: (event, el, s) => {
    const { props, context: ctx } = el
    const { href: h, scrollToTop, stopPropagation } = props
    let href = el.call('exec', h, el)

    if (el.call('isString', href) && href.includes('{{')) {
      href = el.call('replaceLiteralsWithObjectFields', href)
    }

    if (stopPropagation) event.stopPropagation()
    if (!href) return
    const { utils, snippets, functions, routerOptions } = ctx
    const root = el.__ref.root
    const linkIsExternal =
      href.startsWith('http://') ||
      href.startsWith('https://') ||
      href.startsWith('mailto:') ||
      href.startsWith('tel:') ||
      href.startsWith('sketch:') ||
      href.startsWith('whatsapp:') ||
      href.startsWith('sms:') ||
      href.startsWith('skype:') ||
      href.startsWith('viber:') ||
      href.startsWith('callto:') ||
      href.startsWith('facetime:') ||
      href.startsWith('facetime-audio:') ||
      href.startsWith('geo:') ||
      href.startsWith('maps:')
    if (href && !linkIsExternal) {
      try {
        ;(functions.router || snippets.router || utils.router || defaultRouter)(
          href,
          root,
          {},
          {
            scrollToOptions: { behaviour: 'instant' },
            scrollToTop: el.call('isDefined', scrollToTop) ? scrollToTop : true,
            ...routerOptions,
            ...props.routerOptions
          }
        )
        event.preventDefault()
      } catch (e) {
        console.warn(e)
      }
    }
  }
}

export const RouteLink = {
  extends: [Link, RouterLink]
}
