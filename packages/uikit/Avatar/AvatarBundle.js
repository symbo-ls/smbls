'use strict'

import { Flex } from '@symbo.ls/atoms'
import { Avatar } from './Avatar'

export const AvatarBundle = {
  extend: Flex,
  props: {
    childProps: {
      '@light': {
        border: '2px, var(--theme-document-light-background), solid'
      },
      '@dark': {
        border: '2px, var(--theme-document-dark-background), solid'
      },
      ':not(:last-child)': {
        margin: '0 -Y2 0 0'
      }
    }
  },

  childExtend: Avatar,
  $setPropsCollection: ({ props }) => props.options
}
