export const ProgressStepSet = {
  extends: 'Flex',
  childExtends: 'Progress',
  gap: 'A',
  childProps: {
    minWidth: 'C',
  },
  children: [
    {
      value: 0.7,
    },
    {},
  ],
};