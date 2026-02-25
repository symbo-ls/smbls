export const LandingGetstarted = {
  childExtends: [
    'Flex',
    'Link',
    'CanvasButton',
  ],
  round: 'Z2+W2',
  padding: 'W',
  margin: 'C1 - -',
  flow: 'x',
  gap: 'X2',
  childProps: {
    align: 'center',
    padding: 'Z A',
    cursor: 'pointer',
    round: 'Z2',
    gap: 'A',
    flex: 1,
  },
  Create: {
    Img: {
      width: 'C',
      src: 'https://api.symbols.app/core/files/public/68cdbbc549b85e495f3c195f/download',
    },
    Text: {
      text: 'Build your frontend',
    },
    href: '/signup',
  },
  VerticalLine: {
    ignoreChildProps: true,
    ignoreChildExtend: true,
    margin: 'A1 0',
  },
  Demos: {
    href: '/docs/examples',
    Img: {
      width: 'C',
      src: 'https://api.symbols.app/core/files/public/68cdbafe49b85e495f3c140a/download',
    },
    Text: {
      text: 'Explore examples',
    },
  },
  VerticalLine_2: {
    ignoreChildProps: true,
    ignoreChildExtend: true,
    margin: 'A1 0',
  },
  Chrome: {
    href: '/docs/chrome-extension',
    Img: {
      width: 'C1',
      src: 'https://api.symbols.app/core/files/public/69284e6628a7fb3ff8d05c33/download',
    },
    Text: {
      text: 'Build using extension',
    },
  },
};