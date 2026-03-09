export const CheckHgroupList = {
  extends: 'Flex',
  childExtends: 'CheckHgroup',
  flow: 'y',
  gap: 'B',
  childProps: {
    Hgroup: {
      gap: 'W2',
      H: {
        tag: 'h6',
      },
      P: {},
    },
    Checkbox: {
      Input: {},
      Flex: {
        Icon: {
          name: 'check',
        },
      },
    },
  },
  children: [
    {},
    {},
  ],
};