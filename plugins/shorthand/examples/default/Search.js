export const Search = {
  tag: 'search',
  Input: {
    type: 'search',
    placeholder: 'Type a command or search',
    width: '100%',
    padding: 'Z2 C+W2 Z2 A2',
    theme: 'transparent',
    ':focus ~ button': {
      opacity: '1',
    },
  },
  Icon: {
    name: 'search',
    position: 'absolute',
    right: 'Z+W2',
    fontSize: 'B',
  },
  extends: 'Flex',
  minWidth: 'G+A2',
  gap: 'Z',
  theme: 'field',
  round: 'D2',
  align: 'center flex-start',
  position: 'relative',
};