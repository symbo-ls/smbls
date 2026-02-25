export const CompaniesUsing = {
  flow: 'x',
  gap: 'D',
  align: 'center flex-start',
  '@tabletS': {
    flow: 'y',
    gap: 'C2',
    align: 'center',
  },
  '@light': {},
  Caption: {
    text: 'By team that previously contributed to:',
    color: 'caption',
    fontSize: 'Z',
    whiteSpace: 'nowrap',
  },
  Flex: {
    gap: 'D',
    flow: 'x',
    align: 'center',
    '@mobileS': {
      padding: '- C2',
    },
    childExtends: 'Img',
    '@tabletL': {
      flexWrap: 'wrap',
      padding: '- C2',
      align: 'center center',
    },
    childProps: {
      '@light': {
        ':nth-child(odd)': {
          display: 'none',
        },
      },
      '@dark': {
        ':nth-child(even)': {
          display: 'none',
        },
      },
    },
    children: [
      {
        height: 'A2',
        src: 'nike_light.svg',
      },
      {
        height: 'A2',
        src: 'nike_dark.svg',
      },
      {
        height: 'A1',
        src: 'sony_light.svg',
      },
      {
        height: 'A1',
        src: 'sony_dark.svg',
      },
      {
        height: 'A1',
        src: 'siemens.svg',
      },
      {
        height: 'A1',
        src: 'siemens.svg',
      },
      {
        height: 'B+X',
        src: 'apple_light.svg',
      },
      {
        height: 'B+X',
        src: 'apple_dark.svg',
      },
      {
        height: 'A2',
        src: 'microsoft_light.svg',
      },
      {
        height: 'A2',
        src: 'microsoft_dark.svg',
      },
      {
        height: 'A2',
        src: 'mtv.svg',
      },
      {
        height: 'A2',
        src: 'mtv.svg',
      },
      {
        height: 'A2',
        src: 'nokia.svg',
      },
      {
        height: 'A2',
        src: 'nokia.svg',
      },
      {
        height: 'A2',
        src: 'paypal.svg',
      },
      {
        height: 'A2',
        src: 'paypal.svg',
      },
      {
        height: 'A2',
        src: 'samsung_light.svg',
      },
      {
        height: 'A2',
        src: 'samsung_dark.svg',
      },
    ],
  },
};