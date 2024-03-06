export const TeamItem = {
  extend: [
    'Flex',
  ],
  props: {
    flow: 'row',
    flexAlign: 'stretch',
    gap: 'A1',
    '& *': {
      pointerEvents: 'none',
    },
    ':hover': {
      style: {
        img: {
          opacity: '1',
          filter: 'grayscale(0)',
        },
      },
    },
  },
  TeamJoint: {
    hide: false,
    flex: '1 1 100%',
    Info: {
      '@mobileM': {
        flow: 'column',
      },
      TeamAvatar: {
        '@tabletM<': {
          display: 'none !important',
        },
        '@tabletM': {
          order: -1,
        },
      },
    },
  },
  TeamAvatar: {
    '@tabletM': {
      display: 'none !important',
    },
  },
  on: {
    mouseover: (ev, el, s) => {
          if (s.highlight) return
          el.TeamJoint.Info.meta.setProps({
            theme: 'team'
          })
          s.update({
            highlight: true
          })
        },
    mouseout: (ev, el, s) => {
          if (!s.highlight) return
          el.TeamJoint.Info.meta.setProps({
            theme: 'meta'
          })
          s.update({
            highlight: false
          })
        },
  },
};