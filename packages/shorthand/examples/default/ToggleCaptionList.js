export const ToggleCaptionList = {
  extends: 'Flex',
  childExtends: 'ToggleCaption',
  flow: 'y',
  gap: 'B',
  childProps: {
    Caption: {
      text: 'Caption',
    },
    Toggle: {
      Input: {},
      Flex: {
        ':after': {},
      },
    },
  },
  children: [
    {},
    {},
  ],
};