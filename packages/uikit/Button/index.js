'use strict'

import { Flex, FocusableComponent } from '@symbo.ls/atoms'
import { IconText } from '@symbo.ls/icon'

/**
 * A Button component
 * The `Button` component represents a clickable button element with customizable styles and properties.
 *
 * @description
 * @extends {FocusableComponent, IconText}
 * @typedef {Object} Button
 * @property {string} tag - The HTML tag used to render the button (e.g., 'button').
 * @property {string} props.type - The type attribute of the button ('button' by default).
 *
 * @example
 * // Example usage of the Button component:
 * const myButton = {
 *   extend: Button
 * }
 */

export const Button = {
  extend: [IconText, FocusableComponent],
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
    theme: 'primary',
    boxSize: 'fit-content',
    padding: 'Z2 A2',
    round: 'Z1',
    gap: 'X1',
    position: 'relative'
  },
  Icon: {
    props: { fontSize: 'B1' }
  },

  text: 'Button'
}

export const IconCommonButton = {
  extend: CommonButton,
  props: {
    icon: 'smile',
    boxSize: 'fit-content fit-content',
    padding: 'Z2',
    theme: 'tertiary'
  },
  caption: null
}

export const ButtonSet = {
  tag: 'nav',
  extend: Flex,
  childExtend: IconCommonButton
}

export const CancelConfirmButtons = {
  extend: Flex,
  props: {
    gap: 'Z2',
    maxWidth: 'fit-content'
  },
  childExtend: {
    extend: CommonButton,
    props: {
      ':first-child': {
        theme: 'transparent',
        padding: '- Y1'
      }
    }
  },
  ...[
    { caption: { props: { text: 'No' } } },
    { caption: { props: { text: 'Yes' } } }
  ]
}

export const IcontextButton = {
  extend: CommonButton,
  props: {
    position: 'relative',
    theme: 'tertiary',
    padding: 'Z2 A',
    icon: 'smile'
  }
}

export const DropDownButton = {
  extend: CommonButton,
  props: {
    gap: 'X2',
    boxSize: 'fit-content fit-content',
    padding: 'Z1 A1 Z Z1',
    theme: 'dialog',
    icon: 'chevronDown',
    Icon: {
      fontSize: 'D'
    },
    caption: { text: 'All' }
  }
}

export const DropDownButtonWithAvatar = {
  extend: DropDownButton,
  props: {
    gap: 'Y',
    padding: 'Y',
    round: 'Z1',
    theme: 'dialog',
    Icon: { fontSize: 'B1' }
  },

  Avatar: {
    boxSize: 'A2+V1'
  },
  caption: {
    text: 'ETH',
    props: {
      fontSize: 'Y1',
      fontWeight: '400'
    }
  }
}

export const PlusMinusButtons = {
  extend: Flex,
  props: {
    alignItems: 'center',
    gap: 'A'
  },
  Minus: {
    extend: IconCommonButton,
    props: { icon: 'minus' }
  },
  Value: { props: { text: '1' } },
  Plus: {
    extend: IconCommonButton,
    props: { icon: 'plus' }
  }
}
