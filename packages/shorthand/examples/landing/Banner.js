export const Banner = {
  padding: 'F+X2 - - -',
  flow: 'y',
  position: 'relative',
  alignItems: 'center',
  width: '100%',
  maxHeight: '100%',
  '@heightM': {},
  '@heightL': {
    padding: 'D2 - - -',
  },
  ':after': {
    content: '""',
    boxSize: '60% 100%',
    position: 'absolute',
    bottom: '0',
    left: '0',
    zIndex: '2',
  },
  '@dark': {
    ':after': {
      background: 'linear-gradient(to top, rgba(0, 0, 0, 1) 0%,rgba(0, 0, 0, 0) 100%)',
    },
  },
  '@light': {
    background: 'gray15',
    ':after': {
      background: 'linear-gradient(to top, rgba(241, 241, 243, 1) 0%,rgba(241, 241, 243, 0) 100%)',
    },
  },
  '> *:not(:first-child)': {
    zIndex: '2',
  },
  Scene: {
    position: 'absolute',
    top: '0',
    left: '0',
    zIndex: '1',
    '@light': {
      background: 'gray15',
      ':after': {
        content: '""',
        boxSize: '100% 100%',
        position: 'absolute',
        top: '0',
        left: '0',
        background: 'gray15 .75',
      },
    },
  },
  BannerHgroup: {
    zIndex: '2',
  },
  TabSet: {
    margin: 'D2+Y2 - B2+W -',
    background: 'black .25',
    '@heightM': {
      margin: 'C2 - B2+W -',
    },
  },
  BannerImg: {
    width: '96%',
  },
  TabSetTwo: {
    position: 'absolute',
    bottom: 'C',
    zIndex: '10 !important',
    childProps: {
      ':first-child': {
        background: 'linear-gradient(to right,  #00A2E7, #185DF3, #1E54F0, #8B4CCA, #8B4CCA)',
      },
      '@light': {
        ':first-child': {
          color: 'white',
        },
      },
    },
  },
};