export const MakeDesignWithCodeCopy = {
  props: {},
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
      lineHeight: '1em',
      '@mobileL': {
        display: 'flex',
        flexFlow: 'y',
        lineHeight: '1.2em',
      },
      '@mobileS': {
        fontSize: 'J2',
      },
      Strong: {
        text: 'The Most Advanced Front-end Editor',
      },
      Text: {
        fontWeight: '300',
        text: 'with no-code, marketplace and AI',
        margin: 'W - X',
        '@mobileL': {
          display: 'none',
        },
      },
    },
    H6: {
      color: 'title',
      fontWeight: '300',
      maxWidth: 'G3+C',
      text: 'Symbols is all-in-one solution to build pages, design systems, component libraries, widgets and apps online.',
    },
  },
};