export const CheckStepSet = {
  extends: 'Flex',
  childExtends: 'CheckStep',
  gap: 'Z1',
  childProps: {
    Icon: {
      '.isActive': {
        theme: 'primary',
      },
    },
    Progress: {},
    ':last-child > progress': {
      hide: true,
    },
  },
  children: [
    {
      Icon: {
        isActive: true,
      },
    },
    {},
  ],
};