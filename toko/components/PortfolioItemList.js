export const PortfolioItemList = {
  extend: [
    'Flex',
  ],
  props: {
    gap: 'B',
    padding: 'B2 0',
    flow: 'column',
    theme: 'portfolio',
  },
  childExtend: 'PortfolioItem',
  $stateCollection: ({
        key,
        state
      }) => state.parse(),
};