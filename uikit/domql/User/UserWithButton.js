'use strict'

import { Flex } from '@symbo.ls/atoms'
import { User } from './User'

export const UserWithButton = {
  extend: Flex,
  props: {
    background: 'gray',
    boxSize: 'fit-content',
    padding: 'X Z2 X X2',
    round: 'Z',
    border: '1px, solid, gray3',
    alignItems: 'center',
    gap: 'Z1'
  },

  User: {
    extend: User,
    props: { gap: 'Y2' },
    Avatar: {
      Avatar: { props: { round: 'Y1' } },
      StatusIndicator: null
    },

    Notes: {
      props: { gap: 'X' },
      Title: {
        props: {
          text: 'Wallet ID',
          fontSize: 'Y1'
        }
      },
      Paragraph: {
        props: {
          text: '0xfb59...d862',
          fontSize: 'Y1'
        }
      }
    }
  },

  IconCommonButton: {
    background: 'transparent',
    theme: null,
    color: 'currentColor',
    opacity: '0.5',
    transition: 'A defaultBezier',
    transitionProperty: 'opacity, background',
    padding: '0',
    margin: '- - - Y2',
    Icon: {
      name: 'copy',
      fontSize: 'C'
    }
  }
}
