'use strict'

import { IconText } from '@symbo.ls/icon-text'
import { Input } from '@symbo.ls/input'

import style from './style'

export const Field = {
  style,
  proto: [IconText],
  props: (el, s) => ({
    depth: 16,
    placeholder: '',
    value: s[el.key],
    padding: 'A B',
    round: 'C',
    type: 'text'
  }),
  input: {
    proto: Input,
    props: el => el.parent.props
  }
}
