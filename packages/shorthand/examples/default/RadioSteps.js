export const RadioSteps = {
  extends: 'Flex',
  childExtends: 'RadioStep',
  gap: 'Z1',
  childProps: {
    RadioMark: {},
    Progress: {},
    ':last-child > progress': {
      hide: true,
    },
  },
  children: [
    {
      RadioMark: {
        isActive: true,
      },
    },
    {},
  ],
};