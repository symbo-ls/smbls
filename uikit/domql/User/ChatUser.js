'use strict'

import { User } from './User'

import { UnitValue } from '@symbo.ls/unitvalue'

export const ChatUser = {
  extend: User,
  props: {
    boxSize: 'fit-content',
    background: 'gray3',
    padding: 'A',
    round: 'Z'
  },

  Avatar: { props: { margin: '0' } },
  Notes: {
    props: { flex: '1' },
    Title: {
      props: {
        align: 'center space-between',
        minWidth: '100%'
      },
      h5: {},
      time: {
        extend: UnitValue,
        props: {
          gap: 'X1'
        },
        Value: { text: '2:20' },
        Unit: { text: 'AM' }
      }

    },

    Paragraph: {
      props: {
        align: 'center space-between',
        gap: 'C2'

      },
      p: {
        props: {
          text: 'Hey team, I’ve finished the requirements document',
          maxWidth: 'F+B1',
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          fontSize: 'Z'
        }
      },
      CountIndicator: {
        fontSize: 'Y2'
      }
    }
  }
}
