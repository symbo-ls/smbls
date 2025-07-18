'use strict'

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
  on: {
    click: (event, el, s) => {
      const { props, context: ctx } = el
      const { href: h, scrollToTop, stopPropagation } = props
      let href = el.call('exec', h, el)

      if (el.call('isString', href) && href.includes('{{')) {
        href = el.call('replaceLiteralsWithObjectFields', href)
      }

      if (stopPropagation) event.stopPropagation()
      if (!href) return
      const { routerOptions } = ctx
      const root = el.__ref.root
      const linkIsExternal =
        href.includes('http://') ||
        href.includes('https://') ||
        href.includes('mailto:') ||
        href.includes('tel:')
      if (href && !linkIsExternal) {
        try {
          el.call(
            'router',
            href,
            root,
            {},
            {
              scrollToOptions: { behaviour: 'instant' },
              scrollToTop: el.call('isDefined', scrollToTop)
                ? scrollToTop
                : true,
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
}

export const RouteLink = {
  extend: [Link, RouterLink]
}
