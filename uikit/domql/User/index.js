'use strict'
import { Flex } from '@symbo.ls/atoms'
import { AvatarWithIndicator } from '@symbo.ls/avatar'
import { InfoSet } from '../InfoSet'

export const User = {
  extend: Flex,

  image: { extend: AvatarWithIndicator },
  infos: {
    extend: InfoSet,
    ...[
      {
        title: { props: { text: 'Erin Schleifer' } },
        subTitle: { caption: { props: { text: 'email@symbols.com' } } }
      }
    ]
  },

  props: {
    boxSize: 'fit-content',
    align: 'center flex-start',
    gap: 'A',
    infos: {
      childProps: {
        flow: 'column',
        subTitle: { caption: { whiteSpace: 'nowrap' } }
      }
    }
  }
}
