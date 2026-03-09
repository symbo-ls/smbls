export const Pagination = {
  Left: {
    extends: 'IconButton',
    Icon: {
      name: 'chevronLeft',
    },
    onClick: (event, element, state) => {
      state.update({})
    },
  },
  Flex: {
    gap: 'Z',
    childProps: {
      aspectRatio: '1 / 1',
      boxSize: 'C+Y2 C+Y2',
      round: '100%',
      padding: 'A',
      theme: 'field',
      isActive: (element, state) => state.active === parseInt(element.key),
      '.isActive': {
        theme: 'primary',
      },
    },
    childExtends: 'Button',
    children: [
      {
        text: '1',
      },
      {
        text: '2',
      },
      {
        text: '3',
      },
      {
        text: '4',
      },
      {
        text: '5',
      },
    ],
  },
  Right: {
    extends: 'IconButton',
    Icon: {
      name: 'chevronRight',
    },
    onClick: (event, element, state) => {
      state.update({})
    },
  },
  extends: 'Flex',
  gap: 'A',
  align: 'center fllex-start',
};