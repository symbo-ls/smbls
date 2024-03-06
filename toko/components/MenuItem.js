export const MenuItem = {
  extend: [
    'Link',
  ],
  props: ({
        state
      }) => ({
        flexFlow: 'column',
        gap: 'Y2',
        textDecoration: 'none',
        color: 'white',
        href: state.href,
        '@tabletS': {
          align: 'center center'
        },
        '@mobileL': {
          gap: 'V'
        }
      }),
  icon: {
    extend: 'MenuIcon',
    props: (element, s) => {
          const {
            parent,
            context
          } = element
          const {
            SVG_DATA
          } = context.designSystem

          let active
          const {
            href
          } = parent.props
          const route = context.utils.getActiveRoute(0)
          const pageKey = s.__root.active && s.__root.active.split('/')[0]
          if (href && s.__root) active = route === href
          const activePage = pageKey || 'philosophy'

          if (!SVG_DATA) return
          return {
            active,
            src: active ? SVG_DATA.documentActive : SVG_DATA.document,
            theme: active ? `${activePage} .onlyColor` : 'transparent'
          }
        },
  },
  span: {
    text: ({
          state
        }) => state.text,
  },
};