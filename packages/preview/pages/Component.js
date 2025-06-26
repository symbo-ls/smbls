'use strict'

export const Component = {
  display: 'flex',
  align: 'center center',
  minHeight: '100vh',
  smblsHeader: {
    if: () => {
      const urlParams = new URLSearchParams(window.location.search)
      return !urlParams.get('hideUi') || !urlParams.get('fullsize')
    },
    display: 'flex',
    align: 'center space-between',
    position: 'absolute',
    inset: '0 0 auto 0',
    background: 'black 0.15',
    padding: 'Z A',
    'Link+SquareButton': {
      Icon: { name: 'symbols', fontSize: 'B' },
      href: '/'
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
        href: `https://symbols.app/?activeProject=${activeProject}&selected=${key}`,
        // href: () => `https://symbols.app/?activeProject=${window.location.host.split('.')[0]}&selected=${key}`,
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
      display: 'flex',
      state: schema.state,
      class: 'component',
      align: 'center center',
      boxSize: fullsize ? '100dvh 100dvw' : `${height} ${width}`,
      [key]: fullsize
        ? {
            ...schema.props?.demoComponent,
            boxSize: '100dvh 100dvw'
          }
        : schema.props?.demoComponent || {}
    }
  }
}
