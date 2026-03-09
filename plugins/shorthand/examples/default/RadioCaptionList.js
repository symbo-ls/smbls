export const RadioCaptionList = {
  extends: 'Flex',
  childExtends: 'RadioCaption',
  flow: 'y',
  gap: 'B',
  childProps: {
    Caption: {
      text: 'Caption',
    },
    Radio: {
      Input: {},
      FLex: {
        ':after': {},
      },
    },
  },
  children: [
    {},
    {},
  ],
};