'use strict'

import { Flex } from '@symbo.ls/atoms'
import { IconText } from '@symbo.ls/icon'
import { Field } from './Field'

export const CommonField = {
  extend: Flex,
  props: {
    flow: 'column',
    boxSize: 'fit-content fit-content',
    gap: 'Y+W',
    Hint: {
      align: 'center flex-start',
      text: '',
      fontSize: 'Y',
      gap: 'Y',
      padding: '- - - Z'
    }
  },

  Title: {
    props: {
      text: 'Label',
      fontSize: 'Z',
      lineHeight: '1em',
      padding: '- - - Z'
    }
  },

  Field: { extend: Field },
  Hint: { extend: IconText }
}

export const CommonFieldTemplate = {
  extend: CommonField,
  Title: {},
  Field: {
    Icon: { props: { name: 'info' } },
    Input: {},
    Button: { icon: 'eye' }
  },
  Hint: {
    Icon: { props: { name: 'info' } },
    text: 'Description'
  }
}
