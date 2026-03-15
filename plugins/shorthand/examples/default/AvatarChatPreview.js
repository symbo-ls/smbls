export const AvatarChatPreview = {
  Avatar: {},
  Flex: {
    flow: 'y',
    flex: '1',
    '> *': {
      minWidth: '100%',
    },
    ValueHeading: {
      H: {},
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
    NotCounterParagraph: {
      P: {
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        maxWidth: 'F2',
      },
      NotificationCounter: {},
    },
  },
  extends: 'Flex',
  gap: 'Z1',
  minWidth: 'G3',
  align: 'center flex-start',
};