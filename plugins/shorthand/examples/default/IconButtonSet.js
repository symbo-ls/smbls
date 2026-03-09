export const IconButtonSet = {
  extends: 'Flex',
  childExtends: 'IconButton',
  gap: 'Z',
  childProps: {
    Icon: {},
  },
  children: [
    {
      Icon: {
        name: 'sun',
      },
    },
    {
      Icon: {
        name: 'moon',
      },
    },
  ],
};