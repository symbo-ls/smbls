export const BannerButton = {
  tag: 'label',
  flow: 'y',
  width: '95%',
  theme: 'primary',
  position: 'relative',
  overflow: 'hidden',
  minHeight: 'fit-content',
  padding: 'B1 B2 B C',
  maxWidth: 'J1',
  gap: 'C',
  '@tabletS': {
    margin: 'F1 - -',
  },
  '@mobileS': {
    margin: 'D - D -',
    padding: 'C B B2 B',
  },
  '@mobileXS': {
    padding: 'C A B2 A',
  },
  round: 'A2',
  ':hover, &:focus-within': {
    '> h1': {
      textShadow: 'gray1, 6px, 6px',
      transform: 'translate3d(-0.5%, -1%, 1px)',
    },
  },
  Icon: {
    name: 'arrowUpRight',
    position: 'absolute',
    top: '-E2+B2',
    right: '-F+A2',
    boxSize: 'I1+A ',
    opacity: '.4',
    style: {
      color: 'transparent',
      stroke: 'white',
      strokeWidth: '0.035px',
    },
  },
  H1: {
    lineHeight: '1em',
    padding: '- - X2 -',
    color: 'white',
    fontWeight: '700',
    fontSize: 'K',
    transition: 'A defaultBezier',
    transitionProperty: 'text-shadow, transform',
    '@mobileS': {
      textAlign: 'center',
      lineHeight: '1.2em',
      padding: '- Z',
    },
    text: 'Join the waitlist',
    textShadow: 'none',
    transform: 'none',
  },
  Flex: {
    align: 'end space-between',
    '@tabletS': {
      flow: 'y',
      align: 'start space-between',
      gap: 'D',
    },
    Flex_1: {
      flow: 'y',
      gap: 'A',
      JoinWaitlist: {
        position: 'relative',
        theme: 'document',
        margin: '- - - -Z',
        Button: {
          theme: '',
          '@mobileS': {
            align: 'center center',
            minWidth: '100%',
          },
        },
        '@mobileS': {
          margin: '0',
          flow: 'y',
          round: 'B',
          gap: 'A',
          minWidth: '100%',
          align: 'center flex-start',
        },
      },
      Asterisk: {
        '@mobileS': {
          textAlign: 'center',
          padding: '- Z',
        },
        text: `* We'll only email you about invitation`,
      },
      '@mobileS': {
        align: 'center flex-start',
        minWidth: '100%',
      },
    },
    Flex_2: {
      gap: 'A2',
      align: 'center',
      position: 'relative',
      '@tabletS': {
        alignSelf: 'flex-end',
      },
      '@mobileL': {
        alignSelf: 'flex-start',
      },
      '@mobileS': {
        flow: 'y',
        align: 'center flex-start',
        gap: 'B',
        alignSelf: 'center',
      },
      P: {
        margin: '0',
        text: 'Want to skip the queue?',
        fontWeight: '400',
        color: 'title',
        '@mobileS': {
          margin: '0',
        },
      },
      Link: {
        '@tabletS': {
          padding: '0',
        },
        extends: [
          'Link',
          'Button',
        ],
        text: 'Book a demo',
        gap: 'X',
        href: 'https://cal.com/symbols-josh/early-access',
        target: '_blank',
        theme: null,
        background: 'none',
        color: 'title',
        textDecoration: 'none',
        ':hover': {
          textDecoration: 'underline',
        },
        Icon: {
          name: 'arrowUpRight',
        },
        '@mobileM': {
          padding: '0',
        },
        style: {
          color: 'white',
        },
      },
    },
    '@mobileS': {
      align: 'flex-start flex-start',
    },
  },
};