'use strict'

import { Flex } from '@symbo.ls/atoms'
import { IconText } from '@symbo.ls/icon'

import { CustomizedField } from './CustomizedField'
import { FieldWithIcon } from './Field'

export const CommonField = {
  extend: Flex,

  title: { tag: 'h6' },
  field: { extend: CustomizedField },
  description: { extend: IconText },

  props: {
    flow: 'column',
    gap: 'Y',
    boxSize: 'fit-content fit-content',
    align: 'flex-start flex-start',
    title: {
      text: 'Title',
      fontSize: 'Z',
      color: '#CFCFD1',
      padding: '- - - Z',
      lineHeight: '1em'
    },
    description: {
      text: 'Description',
      fontSize: 'Z',
      color: '#CFCFD1',
      padding: '- - - Z',
      gap: 'Y',
      align: 'center center',
      icon: 'info'
    }
  }
}

export const FieldWithTitle = {
  extend: CommonField,
  title: {},
  field: {},
  description: null
}

export const FieldWithDescription = {
  extend: CommonField,
  title: null,
  field: {},
  description: {}
}

export const FieldWithAllSet = {
  extend: CommonField,
  title: {},
  field: { extend: FieldWithIcon },
  description: {}
}
