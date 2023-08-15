'use strict'
import { Flex } from '@symbo.ls/atoms'
import { Avatar } from '../Avatar'

export const User = {
  extend: Flex,
  image: { extend: Avatar },
  content: {
    extend: Flex,
    heading: { name: { text: 'erin schleifer' } },
    paragraph: { mail: { props: { text: 'email@symbols.com' } } }
  },

  props: {
    align: 'center flex-start',
    width: 'fit-content',
    gap: 'A',

    image: { boxSize: 'B1 B1' },

    content: {
      flow: 'column',
      heading: {
        name: {
          fontSize: 'Z1',
          textTransform: 'capitalize'
        }
      },
      paragraph: {
        mail: {
          fontSize: 'Y1',
          color: '#A3A3A8'
        }
      }
    }
  }
}
