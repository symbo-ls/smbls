'use strict'

import { Flex } from '@symbo.ls/atoms'

export const InfoSet = {
  extend: Flex,
  childExtend: Flex,
  props: {
    flow: 'column',
    childProps: {
      title: {
        fontSize: `${14 / 16}em`,
        fontWeight: '500'
      },
      subTitle: {
        fontSize: `${12 / 16}em`,
        color: '#A3A3A8'
      }
    }
  }
}
