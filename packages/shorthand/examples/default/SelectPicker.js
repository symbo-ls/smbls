export const SelectPicker = {
  tag: 'label',
  extends: 'Flex',
  round: '0',
  align: 'center flex-start',
  position: 'relative',
  Select: {
    extends: 'Flex',
    fontSize: 'A',
    boxSize: '100%',
    padding: '- B+V2 - -',
    cursor: 'pointer',
    outline: 'none',
    appearance: 'none',
    flex: '1',
    zIndex: '2',
    lineHeight: 1,
    border: 'none',
    background: 'none',
    pointerEvents: 'All',
    color: 'title',
    ':focus-visible': {
      outline: 'none',
    },
    children: [
      {
        text: 'Nikoloza',
        value: 'Nikoloza',
      },
      {
        text: 'Svinchy',
        value: 'Svinchy',
      },
    ],
    childProps: {
      tag: 'option',
    },
  },
  Icon: {
    name: 'chevronDown',
    position: 'absolute',
    right: '0',
    margin: 'V - - -',
    fontSize: 'B',
  },
};