export const TabSet = {
  flow: 'x',
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
    {
      text: 'publish',
    },
  ],
  childrenAs: 'props',
  childProps: {
    Icon: null,
    round: 'D',
    theme: 'transparent',
    padding: 'Z B1',
    textTransform: 'capitalize',
    '.isActive': {
      theme: 'document',
    },
    onClick: null,
  },
};