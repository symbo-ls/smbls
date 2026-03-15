export const Layout = {
  extend: 'Flex',
  props: {
    flow: 'y',
    overflow: 'hidden',
    overflowY: 'auto',
    maxHeight: '100%',
    padding: '- - C2 -',
    minWidth: 'J+F1',
    width: '100%',
    align: 'start start',
    '@dark': {
      background: 'black',
    },
    '@light': {
      background: 'gray15',
    },
    '@screenL': {
      fontSize: 'A2',
    },
    '@screenM': {
      fontSize: 'A1',
    },
    '@screenS': {
      fontSize: 'A',
    },
    '@tabletL': {
      fontSize: 'Z2',
    },
    '@tabletM': {
      fontSize: 'Z1',
    },
  },
  Header: {},
  Banner: {
    maxHeight: '100%',
    minWidth: '100%',
    maxWidth: '100%',
  },
  Feedbacks: {
    padding: 'F1 - D2 -',
    minWidth: '100%',
    maxWidth: '100%',
  },
  BuiltScale: {
    margin: 'D - - -',
    minWidth: '100%',
    maxWidth: '100%',
  },
  GameChanging: {
    padding: 'E1 - E1 -',
    minWidth: '100%',
    maxWidth: '100%',
  },
  OpenSource: {
    minWidth: '100%',
    maxWidth: '100%',
  },
  Products: {
    margin: 'E2 auto',
  },
  Footer: {
    margin: '- auto',
  },
};