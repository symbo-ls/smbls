export const SectionHeading = {
  extend: [
  ],
  props: {
    border: '1px, solid, gray',
    margin: 'A B1 0 0',
    fontSize: 'F',
    textTransform: 'uppercase',
    padding: 'Z1',
    textAlign: 'center',
    color: 'currentColor',
    lineHeight: 1,
    position: 'relative',
    '@dark': {
      background: '--theme-document-dark-background',
    },
    '@light': {
      background: '--theme-document-light-background',
    },
    ':before': {
      content: '""',
      position: 'absolute',
      left: 'B1',
      right: '-B1',
      top: '-A',
      bottom: 'A',
      border: '1px, solid, gray',
      style: {
        zIndex: -1,
      },
      ':dir(rtl)': {
        right: 'B1',
        left: '-B1',
      },
    },
    hide: false,
  },
  text: ({
        state
      }) => state.value,
};