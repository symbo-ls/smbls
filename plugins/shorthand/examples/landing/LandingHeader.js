export const LandingHeader = {
  flow: 'x',
  padding: 'X2 A X2 Z',
  alignItems: 'center',
  minWidth: '100%',
  border: 'none',
  fontSize: '1rem',
  '@screenL': {},
  '@screenM': {},
  '@screenS': {},
  '@mobileM': {},
  '@mobileXS': {
    padding: 'A1 Z',
  },
  '@tabletS': {
    padding: 'A1 A',
  },
  theme: 'header',
  Logo: {
    position: 'relative',
    icon: 'logo',
    top: 'auto',
    left: 'auto',
    margin: '- B - -',
    '@tabletS': {
      fontSize: 'E',
      margin: '- 0 - -',
      padding: '0',
    },
    theme: 'transparent',
  },
  Nav: {
    flexFlow: 'x',
    gap: 'C',
    childExtends: 'DocsLink',
    childProps: {
      color: 'title',
      fontWeight: '400',
    },
    children: [
      {
        href: '/explore',
        text: '/',
        Strong: {
          color: 'title',
          fontWeight: '600',
          text: 'explore',
        },
      },
      {
        href: '/developers',
        text: '/',
        Strong: {
          color: 'title',
          fontWeight: '600',
          text: 'developers',
        },
      },
      {
        href: '/pricing',
        text: '/',
        Strong: {
          color: 'title',
          fontWeight: '600',
          text: 'pricing',
        },
      },
    ],
    '@tabletS': {
      display: 'none',
    },
  },
  P: {
    extends: 'Flex',
    text: 'of single source',
    fontWeight: '100',
    color: 'title',
    flow: 'row-reverse',
    margin: '0 auto',
    gap: 'W2',
    Span: {
      text: 'Symbols',
      fontWeight: '700',
      color: 'title',
    },
    '@mobileS': {},
  },
  Nav_2: {
    flexFlow: 'x',
    gap: 'C',
    childExtends: 'DocsLink',
    childProps: {
      color: 'title',
      fontWeight: '400',
    },
    '@tabletS': {
      display: 'none',
    },
    children: [
      {
        color: 'caption',
        fontWeight: '300',
        href: '/docs/resources',
        text: '/support',
      },
      {
        color: 'caption',
        fontWeight: '300',
        href: '/signin',
        text: '/signin',
      },
      {
        href: '/signup',
        text: '/',
        Strong: {
          color: 'title',
          fontWeight: '600',
          text: 'create-account',
        },
      },
    ],
  },
  MenuIcon: {
    display: 'none',
    '@tabletS': {
      display: 'flex',
    },
    onClick: (event, element, state) => state.toggle('activeMenu'),
  },
};