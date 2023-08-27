'use strict'

import { Flex } from '@symbo.ls/atoms'
import { Button } from '@symbo.ls/button'

export const SlideTabs = {
  extend: Flex,
  childExtend: Button,
  ...[{}, {}, {}],
  props: {
    align: 'center flex-start',
    maxWidth: 'fit-contnet',
    gap: 'Y',
    childProps: {
      padding: '0',
      background: 'white',
      boxSize: 'Y E+A',
      round: '0',
      ':first-child': { round: 'E 0 0 E' },
      ':last-child': { round: '0 E E 0' }
    }
  }
}
