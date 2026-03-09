export const ScrollableList = {
  tag: 'nav',
  Flex: {
    maxHeight: 'D2',
    overflowY: 'auto',
    flow: 'y',
    padding: 'Z -',
    style: {
      listStyleType: 'none',
      '::-webkit-scrollbar': {
        display: 'none',
      },
    },
    childProps: {
      padding: 'Y1 A',
      cursor: 'pointer',
      align: 'flrx-start',
      textAlign: 'left',
      fontWeight: '700',
      round: '0',
      theme: 'dialog',
      fontSize: 'C',
      ':hover': {
        theme: 'dialog-elevated',
      },
    },
    childExtends: 'Button',
    children: [
      {
        text: 'Item One',
      },
      {
        text: 'Item Two',
      },
    ],
  },
  position: 'relative',
  overflow: 'hidden',
  theme: 'field',
  round: 'A2',
  minWidth: 'F1',
  ':before, &:after': {
    content: '""',
    position: 'absolute',
    boxSize: 'B 100%',
    zIndex: '2',
    left: '0',
    pointerEvents: 'none',
  },
  ':before': {
    top: '0',
    '@light': {
      background: 'linear-gradient(to bottom,  #ebecf2 0%, transparent 100%)',
    },
    '@dark': {
      background: 'linear-gradient(to bottom, #171717 0%, transparent 100%)',
    },
  },
  ':after': {
    bottom: '-3px',
    '@light': {
      background: 'linear-gradient(to top,  #ebecf2 0%, transparent 100%)',
    },
    '@dark': {
      background: 'linear-gradient(to top, #171717 0%, transparent 100%)',
    },
  },
};