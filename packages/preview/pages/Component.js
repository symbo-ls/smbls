'use strict'

export const Component = {
  extend: 'Flex',
  props: {
    align: 'center center',
    minHeight: '100vh'
  },

  smblsHeader: {
    if: () => {
      const urlParams = new URLSearchParams(window.location.search)
      return !urlParams.get('hideUi') || !urlParams.get('fullsize')
    },
    extend: 'Flex',
    props: {
      align: 'center space-between',
      position: 'absolute',
      inset: '0 0 auto 0',
      background: 'black 0.15',
      padding: 'Z A'
    },
    'Link+SquareButton': {
      Icon: { name: 'symbols', fontSize: 'B' },
      href: () => {
        const marketplaceProjects = [
          'default.symbo.ls',
          'ecommerce.symbo.ls',
          'forms.symbo.ls',
          'ai.symbo.ls',
          'web3.symbo.ls',
          'marketing.symbo.ls',
          'docs.symbo.ls',
          'charts.symbo.ls',
          'ui.symbo.ls',
          'cms.symbo.ls',
          'code.symbo.ls',
          'miscellaneous.symbo.ls'
        ]
        if (marketplaceProjects.includes(window.location))
          return 'http://symbols.app/explore'
        return '/'
      },
      text: null
    },
    OpenInSymbols: () => {
      const urlParams = new URLSearchParams(window.location.search)
      const key = urlParams.get('key') || 'Logo'
      const screenshot = urlParams.get('screenshot')
      const activeProject = window.location.host.split('.')[0]
      return {
        extends: ['Link', 'Button'],
        target: '_blank',
        padding: 'Z A',
        fontSize: 'Z2',
        href: () =>
          `https://symbols.app/?activeProject=${activeProject}&selected=${key}`,
        text: screenshot ? window.location.host : 'Open in Symbols'
      }
    }
  },

  Component: (el, s, ctx) => {
    const urlParams = new URLSearchParams(window.location.search)
    const width = urlParams.get('width') || '860px'
    const height = urlParams.get('height') || '560px'
    // const theme = urlParams.get('theme') || 'dark'
    const key = urlParams.get('key') || 'Logo'
    const hideUi = urlParams.get('hideUi')
    const fullsize = hideUi || urlParams.get('fullsize')
    const factory = key.startsWith('/') ? 'pages' : 'components'
    const schema = ctx.schema[factory][key]
    return {
      key,
      extend: 'Flex',
      state: schema.state,
      props: () => ({
        class: 'component',
        align: 'center center',
        boxSize: fullsize ? '100dvh 100dvw' : `${height} ${width}`
      }),
      [key]: fullsize
        ? {
            ...schema.props?.demoComponent,
            boxSize: '100dvh 100dvw'
          }
        : schema.props?.demoComponent || {}
    }
  }
}
