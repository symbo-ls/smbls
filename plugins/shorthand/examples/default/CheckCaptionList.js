export const CheckCaptionList = {
  extends: 'Flex',
  childExtends: 'CheckCaption',
  flow: 'y',
  gap: 'B',
  childProps: {
    Caption: {},
    Checkbox: {
      Input: {},
      Flex: {
        Icon: {
          name: 'check',
        },
      },
    },
  },
  children: [
    {},
    {},
  ],
};