'use strict'

import { Flex } from '@symbo.ls/atoms'
import { TitleParagraph } from '@symbo.ls/titleparagraph'

export const User = {
  extend: Flex,
  props: {
    align: 'center flex-start',
    gap: 'Z2'
  },

  AvatarIndicator: {
    margin: '0 - - -'
  },

  Notes: {
    extend: TitleParagraph,
    props: {
      gap: 'Y2',
      margin: 'W - - -'
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
