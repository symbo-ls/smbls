'use strict'

import { Flex, FocusableComponent } from '@symbo.ls/atoms'
import { IconText } from '@symbo.ls/icon'

export const Button = {
  extend: [FocusableComponent, IconText],
  tag: 'button',
  props: {
    fontSize: 'A',
    type: 'button',
    border: 'none',
    display: 'inline-flex',
    align: 'center center',
    textDecoration: 'none',
    lineHeight: '1',
    whiteSpace: 'nowrap',
    padding: 'Z A1',
    fontFamily: 'inherit',
    round: 'C2'
  },
  attr: {
    type: ({ props }) => props.type
  }
}

export const SquareButton = {
  extend: Button,
  props: {
    fontSize: 'A',
    width: 'A',
    padding: 'Z',
    aspectRatio: '1 / 1',
    justifyContent: 'center',
    round: 'Z',
    boxSizing: 'content-box'
  }
}

export const ButtonSet = {
  tag: 'nav',
  extend: Flex,
  childExtend: SquareButton
}

export const CircleButton = {
  extend: SquareButton,
  props: { round: 'C' }
}

export const KangorooButton = {
  extend: Button,
  childExtend: IconText
}

export const DropDownButton = {
  extend: Button,
  props: {
    gap: 'Y',
    boxSize: 'fit-content fit-content',
    padding: 'A B A A+X',
    round: 'Z',
    background: '#141416',
    color: 'white',
    icon: {
      name: 'chevronDown',
      fontSize: 'D'
    },
    text: 'All'
  }
}

export const CommonButton = {
  extend: Button,
  props: {
    color: 'white',
    background: 'blue',
    boxSize: 'fit-content',
    padding: 'A A2',
    round: 'Z2',
    gap: 'Y2',
    position: 'relative'
  },
  icon: {
    props: { fontSize: 'C' }
  },
  Caption: { props: { text: 'Button', line_height: '1em' } }
}

export const IconButton = {
  extend: CommonButton,
  props: {
    icon: { name: 'smile' },
    boxSize: 'fit-content fit-content',
    padding: 'A',
    background: 'gray3'
  },
  Caption: null
}

export const CancelConfirmButtons = {
  extend: Flex,
  childExtend: {
    extend: CommonButton,
    props: {
      minWidth: 'D2',
      ':first-child': {
        background: 'transparent',
        border: '1px solid #20202B'
      },
      ':last-child': {
      }
    }
  },
  ...[
    { Caption: { text: 'No' } },
    { Caption: { text: 'Yes' } }
  ],

  props: {
    gap: 'Z',
    maxWidth: 'fit-content'
  }
}

export const IcontextButton = {
  extend: CommonButton,
  props: {
    padding: 'A',
    position: 'relative',
    background: 'gray3',
    icon: { name: 'smile' }
  }
}
