export const ButtonSet = {
  extends: 'Flex',
  childExtends: 'Button',
  gap: 'Z',
  align: 'center flex-start',
  childProps: {
    theme: 'dialog',
    padding: 'A1 B2',
  },
  children: [
    {
      text: 'BUTTON 1',
    },
    {
      text: 'BUTTEN 2',
    },
  ],
};