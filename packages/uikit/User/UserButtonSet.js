'use strict'

export const UserButtonSet = {
  extend: 'Flex',
  props: {
    boxSize: 'fit-content',
    theme: 'dialog',
    padding: 'Z1 Z1 Z Z',
    round: 'A',
    alignItems: 'center',
    gap: 'E'
  },

  User: {
    padding: '0',
    gap: 'Y2',
    Avatar: { fontSize: 'A' },
    Notes: {
      margin: 'W - - -',
      gap: 'X2',
      Title: {
        text: 'Group'
      },
      Paragraph: {
        text: 'Active now'
      }
    }
  },

  ButtonSet: {
    props: { gap: 'Y2' },
    ...[
      { props: { icon: 'phone' } },
      { props: { icon: 'video' } },
      { props: { icon: 'moreHorizontal' } }
    ]
  }
}

export const UserButtonSetCircle = {
  extend: UserButtonSet,
  User: {},
  ButtonSet: {
    childExtend: {
      props: {
        round: '100%'
      }
    }
  }
}
