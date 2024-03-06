export const TeamJoint = {
  extend: [
    'Flex',
  ],
  props: {
    flexFlow: 'column',
    gap: 'A1',
    '@tabletM': {
      flow: 'column',
    },
  },
  title: {
    extend: 'SectionHeading',
    state: 'name',
    props: ({
          state
        }) => ({
          transition: 'color B, background B',
          theme: state.highlight ? '' : 'meta'
        }),
  },
  Info: {
  },
};