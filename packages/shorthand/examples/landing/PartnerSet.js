export const PartnerSet = {
  gap: 'C',
  align: 'center',
  '@light': {},
  Caption: {
    text: 'With partnership',
    fontWeight: '100',
    color: 'title',
  },
  Flex: {
    gap: 'C',
    childExtends: 'Img',
    childrenAs: 'props',
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
      ':nth-child(odd)': {},
      ':nth-child(even)': {},
    },
    children: [
      {
        src: 'google.svg',
      },
      {
        src: 'googleDark.png',
      },
      {
        src: 'based.svg',
      },
      {
        src: 'basedDark.png',
      },
      {
        src: 'BCW.svg',
      },
      {
        src: 'bcwDark.png',
      },
    ],
  },
};