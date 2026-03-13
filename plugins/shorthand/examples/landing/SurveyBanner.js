export const SurveyBanner = {
  flow: 'x',
  minHeight: 'G1',
  backgroundImage: 'banner.png',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
  aspectRatio: '1149 / 432',
  border: '1px solid',
  margin: 'A 0',
  '@dark': {
    borderColor: 'gray4',
  },
  '@light': {
    backgroundColor: 'white',
    borderColor: 'gray10',
  },
  Box: {
    alignSelf: 'flex-end',
    padding: 'C2 D',
    H1: {
      maxWidth: 'F',
      text: 'Only e2e tooling for Interface Engineers',
      lineHeight: 1.3,
    },
    P: {
      maxWidth: 'G3+A',
      margin: 'Z1 0',
      text: 'AI driven, realtime and centralized platform to build products as easily as filling Typeform and Airtable, also as powerful as Bubble and Figma.',
    },
  },
};