export const AvatarSetChatPreview = {
  AvatarSet: {
    position: 'relative',
    boxSize: 'fit-content C2',
    border: '1px solid red',
    margin: '-Y2 - - -',
    childProps: {
      boxSize: 'C C',
      borderWidth: 'W',
      display: 'block',
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      ':first-child': {
        margin: 'Z2 0 0 0',
      },
      ':nth-child(2)': {
        margin: '0 0 0 Z1',
      },
      ':nth-child(3)': {
        margin: '-W 0 0 -Z1',
      },
    },
  },
  Flex: {
    flow: 'y',
    flex: '1',
    gap: 'W2',
    '> *': {
      minWidth: '100%',
    },
    ValueHeading: {
      minWidth: '0',
      maxWidth: '100%',
      H: {
        text: 'Design',
      },
      UnitValue: {
        flow: 'row-reverse',
        Unit: {
          text: 'am',
        },
        Value: {
          text: '2:20',
        },
      },
    },
    Flex: {
      gap: 'X2',
      Caption: {
        text: 'nick:',
        color: 'paragraph',
      },
      NotCounterParagraph: {
        flex: '1',
        justifyContent: 'space-between',
        P: {
          maxWidth: 'F2',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
        },
        NotificationCounter: {},
      },
    },
  },
  extends: 'Flex',
  gap: 'Z1',
  minWidth: 'G3',
  align: 'center flex-start',
};