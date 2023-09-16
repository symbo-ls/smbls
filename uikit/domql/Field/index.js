'use strict'
import { Flex } from '@symbo.ls/atoms'
import { IconText } from '@symbo.ls/icon'

export const Field = {
  extend: IconText,
  props: {
    minWidth: 'G',
    maxWidth: 'G',
    minHeight: 'C+X',
    boxSizing: 'border-box',
    padding: '- Z+W',
    round: 'Y+W',
    border: '1px solid #3F3F43',
    gap: 'Y+W',
    overflow: 'hidden'
  },

  Input: {
    padding: '0',
    background: 'transparent',
    round: '0',
    color: 'white',
    fontFamily: 'avenir',
    placeholder: 'Placeholder',
    flex: '1',
    minHeight: '100%'
  }
}

export const FieldWithIcon = {
  extend: Field,
  props: { icon: { name: 'info' } }
}

export const FieldWithButton = {
  extend: Field,
  Input: {},
  Button: {
    padding: '0',
    background: 'transparent',
    color: 'white',
    margin: '- - - auto',
    icon: { name: 'circle' }
  }
}

export const FieldWithIconWithButton = {
  extend: FieldWithButton,
  Icon: { props: { name: 'info' } },
  Input: {},
  Button: {}
}

export const CodeField = {
  extend: Field,
  props: {
    minWidth: 'D',
    maxWidth: 'D',
    minHeight: 'D',
    padding: '0',
    style: {
      'input[type=number]::-webkit-inner-spin-button': {
        '-webkit-appearance': ' none'
      }
    }
  },

  Input: {
    type: 'number',
    fontSize: 'E',
    placeholder: '0',
    boxSize: '100% 100%',
    textAlign: 'center'
  }
}

export const LabeledHintField = {
  extend: Flex,
  props: {
    flow: 'column',
    boxSize: 'fit-content fit-content',
    gap: 'Y+W'
  },

  Label: {
    props: {
      text: 'Label',
      fontSize: 'Z',
      lineHeight: '1em',
      padding: '0 0 0 Z',
      background: 'transparent'
    }
  },

  Field: {},

  Hint: {
    extend: IconText,
    props: {
      icon: {
        name: 'info',
        margin: '-W - - -'
      },
      align: 'center flex-start',
      text: 'Description',
      fontSize: 'Y',
      gap: 'Y',
      padding: '- - - Z'
    }
  }
}
