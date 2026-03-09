export const LayerSimple = {
  Title: {
    text: 'Checklist',
  },
  Flex: {
    flow: 'column',
    gap: 'A',
    childProps: {
      gap: 'X',
      flexAlign: 'center',
    },
    childExtends: {
      Icon: {
        color: 'inactive',
        gap: 'Y1',
      },
      Span: {
        color: 'white',
        padding: '- - - X2',
      },
    },
    children: () => [{
        Icon: {
          icon: 'check',
        },
        Span: {
          text: 'Sun',
        },
      },
      {
        Icon: {
          icon: 'check',
        },
        Span: {
          text: 'Moon',
        },
      },
    ],
  },
  extends: 'Group',
  padding: 'Z A A A',
  margin: 'C -',
  round: 'Z',
  gap: 'A',
  width: 'F1',
  background: 'gray',
};