export const Info = {
  tag: 'section',
  extend: [
    'Flex',
  ],
  props: ({
        state
      }) => ({
        flow: 'row wrap',
        minHeight: 'G',
        alignItems: 'stretch',
        transition: 'color B, background B',

        meta: {
          theme: state.highlight ? 'team' : 'meta',
          transition: 'color B, background B',
          flexFlow: 'column',
          flex: 27,
          padding: 'B2 C1 B2 B2',

          h5: {
            margin: '0',
            fontWeight: 600,
            textTransform: 'uppercase'
          },

          icons: {
            margin: 'auto 0 0',
            gap: 'A2'
          },

          '@tabletM': {
            gap: 'C1',
            flex: '1 1 45%'
          }
        },
        description: {
          theme: state.highlight ? 'team' : 'meta',
          transition: 'color B, background B',
          flow: 'column',
          padding: 'B2',
          gap: 'B1',
          flex: 48,
          fontSize: 'Z',

          '@tabletM': {
            order: '3',
            flex: '1 1 100%'
          }
        },

        mobileAvatar: {
          display: 'none',

          '@tabletM': {
            display: 'flex',
            flex: '1 1 45%'
          }
        },

        '@tabletM': {
          gap: 'A1'
        }
      }),
  meta: {
    h5: {
      text: ({
            state
          }) => state.title,
    },
    icons: {
      extend: 'Flex',
      flag: {
        if: ({
              state
            }) => state.country && state.parent.countries,
        img: {
          extend: 'Svg',
          props: ({
                state
              }) => {
                const {
                  country
                } = state
                const {
                  countries
                } = state.parent
                if (!country || !countries) return
                return {
                  src: country && countries[country].src,
                  width: 'B1',
                  aspectRatio: '36 / 26'
                }
              },
        },
      },
      linkedin: {
        extend: [
          'Link',
          'Button',
        ],
        if: ({
              state
            }) => state.linkedin,
        props: ({
              state
            }) => ({
              color: 'currentColor',
              icon: 'linkedin',
              target: '_blank',
              fontSize: 'C2',
              margin: '-X1 -X 0',
              padding: 'X',
              href: state.linkedin,
              type: null,
              style: {
                pointerEvents: 'all !important'
              },
              borderRadius: '0',
              border: '1px solid transparent',
              // ':hover': { border: '1px solid white' },
              ':hover': {
                theme: 'meta'
              },
              '@mobileL': {
                margin: '-.1618em 0 0'
              }
            }),
      },
    },
  },
  Vr: {
    margin: '-B2 0',
    '@tabletM': {
      display: 'none',
    },
  },
  description: {
    extend: 'Flex',
    childExtend: {
      tag: 'p',
      props: {
        margin: '0',
      },
      text: ({
            state
          }) => state.value,
    },
    $stateCollection: ({
          state
        }) => state.description,
  },
  TeamAvatar: {
  },
};