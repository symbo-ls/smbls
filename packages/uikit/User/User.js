'use strict'

import { Flex } from '@symbo.ls/atoms'
import { TitleParagraph } from '@symbo.ls/titleparagraph'
import { AvatarIndicator } from '@symbo.ls/avatar'

export const User = {
  extend: Flex,
  props: {
    boxSize: 'fit-content',
    theme: 'dialog',
    padding: 'Z A Z Z',
    round: 'A',
    gap: 'Y1',
    align: 'center flex-start'
  },

  Avatar: {
    extend: AvatarIndicator,
    Avatar: { props: { boxSize: 'C+V' } }
  },
  Notes: {
    extend: TitleParagraph,
    props: {
      justifyContent: 'center',
      gap: 'W2',
      margin: 'X2 - - -'
    },
    Title: {
      props: {
        fontSize: 'A1',
        fontWeight: '500'
      }
    },
    Paragraph: {
      props: {
        fontSize: 'Z',
        alignItems: 'center'
      }
    }
  }
}
