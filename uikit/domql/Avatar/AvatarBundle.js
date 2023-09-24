'use strict'

import { Flex } from '@symbo.ls/atoms'
import { Avatar } from './Avatar'

export const AvatarBundle = {
  extend: Flex,
  childExtend: {
    extend: Avatar,
    props: {
      border: '0.1312em, black .85, solid',
      ':not(:last-child)': {
        margin: '0 -Y2 0 0'
      }
    }
  },
  ...[{}, {}, {}, {}]
}
