export const ShortNav = {
  extend: [
    'Flex',
  ],
  props: {
    flow: 'column',
    gap: 'A2',
    margin: 'auto auto 0 0',
    '@tabletS': {
      display: 'flex',
      flow: 'row',
      margin: 'auto auto 0 0',
      padding: 'C1 0 0',
      gap: 'D',
      align: 'center center',
      fontSize: 'Z2',
    },
    '@mobileL': {
      fontSize: 'B',
      gap: 'C2',
    },
    '@mobileS': {
      gap: 'B2',
    },
  },
  childExtend: 'MenuItem',
  $stateCollection: ({
        state
      }) => [{
        text: state.__root.portfolio.title,
        href: '/portfolio'
      }],
};