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

export const CancenConfirmButtons = {
  extend: Flex,
  childExtend: Button,
  ...[
    { props: { text: 'Cancel' } },
    { props: { text: 'Confirm' } }
  ],

  props: {
    gap: 'Z',
    maxWidth: 'fit-content',
    childProps: {
      fontWeight: '500',
      color: 'white',
      padding: 'A B+X',
      round: 'A',
      ':first-child': {
        background: 'transparent'
      },
      ':last-child': {
        background: '#0474F2'
      }
    }
  }
}

export const ButtonTemplate1 = {
  extend: Button,
  props: {
    icon: { name: 'circle' },
    boxSize: 'fit-content fit-content',
    padding: 'A',
    round: 'A',
    color: 'white',
    background: '#F4454E'
  }
}

export const ButtonTemplate2 = {
  extend: ButtonTemplate1,
  icon: null,
  props: { text: 'Button' }
}

export const ButtonTemplate3 = {
  extend: ButtonTemplate1,
  props: {
    text: 'Button',
    gap: 'Z'
  }
}

export const ButtonTemplate4 = {
  extend: ButtonTemplate3,
  icon: {},
  text: 'Button',
  Icon: { props: { icon: 'circle' } }

}
