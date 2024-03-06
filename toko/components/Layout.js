export const Layout = {
  extend: [
    'Flex',
  ],
  props: {
    theme: 'document',
    minHeight: '100%',
    padding: 'C C2',
    flow: 'column',
    flex: 1,
    gap: 'D',
    '@tabletS': {
      padding: 'B',
    },
    '@mobileXS': {
      padding: 'X2',
    },
  },
  Logo: {
  },
  Flex: {
    props: {
      gap: 'D',
    },
    Flex: {
    },
  },
  ShortNav: {
  },
  Addresses: {
  },
};