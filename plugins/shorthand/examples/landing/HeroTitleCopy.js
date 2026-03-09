export const HeroTitleCopy = {
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
      lineHeight: '1.2',
      maxWidth: 'G',
      '@mobileL': {
        lineHeight: '1.3em',
      },
      '@mobileS': {
        fontSize: 'J2',
      },
      children: [
        {
          fontWeight: '300',
          text: 'Your browser tab is now ',
        },
        {
          text: ' IDE, framework and deployment',
        },
      ],
    },
    H6: {
      color: 'title',
      fontWeight: '300',
      maxWidth: 'H',
      text: 'Rebuilding features wastes time. Ship or enhance production ready web projects in record time.',
    },
  },
};