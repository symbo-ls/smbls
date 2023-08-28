'use strict'

import { Flex } from '@symbo.ls/atoms'
import { TitleParagraphWithButton } from '@symbo.ls/textcomponents'
import { FieldWithTitle } from '@symbo.ls/field'
import { UploadModal } from '@symbo.ls/upload'
import { Button } from '@symbo.ls/button'
import { Icon } from '@symbo.ls/icon'

export const Modal = {
  extend: Flex,
  header: {
    extend: Flex,
    close: {
      extend: Button,
      props: { icon: 'x' }
    }
  },
  content: {},
  footer: {},

  props: {
    background: '#1C1C1F',
    padding: 'A',
    flow: 'column',
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
    icon: {
      extend: Icon,
      props: { name: 'check' }
    }
  }
}
