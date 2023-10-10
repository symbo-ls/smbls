'use strict'

import { Flex } from '@symbo.ls/atoms'
import { AvatarIndicator } from '@symbo.ls/avatar'
import { TitleParagraphRows } from '@symbo.ls/titleparagraph'

export const User = {
  extend: Flex,
  props: {
    align: 'center flex-start',
    gap: 'Z2'
  },

  Avatar: {
    extend: AvatarIndicator,
    props: { margin: '0 - - -' }
  },

  Notes: {
    extend: TitleParagraphRows,
    props: {
      gap: 'Y2',
      margin: 'X - - -'
    },
    Title: {
      h5: {
        props: {
          text: 'Erin Schleifer',
          fontWeight: '500',
          fontSize: 'A'
        }
      }
    },
    Paragraph: {
      p: {
        props: {
          text: 'email@symbols.com',
          fontSize: 'Z1'
        }
      }
    }
  }
}
