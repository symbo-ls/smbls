import { Flex } from '@symbo.ls/atoms'

export const DemoSidebar = {
  extend: Flex,
  props: {
    boxSize: '100% D1',
    flow: 'column',
    gap: 'C',
    align: 'center center',
    childProps: {
      boxSize: 'Y2',
      round: '100%'
    }

  },
  childExtend: {
    tag: 'a'
  },
  ...[
    {
      attr: { href: '#typography' },
      props: {
        background: 'red'
      }
    },
    {
      attr: { href: '#colors' },
      props: { background: 'blue' }
    },
    {
      attr: { href: '#icons' },
      props: { background: 'green' }
    },
    { props: { background: 'yellow' } },
    { props: { background: 'purple' } }
  ]
}
