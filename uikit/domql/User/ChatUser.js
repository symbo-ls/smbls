'use strict'
import { Flex } from '@symbo.ls/atoms'
import { User } from '@symbo.ls/user'
import { UnitValue } from '@symbo.ls/unitvalue'
import { CountIndicator } from '@symbo.ls/indicator'

export const ChatUser = {
  extend: User,
  props: { gap: 'Y2' },

  Avatar: {},

  Notes: {
    props: { gap: 'X1' },
    Title: {
      props: { align: 'center space-between' },
      caption: { props: { text: 'Maria Kenter' } },
      time: {
        extend: UnitValue,
        props: {
          fontSize: 'X1',
          gap: 'X2'
        },
        Unit: { props: { text: '2:22' } },
        Value: { props: { text: 'AM' } }
      }
    },

    Paragraph: {
      props: { gap: 'C1' },
      p: {
        extend: Flex,
        props: {
          text: 'Hey team, I’ve finished the requirements document',
          maxWidth: 'F1',
          overflow: 'hidden',
          whiteSpace: 'nowrap'
        }
      },
      notification: {
        extend: CountIndicator,
        props: { fontSize: 'X2' }
      }
    }
  }
}
