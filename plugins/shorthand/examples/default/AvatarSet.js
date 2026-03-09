export const AvatarSet = {
  extends: 'Flex',
  childExtends: 'Avatar',
  childProps: {
    border: 'solid, codGray',
    borderWidth: 'X+W',
    ':first-child': {
      margin: '0 -Z1 0 0',
    },
    ':nth-child(2)': {
      margin: '0 -Z1 0 0',
    },
  },
  children: [
    {},
    {},
    {},
  ],
};