'use strict'

import { Flex } from '@symbo.ls/atoms'
import { IconText } from '@symbo.ls/icon'

export const CommonField = {
  extend: Flex,
  tag: 'label',

  props: {
    flow: 'column',
    boxSize: 'fit-content fit-content',
    gap: 'Z'
  },

  Title: {
    props: {
      text: 'Label',
      lineHeight: '1em',
      padding: '- - - V2',
      color: 'caption'
    }
  },

  Field: {
    tag: 'div'
  },

  Hint: {
    extend: IconText,
    props: {
      color: 'caption',
      align: 'center flex-start',
      text: '',
      fontSize: 'Z1',
      gap: 'Y',
      padding: 'W - - W'
    }
  }
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
