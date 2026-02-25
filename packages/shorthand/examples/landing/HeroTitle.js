export const HeroTitle = {
  flow: 'y',
  align: 'center',
  textAlign: 'center',
  color: 'title',
  gap: 'A',
  '@mobileL': {
    gap: 'B',
    padding: '- B2',
  },
  H1: {
    Writing: {
      speed: 30,
      lineHeight: '0.9',
      height: 'A+X',
      minWidth: 'X',
      '@mobileS': {
        lineHeight: '1.1em',
      },
      text: 'Interface Engineering ',
    },
    Writing_2: {
      '@mobileS': {
        margin: 'A2 - - -',
      },
      tag: 'span',
      speed: 30,
      delay: 1200,
      lineHeight: '0.9',
      height: 'A+X',
      minWidth: 'X',
      fontWeight: '200',
      afterText: 'starts here',
    },
    flexFlow: 'column',
    color: 'title',
    '@mobileS': {
      maxWidth: 'E',
    },
    text: null,
    fontSize: 'K',
    '@mobileM': {
      fontSize: 'J2',
    },
  },
  H6: {
    margin: 'X - -',
    height: 'C',
    extends: 'Writing',
    delay: 2000,
    speed: 5,
    color: 'title',
    fontWeight: '400',
    maxWidth: 'H3',
    afterText: 'Symbols Suite helps you expand your skills to build and manage entire interfaces — from design systems to delivery and integrations.',
  },
  props: {},
};