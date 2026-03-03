export const Pills = {
  extends: 'Flex',
  childExtends: 'Link',
  gap: 'C1',
  childProps: {
    boxSize: 'Z',
    round: '100%',
    cursor: 'pointer',
    text: '',
    '.isActive': {
      theme: 'primary',
    },
    '!isActive': {
      theme: 'tertiary',
    },
    ':active': {
      theme: 'primary',
    },
  },
  children: [
    {},
    {
      isActive: true,
    },
  ],
  tag: 'nav',
};