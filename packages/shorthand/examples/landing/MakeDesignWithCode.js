export const MakeDesignWithCode = {
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
      margin: '- - -',
      lineHeight: 1.2,
      '@mobileL': {
        display: 'flex',
        flexFlow: 'y',
        lineHeight: '1.2em',
      },
      '@mobileS': {
        fontSize: 'J2',
      },
      Strong: {
        text: 'Engineering the interface layer',
        '@mobileL': {
          display: 'none',
        },
      },
    },
    H6: {
      margin: 'X - -',
      color: 'title',
      fontWeight: '300',
      maxWidth: 'G3+C',
      text: 'Symbols is all-in-one solution to build pages, design systems, component libraries, widgets and apps in one go.',
    },
  },
};