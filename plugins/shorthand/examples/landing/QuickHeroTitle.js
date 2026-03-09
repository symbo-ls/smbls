export const QuickHeroTitle = {
  Flex: {
    zIndex: '2',
    flexFlow: 'y',
    flexAlign: 'center',
    textAlign: 'center',
    color: 'title',
    gap: 'A',
    '@mobileL': {
      gap: 'B',
      padding: '- B2',
    },
    H1: {
      color: 'title',
      text: null,
      fontSize: 'G+X',
      lineHeight: '1.2',
      maxWidth: 'G',
      '@mobileL': {
        lineHeight: '1.3em',
      },
      '@mobileS': {
        fontSize: 'J2',
      },
      Span: {
        fontWeight: '300',
        text: 'Build reusable ',
      },
      Strong: {
        text: 'web features ',
      },
      Br: {},
      Strong_2: {
        text: 'in seconds',
      },
      Span_2: {
        fontWeight: '300',
        text: ', not days',
      },
    },
    H6: {
      color: 'title',
      fontWeight: '300',
      maxWidth: 'H2',
      text: 'Rebuilding features wastes time. Symbols enables frontend teams to build lego-like features. Ship or enhance production ready web projects in record time.',
    },
  },
};