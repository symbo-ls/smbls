export const PriceOptions = {
  extend: 'Flex',
  props: {
    gap: 'C1',
    childProps: {
      tag: 'label',
      cursor: 'pointer',
      flexFlow: 'x',
      gap: 'Z',
      flow: 'row-reverse',
      Radio: {
        margin: '-W - - -',
        Input: {
          attr: {
            name: 'starter',
          },
          value: null,
          onChange: null,
          ':checked + div': {
            theme: 'transparent',
          },
          ':checked + div > svg': {
            opacity: '1',
          },
        },
        Flex: {
          border: 'solid, gray .5',
          borderWidth: '.5px',
          theme: 'transparent',
          padding: 'V',
          Icon: {
            name: 'check',
            opacity: '0',
            fontSize: 'Z2',
          },
          ':after': null,
        },
      },
      Hgroup: {
        gap: 'X',
        H: {
          tag: 'strong',
          text: null,
          color: 'title',
          fontWeight: '700',
        },
        P: {
          fontSize: 'Z',
          fontWeight: '300',
          text: null,
          color: 'title',
        },
      },
    },
    childrenAs: 'state',
    children: [
      {
        term: 'Monthly',
        price: 29,
      },
      {
        term: 'Annual',
        price: 199,
      },
      {
        term: 'Lifetime',
        price: 299,
      },
    ],
  },
};