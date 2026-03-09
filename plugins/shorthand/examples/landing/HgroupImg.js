export const HgroupImg = {
  extend: 'Flex',
  props: {
    gap: 'F1+X',
    maxWidth: 'fit-content',
    '@tabletM': {
      gap: 'C',
    },
    '@tabletS': {
      flow: 'y',
      gap: 'D',
      align: 'center flex-start',
    },
    '@mobileM': {
      gap: 'F',
      maxWidth: '100%',
    },
  },
  Hgroup: {
    gap: 'B',
    '@tabletS': {},
    '@mobileM': {
      padding: '- B2',
    },
    H: {
      tag: 'h1',
      text: 'Lifetime access is available now',
      fontSize: 'G1',
      fontWeight: '700',
      maxWidth: 'E+A',
      lineHeight: '1.2em',
      '@tabletM': {
        fontSize: 'G',
      },
      '@mobileL': {
        fontSize: 'F',
      },
    },
    P: {
      display: 'Flex',
      fontSize: 'X1+X',
      maxWidth: 'G2+Z',
      text: '',
      fontWeight: '300',
      align: 'flex-start flex-start',
      Span: {
        text: '*',
        fontSize: 'B',
        display: 'block',
        margin: '-X - - -',
        color: 'blue',
      },
      Span_2: {
        text: 'The lifetime offer is limited to the beta release and  will switch to monthly pricing once fulfilled.',
        color: 'title',
        padding: '- - - Y2',
      },
    },
  },
  Img: {
    src: 'infinite.svg',
    display: 'block',
    maxHeight: 'fit-content',
    '@mobileM': {
      transform: 'rotate(90deg)',
    },
  },
};