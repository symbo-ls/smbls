export const TeamAvatar = {
  extend: [
    'Flex',
  ],
  tag: 'figure',
  props: {
    flex: 1,
    minWidth: 'G1',
    align: 'center center',
    margin: '0',
    border: '1px, solid, gray',
    padding: 'B1',
    Img: {
      hide: false,
    },
    figcaption: {
      hide: false,
    },
  },
  Img: {
    props: ({
          state
        }) => ({
          width: '100%',
          src: state.poster,
          aspectRatio: '1 / 1',
          transition: 'opacity B, filter B',
          opacity: '0.5',
          style: {
            filter: 'grayscale(0.85)'
          },

          '@tabletM': {
            width: '85%'
          }
        }),
  },
  figcaption: {
    props: {
      position: 'absolute',
      visibility: 'hidden',
    },
    text: ({
          state
        }) => state.name,
  },
};