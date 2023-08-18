'use strict'

import { Flex } from '@symbo.ls/atoms'

export const InfoSet = {
  extend: Flex,
  childExtend: Flex,
  props: {
    flow: 'column',
    childProps: {
      title: {
        fontSize: 'Z',
        fontWeight: '500'
      },
      subTitle: {
        fontSize: 'Y',
        color: '#A3A3A8'
      }
    }
  }
}
