export const FeatureList = {
  props: {
    gap: 'D',
    flexFlow: 'column',
    padding: '0 0 D2',
  },
  childExtend: 'Feature',
  $stateCollection: ({
        state
      }) => state.parse(),
  extend: [
    'Flex',
  ],
};