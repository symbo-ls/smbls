'use strict'

import { Flex, Grid } from '@symbo.ls/atoms'

export const DatePickerWeekDays = {
  extend: Grid,
  props: {
    overflow: 'hidden',
    padding: '- Z A',
    width: '100%',
    columns: 'repeat(7, 1fr)',
    gap: 'W2'
  },
  childExtend: {
    tag: 'span',
    extend: Flex,
    props: {
      fontSize: 'Y1',
      textTransform: 'capitalize',
      align: 'center center',
      ':nth-child(7n-1), &:nth-child(7n)': { opacity: '.5' }
    }
  },
  ...[
    { text: 'Mo' },
    { text: 'Tu' },
    { text: 'We' },
    { text: 'Th' },
    { text: 'Fr' },
    { text: 'Sa' },
    { text: 'Su' }
  ]
}
