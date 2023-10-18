'use strict'
import { Flex } from '@symbo.ls/atoms'
import { User } from '@symbo.ls/user'
import { UnitValue } from '@symbo.ls/unitvalue'
import { CountIndicator } from '@symbo.ls/indicator'

export const ChatUser = {
  extend: User,
  props: {
    boxSize: 'fit-content',
    background: 'gray3',
    padding: 'Z1 A Z1 Z1',
    round: 'Z1'
  },

  Avatar: {},

  Notes: {
    props: { gap: 'Y' },
    Title: {
      props: { align: 'center space-between' },
      caption: { props: { text: 'Maria Kenter' } },
      time: {
        extend: UnitValue,
        props: {
          gap: 'X2',
          fontSize: 'X2'
        },
        Unit: { props: { text: '2:22' } },
        Value: { props: { text: 'AM' } }
      }
    },

    Paragraph: {
      props: { gap: 'D' },
      p: {
        extend: Flex,
        props: {
          fontSize: 'Z',
          whiteSpace: 'nowrap',
          maxWidth: 'F1',
          overflow: 'hidden',
          text: 'Hey team, I’ve finished the requirements document'
        }
      },
      notification: {
        extend: CountIndicator,
        props: { fontSize: 'X2' }
      }
    }
  }
}
