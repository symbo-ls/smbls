export const AvatarStatusChatPreview = {
  AvatarStatus: {
    Avatar: {},
    StatusDot: {},
  },
  Flex: {
    flow: 'y',
    flex: '1',
    gap: 'W2',
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
      P: {},
      NotificationCounter: {},
    },
  },
  extends: 'Flex',
  gap: 'Z1',
  minWidth: 'G3',
  align: 'center flex-start',
};