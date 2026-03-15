export const NavigationArrows = {
  extends: 'Flex',
  childExtends: 'IconButton',
  gap: 'Z',
  childProps: {
    round: '100%',
  },
  children: [
    {
      Icon: {
        name: 'chevronLeft',
      },
    },
    {
      Icon: {
        name: 'chevronRight',
      },
    },
  ],
};