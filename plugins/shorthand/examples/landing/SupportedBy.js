export const SupportedBy = {
  gap: 'C',
  align: 'center',
  '@mobileL': {
    flow: 'y',
    align: 'center center',
    padding: '- B',
  },
  '@light': {},
  Caption: {
    text: 'Supported by',
    fontWeight: '200',
  },
  Flex: {
    gap: 'C',
    childExtends: 'Img',
    align: 'center center',
    '@mobileL': {
      flexWrap: 'wrap',
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
      ':nth-child(odd)': {},
      ':nth-child(even)': {},
    },
    children: [
      {
        maxWidth: 'F',
        src: 'google_for_startups_light.png',
      },
      {
        maxWidth: 'F',
        src: 'google_for_startups_dark.png',
      },
      {
        width: 'E+Z2',
        src: 'gh_for_startups_light.png',
      },
      {
        width: 'E+Z2',
        src: 'gh_for_startups_dark.png',
      },
      {
        width: 'E+A2',
        src: 'grafana_light.png',
      },
      {
        width: 'E+A2',
        src: 'grafana_dark.png',
      },
    ],
  },
};