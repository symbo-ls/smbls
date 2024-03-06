export const Nav = {
  extend: [
    'Flex',
  ],
  props: {
    flow: 'column',
    gap: 'A2',
    '@tabletS': {
      display: 'flex',
      flow: 'row',
      margin: 'auto 0 0',
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
      }) => state.main && [{
        text: state.philosophy.title,
        href: '/philosophy'
      }, {
        text: state.team.title,
        href: '/team'
      }, {
        text: state.portfolio.title,
        href: '/portfolio'
      }],
};