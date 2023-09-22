'use strict'

// import { UploadResult } from '@symbo.ls/upload'
import { Flex } from '@symbo.ls/atoms'
import { ButtonSet } from '@symbo.ls/button'
// import { DateIndicator, NotificationAlert } from '@symbo.ls/accessories'
import { AvatarWithInfoSet } from '@symbo.ls/avatar'

export const ChatUser = {
  extend: AvatarWithInfoSet,
  avatar: {},
  infos: {
    ...[
      {
        title: {},
        subTitle: {
          // extend: DateIndicator,
          caption: null
        }
      },
      { chatText: { props: { text: 'Can you please review the latest design?' } } }
    ]
  },

  props: {
    align: 'flex-start flex-start',
    avatar: { fontSize: 'C' },
    infos: {
      gap: 'Y',
      childProps: {
        flow: 'row',
        align: 'center space-between',
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
  avatar: {},
  infos: {
    ...[
      {},
      {
        chatText: null,
        uploadedFile: {
          // extend: UploadResult,
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
          minWidth: 'G',
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
  extend: AvatarWithInfoSet,
  avatar: {},
  infos: {
    ...[
      {
        title: { props: { text: 'Justin Dorwart' } },
        subTitle: { caption: { props: { text: 'Active now' } } }
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
    avatar: { fontSize: `${24 / 16}em` },
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
        },

        title: {
          fontSize: 'C',
          fontWeight: '700'
        }
      }
    }
  }
}

export const ChatUserWithNotification = {
  extend: ChatUser,
  avatar: {},
  infos: {
    ...[
      {
        title: {},
        subTitle: { days: null }
      },
      {
        chatText: { props: { text: 'Hey team, Ive finished the re...' } }
        // notification: { extend: NotificationAlert }
      }
    ]
  },

  props: {
    background: '#141416',
    padding: 'A',
    round: 'Z',
    infos: {
      childProps: {
        ':last-child': { gap: 'D' },
        title: { fontSize: 'A' },
        chatText: {
          padding: '0',
          background: 'transparent',
          color: '#A3A3A8',
          minWidth: 'F+C',
          maxWidth: 'F+C'
        }
      }
    }
  }
}
