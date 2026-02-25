export const Hero = {
  flow: 'y', // Main flow is now vertical
  width: '100%',
  padding: '0',
  gap: '0',
  position: 'relative',

  // Split Screen Container
  Main: {
    flow: 'x',
    width: '100%',
    height: '70dvh', // Explicit height
    align: 'stretch',

    '@tabletS': {
      flow: 'y',
      height: 'auto'
    },

    // Left Content
    Flex: {
      flow: 'y',
      flex: '1',
      width: '50%',
      // Padding adjusted to account for Navbar
      padding: 'G D E',
      justifyContent: 'center',
      display: 'flex',
      gap: 'D',
      maxWidth: 'I2',
      margin: '- - - auto',
      height: '100%', // Full height

      '@tabletS': {
        width: '100%',
        padding: 'E B',
        height: 'auto'
      },

      Header: {
        tag: 'header',
        flow: 'y',
        gap: 'A',

        H1: {
          text: null,
          color: 'title',
          lineHeight: '1.2',
          maxWidth: 'K',
          '@tabletS': { fontSize: 'G' },
          '@mobileM': { fontSize: 'F' },
          Span: {
            fontWeight: '300',
            text: 'Infra and workspace for',
            display: 'block'
          },
          Strong: {
            fontWeight: '700',
            text: 'Interface Engineers',
            color: 'white'
          }
        },

        P: {
          margin: 'A - - -',
          color: 'gray8',
          fontWeight: '400',
          maxWidth: 'H2',
          lineHeight: '1.6',
          fontSize: 'Z1',
          text: 'Make interfaces once. Reuse them across products, brands, and platforms — without rebuilding UI every time.'
        }
      },

      Nav: {
        tag: 'nav',
        flow: 'y',
        gap: 'A',
        width: '100%',
        maxWidth: 'I',
        margin: 'C - - -B',
        padding: 'C',
        theme: 'dots',

        Label: {
          tag: 'label',
          text: 'CREATE WITH',
          fontSize: 'Z',
          letterSpacing: '1px',
          color: 'gray6',
          fontWeight: '500',
          padding: '- - A -'
        },

        Flex: {
          flow: 'x',
          gap: 'Z2',
          flexWrap: 'nowrap',
          childExtends: ['Link', 'Flex'],
          childProps: {
            align: 'center',
            gap: 'Z2',
            padding: 'Y1 Z2',
            round: 'C',
            cursor: 'pointer',
            fontSize: 'Y2',
            fontWeight: '500',
            flex: '1',
            justifyContent: 'space-between',
            transition: 'opacity .3s ease, border .3s ease',
            theme: 'quaternary',
            whiteSpace: 'nowrap'
          },
          children: [
            {
              Icon: { name: 'claude', fontSize: 'B1', color: '#D97757' },
              Text: { text: 'Claude Code' },
              Icon_2: { name: 'downloadOutline', fontSize: 'Z', color: 'gray6' },
              href: '/docs/claude-code'
            },
            {
              Icon: { name: 'vscode', fontSize: 'A', color: '#007ACC' },
              Text: { text: 'VSCode' },
              Icon_2: { name: 'downloadOutline', fontSize: 'Z', color: 'gray6' },
              href: '/docs/vscode'
            },
            {
              Icon: { name: 'cursorEditor', fontSize: 'B' },
              Text: { text: 'Cursor' },
              Icon_2: { name: 'downloadOutline', fontSize: 'Z', color: 'gray6' },
              href: '/docs/cursor'
            },
            {
              Icon: { name: 'symbols', fontSize: 'B', color: 'blue' },
              Text: { text: 'Web' },
              Icon_2: { name: 'arrowUpRight', fontSize: 'Z', color: 'gray6' },
              href: '/signup'
            }
          ]
        }
      }
    },

    // Right Content (Canvas)
    CanvasEmbed: {
      flex: '1',
      width: '50%',
      maxWidth: '50%',
      height: '100%', // Take full height of Main container
      background: 'gray6',
      round: '0',
      padding: '0',
      project: '/nikoloza/default-flattened',

      '@tabletS': {
        width: '100%',
        height: '50vh'
      }
    }
  }
}
