export const LinkSet = {
  tag: 'nav',
  extends: 'Flex',
  childExtends: 'Link',
  align: 'center flex-start',
  gap: 'A',
  childProps: {
    cursor: 'pointer',
  },
  children: [
    {
      text: 'Link 1',
    },
    {
      text: 'Link 2',
    },
  ],
};