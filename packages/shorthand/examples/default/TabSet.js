export const TabSet = {
  extends: 'Flex',
  childExtends: 'Button',
  padding: 'V2+V2',
  round: 'D',
  background: 'gray .1',
  width: 'fit-content',
  children: [
    {
      text: 'build',
      isActive: true,
      theme: 'dialog-elevated',
    },
    {
      text: 'test',
    },
  ],
  childProps: {
    Icon: null,
    round: 'D',
    fontWeight: '400',
    padding: 'Z B1',
    textTransform: 'capitalize',
    '.isActive': {
      theme: 'document',
    },
    theme: 'transparent',
  },
};