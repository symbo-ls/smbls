export const Addresses = {
  extend: 'Flex',
  props: {
    flow: 'row',
    '@mobileM': {
      flow: 'column',
    },
    gap: 'B1',
  },
  childExtend: {
    props: {
      width: '100%',
      maxWidth: '16em',
    },
    H6: {
      fontWeight: 'bold',
      margin: '0',
      text: '{{ title }}',
    },
    meta: {
      text: '{{ meta }}',
    },
    city: {
      text: '{{ city }}',
    },
  },
  $stateCollection: ({
        state
      }) => {
        return state.__root.main.address
      },
};