export const Modal = {
  Hgroup: {
    gap: 'X1',
    H: {
      tag: 'h5',
      fontWeight: '700',
    },
    P: {},
  },
  IconButton: {
    position: 'absolute',
    right: 'X2',
    top: 'X2',
    round: '100%',
    $isSafari: {
      top: 'Z2',
      right: 'Z2',
    },
    Icon: {
      name: 'x',
    },
  },
  extends: 'Flex',
  boxSize: 'fit-content',
  align: 'stretch flex-start',
  minWidth: 'G+B',
  position: 'relative',
  round: 'B',
  theme: 'dialog',
  flow: 'y',
  padding: 'A2 A2 A1 A2',
  borderStyle: 'none',
};