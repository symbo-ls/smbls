export default {
  "extend": [
    "Link"
  ],
  "props": "({\n        state\n      }) => ({\n        flexFlow: 'column',\n        gap: 'Y2',\n        textDecoration: 'none',\n        color: 'white',\n        href: state.href,\n        '@tabletS': {\n          align: 'center center'\n        },\n        '@mobileL': {\n          gap: 'V'\n        }\n      })",
  "icon": {
    "extend": "MenuIcon",
    "props": "(element, s) => {\n          const {\n            parent,\n            context\n          } = element\n          const {\n            SVG_DATA\n          } = context.designSystem\n\n          let active\n          const {\n            href\n          } = parent.props\n          const route = context.utils.getActiveRoute(0)\n          const pageKey = s.__root.active && s.__root.active.split('/')[0]\n          if (href && s.__root) active = route === href\n          const activePage = pageKey || 'philosophy'\n\n          if (!SVG_DATA) return\n          return {\n            active,\n            src: active ? SVG_DATA.documentActive : SVG_DATA.document,\n            theme: active ? `${activePage} .onlyColor` : 'transparent'\n          }\n        }"
  },
  "span": {
    "text": "({\n          state\n        }) => state.text"
  }
};