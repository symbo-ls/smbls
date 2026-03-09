export const MenuIcon = {
  extends: 'Button',
  flow: 'y',
  padding: 'Y',
  gap: 'Y1',
  align: 'flex-end flex-start',
  background: 'transparent',
  childProps: {
    minHeight: 'V2',
    maxHeight: 'V2',
    height: 'V2',
    background: 'white',
    round: 'C',
    transition: 'transform .3s ease',
    ':first-child': {
      width: 'B',
      '.activeMenu': {
        transform: 'rotate(45deg) translate(2px, 0px)',
      },
      '!activeMenu': {
        transform: 'rotate(0deg)',
      },
    },
    ':last-child': {
      width: 'B',
      '.activeMenu': {
        transform: 'rotate(-45deg) translate(5px, -5px)',
      },
      '!activeMenu': {
        transform: 'rotate(0deg)',
      },
    },
  },
  children: [
    {},
    {},
  ],
  childrenAs: 'props',
};