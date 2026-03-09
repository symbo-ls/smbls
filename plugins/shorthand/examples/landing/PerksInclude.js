export const PerksInclude = {
  extend: 'Flex',
  props: {
    flow: 'y',
    align: 'flex-start flex-start',
    gap: 'C',
    maxWidth: 'fit-content',
    '@tabletS': {
      padding: '- B2',
      gap: 'D',
      alignSelf: 'center',
    },
  },
  H6: {
    text: 'Some perks also included',
    fontWeight: '300',
    fontSize: 'A',
  },
  Grid: {
    columns: 'repeat(3, 1fr)',
    columnGap: 'F+B',
    '@tabletM': {
      columnGap: 'E1',
    },
    '@tabletS': {
      columns: 'repeat(2, 1fr)',
      rowGap: 'D',
    },
    '@mobileL': {
      columnGap: 'D2',
    },
    '@mobileM': {
      columns: 'repeat(1, 1fr)',
      columnGap: '0',
      rowGap: 'C1',
    },
    childExtends: 'Flex',
    childProps: {
      flow: 'y',
      gap: 'B',
      align: 'flex-start flex-start',
      childExtends: 'IconText',
      childProps: {
        whiteSpace: 'nowrap',
        gap: 'Z',
        Icon: {
          name: 'check',
        },
      },
    },
    children: [
      {
        children: [
          {
            text: 'Open-source',
          },
          {
            text: 'Brandbook and preview',
          },
          {
            text: 'Developers documentation',
          },
        ],
      },
      {
        children: [
          {
            text: 'Design System',
          },
          {
            text: 'Realtime collaboartion',
          },
          {
            text: 'CLI tool',
          },
        ],
      },
      {
        children: [
          {
            text: '650+ Symbols components',
          },
          {
            text: '99.99% uptime',
          },
          {
            text: 'Help center',
          },
        ],
      },
    ],
  },
};