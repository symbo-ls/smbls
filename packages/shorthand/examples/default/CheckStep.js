export const CheckStep = {
  Icon: {
    name: 'check',
    theme: 'dialog',
    display: 'block',
    boxSizing: 'content-box',
    padding: 'Y2',
    round: '100%',
  },
  H6: {
    text: 'Step',
  },
  Progress: {
    minWidth: 'E',
    maxWidth: 'E',
    value: 0,
    height: 'V',
    '.isActive': {
      value: 1,
    },
  },
  extends: 'Flex',
  align: 'center flex-start',
  gap: 'Z',
};