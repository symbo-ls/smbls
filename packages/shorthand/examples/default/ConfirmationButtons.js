export const ConfirmationButtons = {
  extends: 'Flex',
  childExtends: 'Button',
  gap: 'Y1',
  childProps: {
    theme: 'dialog',
    padding: 'Z1 B1',
  },
  children: [
    {
      text: 'No',
    },
    {
      text: 'YES',
    },
  ],
};