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

export const CircleButton = {
  extend: SquareButton,
  props: { round: 'C' }
}

export const KangorooButton = {
  extend: Button,
  childExtend: IconText
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

export const IconCommonButton = {
  extend: CommonButton,
  props: {
    icon: { name: 'smile' },
    boxSize: 'fit-content fit-content',
    padding: 'A',
    background: 'gray3'
  },
  Caption: null
}

export const ButtonSet = {
  tag: 'nav',
  extend: Flex,
  childExtend: IconCommonButton
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

export const DropDownButton = {
  extend: CommonButton,
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
    Caption: { text: 'all' }
  }
}

export const DropDownButtonWithAvatar = {
  extend: DropDownButton,
  props: {
    gap: 'Z',
    padding: 'Y1 Z',
    round: 'Y2',
    background: 'gray3'
  },

  Avatar: {
    boxSize: 'A1 A1'
  },
  Caption: {
    text: 'ETH',
    props: {
      fontSize: 'Z1'
    }
  }
}
