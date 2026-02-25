export const Scrollbar = {
  TrackContainer: {
    opacity: 1,
    transition: 'A defaultBezier opacity',
    flex: '1',
    margin: '- C1 - -',
    position: 'relative',
    background: 'red',
    height: 'fit-content',
    alignSelf: 'center',
    Track: {
      position: 'absolute',
      theme: 'field',
      round: 'A',
      height: '2px',
      background: '#d9d7d7 .5',
      left: '0',
      transformOrigin: 'left',
      width: '15%',
    },
  },
  NavigationArrows: {
    childProps: {
      padding: 'Z Z',
      Icon: {
        fontSize: 'B1',
      },
    },
  },
  extends: 'Flex',
  minWidth: 'I',
};