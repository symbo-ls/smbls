'use strict'

import { Flex } from '@symbo.ls/atoms'
import { TitleParagraph } from '@symbo.ls/textcomponents'
import { FieldWithTitle } from '@symbo.ls/field'
import { Button } from '@symbo.ls/button'
import { Icon } from '@symbo.ls/icon'
import { CheckMark } from '@symbo.ls/accessories'

export const Modal = {
  extend: Flex,
  header: {
    extend: Flex,
    close: {
      extend: Button,
      props: { icon: 'x' }
    }
  },
  content: { extend: Flex },
  footer: {},

  props: {
    background: '#1C1C1F',
    padding: 'A',
    flow: 'column',
    round: 'Z+V',
    header: {
      position: 'relative',

      close: {
        margin: '- - - auto',
        background: 'transparent',
        color: 'white',
        fontSize: 'D',
        padding: '0'
      }
    }
  }
}

export const ResetCompleteModal = {
  extend: Modal,

  header: {},
  content: {
    icon: { extend: CheckMark },
    titleParagraph: {
      extend: TitleParagraph,
      title: { props: { text: 'Reset complete!' } },
      paragraph: { props: { text: 'Your request has been approved!' } }
    }
  },
  footer: {
    button: {
      extend: Button,
      props: { text: 'Done' }
    }
  },

  props: {
    maxWidth: 'G+E',
    gap: 'B',
    content: {
      flow: 'column',
      align: 'center center',
      gap: 'B',
      titleParagraph: {
        align: 'center center',
        title: { fontSize: 'B' }
      }
    },
    footer: {
      minWidth: '100%',
      button: {
        background: '#0474F2',
        color: 'white',
        minWidth: '100%',
        padding: 'A -',
        round: 'A'
      }
    }
  }
}
