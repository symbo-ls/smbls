'use strict'

import { Flex } from '@symbo.ls/atoms'
import { AvatarIndicator } from '@symbo.ls/avatar'
import { TitleParagraph } from '@symbo.ls/titleparagraph'

export const User = {
  extend: Flex,
  props: {
    align: 'center flex-start',
    gap: 'Z',
    boxSize: 'fit-content'
  },

  Avatar: {
    extend: AvatarIndicator,
    Avatar: { props: { boxSize: 'C' } }
  },
  Notes: {
    extend: TitleParagraph,
    props: {
      justifyContent: 'center',
      margin: 'Y - - -',
      gap: 'X'
    },
    Title: {
      props: { fontWeight: '500' }
    },
    Paragraph: {
      props: {
        fontSize: 'Z1',
        color: 'gray2'
      }
    }
  }
}
