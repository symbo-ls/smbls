export const LandingNavbarCopy = {
  extends: 'Navbar',
  gap: 'A2',
  round: 'C1',
  padding: 'X2 Z2',
  fontSize: 'Z2',
  userSelect: 'none',
  theme: 'common-box',
  position: 'absolute',
  top: 'W1',
  left: 'X',
  right: 'X',
  zIndex: 9999999,
  Logo: {
    position: 'relative',
    icon: 'logo',
    top: 'auto',
    left: 'auto',
    theme: 'transparent',
    margin: '- B - -',
    '@tabletS': {
      fontSize: 'E',
      margin: '- 0 - -',
      padding: '0',
    },
  },
  Nav: {
    flexFlow: 'x',
    gap: 'C',
    '@tabletS': {
      display: 'none',
    },
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
    '@tabletS': {
      display: 'none',
    },
    childExtends: 'DocsLink',
    childProps: {
      color: 'title',
      fontWeight: '400',
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