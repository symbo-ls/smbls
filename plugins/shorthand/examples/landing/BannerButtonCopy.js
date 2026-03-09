export const BannerButtonCopy = {
  extends: 'Link',
  width: '95%',
  theme: 'primary',
  position: 'relative',
  overflow: 'hidden',
  minHeight: 'fit-content',
  href: '/pricing',
  padding: 'C B2 B2 B2',
  maxWidth: 'J1',
  margin: 'E2 - D -',
  '@tabletS': {
    margin: 'F1 - -',
  },
  '@mobileS': {
    margin: 'D - D -',
  },
  '@mobileXS': {
    padding: 'C B B2 B',
  },
  round: 'A2',
  ':hover': {
    '> h1': {
      textShadow: 'gray1, 10px, 10px',
      transform: 'translate3d(-1%, -2%, 1px)',
    },
  },
  '@mobileL': {},
  H1: {
    lineHeight: '1em',
    padding: '- - X -',
    color: 'white',
    fontWeight: '700',
    fontSize: 'K',
    maxWidth: 'D3',
    transition: 'A defaultBezier',
    transitionProperty: 'text-shadow, transform',
    text: 'Get lifetime access now',
    '@mobileL': {},
  },
  Flex: {
    gap: 'A2',
    padding: 'B - - -',
    '@mobileS': {
      flow: 'y',
      align: 'flex-start flex-start',
      gap: 'A',
    },
    P: {
      text: 'Need a personalized invite?',
      fontWeight: '400',
      '@mobileS': {
        margin: '0',
      },
    },
    DocsLink: {
      extends: [
        'DocsLink',
        'Button',
      ],
      text: 'Book a demo',
      gap: 'X',
      href: 'https://cal.com/symbols-josh/early-access',
      target: '_blank',
      background: 'none',
      color: 'white',
      textDecoration: 'none',
      Icon: {
        name: 'arrowUpRight',
      },
      '@mobileM': {
        padding: '0',
      },
    },
  },
  Icon: {
    name: 'arrowUpRight',
    position: 'absolute',
    top: '-E2+B2',
    right: '-F+A2',
    boxSize: 'I1+A ',
    '@mobileL': {
      opacity: '.4',
    },
    style: {
      color: 'transparent',
      stroke: 'white',
      strokeWidth: '0.035px',
    },
  },
};