export const NumberPicker = {
  state: {
    currentValue: 0,
  },
  Minus: {
    extends: 'IconButton',
    Icon: {
      name: 'minus',
    },
    onClick: (event, element, state) => {
      if (state.currentValue <= 0) return
      state.update({
        currentValue: state.currentValue - 1
      })
    },
  },
  Value: {
    text: '{{ currentValue }}',
  },
  Plus: {
    extends: 'IconButton',
    Icon: {
      name: 'plus',
    },
    onClick: (event, element, state) => {
      state.update({
        currentValue: state.currentValue + 1
      })
    },
  },
  extends: 'Flex',
  align: 'center flex-start',
  gap: 'Z',
  '> button': {
    theme: 'transparent',
  },
};