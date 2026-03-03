export const RadioStep = {
  RadioMark: {
    theme: 'field',
    '.isActive': {
      theme: 'primary',
    },
    ':after': {},
  },
  H6: {
    text: 'Step',
  },
  Progress: {
    minWidth: 'E',
    maxWidth: 'E',
    value: 0,
    height: 'V',
    margin: '- - - W',
    '.isActive': {
      value: 1,
    },
  },
  extends: 'Flex',
  align: 'center flex-start',
  gap: 'Y2',
};