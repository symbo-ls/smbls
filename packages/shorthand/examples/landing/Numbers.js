export const Numbers = {
  flow: 'y',
  gap: 'A2',
  H6: {
    text: 'Quick stats:',
  },
  Grid: {
    flow: 'y',
    gap: 'C',
    margin: 'B 0 A',
    columns: 'repeat(4, 1fr)',
    '@mobileM': {
      columns: 'repeat(1, 1fr)',
    },
    '@tabletM': {
      columns: 'repeat(2, 1fr)',
    },
    childExtends: [
      'Hgroup',
    ],
    childProps: {
      color: 'title',
      gap: 'Z2',
      align: 'start',
      H: {
        tag: 'h6',
        fontWeight: '600',
        margin: '0',
        text: '{{ value }}',
      },
      P: {
        order: '-1',
        text: '{{ title }}',
      },
    },
    childrenAs: 'state',
    children: [
      {
        title: 'Investors',
        value: '8',
      },
      {
        title: 'Beta Users',
        value: '518',
      },
      {
        title: 'AI Models',
        value: '7',
      },
      {
        title: 'Marketplace items',
        value: '3,184',
      },
    ],
  },
};