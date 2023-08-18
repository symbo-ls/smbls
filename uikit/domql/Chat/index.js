'use strict'

import { User } from '@symbo.ls/user'
import { UploadResult } from '@symbo.ls/upload'
import { Flex } from '@symbo.ls/atoms'
import { ButtonSet } from '@symbo.ls/button'

export const ChatUser = {
  extend: User,
  image: {},
  infos: {
    ...[
      {
        title: {},
        subTitle: { props: { text: 'Monday 2:20 AM' } }
      },
      {
        chatText: { props: { text: 'Can you please review the latest design?' } }
      }
    ]
  },

  props: {
    align: 'flex-start flex-start',
    infos: {
      gap: 'Y',
      childProps: {
        flow: 'row',
        align: 'center flex-start',
        gap: 'E1',
        chatText: {
          fontSize: 'Z',
          background: '#252527',
          padding: 'Z+W2 A+W',
          round: 'Z+W2'
        }
      }
    }
  }
}

export const ChatUserWithUploadedFile = {
  extend: ChatUser,
  image: {},
  infos: {
    ...[
      {
        title: {},
        subTitle: { props: { text: 'Monday 2:20 AM' } }
      },
      {
        chatText: null,
        uploadedFile: {
          extend: UploadResult,
          FileIcon: {},
          Flex: {
            H6: { text: 'File.jpg' },
            caption: {
              extend: Flex,
              value: { props: { text: '1.2' } },
              mb: 'mb'
            },
            Captions: null,
            UploadProgress: null
          }
        }
      }
    ]
  },

  props: {
    infos: {
      childProps: {
        uploadedFile: {
          background: '#1C1C1F',
          width: '100%',
          align: 'center flex-start',
          FileIcon: {
            background: '#3F3F43',
            boxSize: `${54 / 16}em`,
            Icon: { fontSize: `${24 / 16}em` }
          },
          Flex: {
            H6: {
              fontSize: 'Z',
              fontWeight: '500'
            },
            caption: {
              fontSize: 'Z',
              color: '#A3A3A8',
              textTransform: 'uppercase'
            }
          }
        }
      }
    }
  }
}

export const ChatUserWithButtonSet = {
  extend: User,
  image: {},
  infos: {
    ...[
      {
        title: { props: { text: 'Justin Dorwart' } },
        subTitle: { props: { text: 'Active now' } }
      },
      {
        extend: ButtonSet,
        ...[
          { props: { icon: 'phone' } },
          { props: { icon: 'video' } },
          { props: { icon: 'info' } }
        ]
      }
    ]
  },

  props: {
    background: '#1C1C1F',
    padding: 'A B',
    round: 'A',
    infos: {
      flow: 'row',
      gap: 'D',
      alignItems: 'center',
      childProps: {
        '&:last-child': {
          flow: 'row',
          gap: 'Y+V',
          '& > button': {
            boxSize: 'B+Y',
            background: '#141416',
            round: 'A',
            '& > svg': {
              fontSize: 'C',
              color: 'white'
            }
          }
        }
      }

    }
  }

}
