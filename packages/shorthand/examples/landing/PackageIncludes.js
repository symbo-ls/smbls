export const PackageIncludes = {
  extend: 'Flex',
  props: {
    flow: 'y',
    align: 'flex-start flex-start',
    gap: 'A2',
    childExtends: 'IconText',
    childProps: {
      whiteSpace: 'nowrap',
      fontWeight: '300',
      gap: 'Y',
      fontSize: 'A',
      Icon: {
        name: 'check',
        fontSize: 'Z',
      },
    },
    children: [
      {
        text: 'Includes starter plan',
      },
      {
        text: 'custom UI building',
      },
      {
        text: 'Instant delivery',
      },
      {
        text: 'Custom animations',
      },
      {
        text: 'Realtime preview',
      },
      {
        text: 'Available paralel delivery',
      },
      {
        text: 'Custom plugins',
      },
      {
        text: 'Unlimited revisions',
      },
      {
        text: 'Private discord communication',
      },
      {
        text: 'Custom integrations',
      },
    ],
  },
};