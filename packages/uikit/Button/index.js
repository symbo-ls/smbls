'use strict'

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
  extend: ['IconText', 'FocusableComponent'],
  tag: 'button',

  props: {
    fontSize: 'A',
    type: 'button',
    borderStyle: 'none',
    display: 'inline-flex',
    align: 'center center',
    textDecoration: 'none',
    lineHeight: '1',
    whiteSpace: 'nowrap',
    padding: 'Z B2',
    fontWeight: '500',
    fontFamily: 'inherit',
    round: 'C2'
  },

  attr: {
    type: ({ props }) => props.type
  }
}

export const SquareButton = {
  extend: 'Button',
  props: {
    fontSize: 'A',
    width: 'A',
    padding: 'Z',
    aspectRatio: '1 / 1',
    icon: 'smile',
    boxSize: 'fit-content fit-content',
    justifyContent: 'center',
    round: 'Z',
    boxSizing: 'content-box'
  }
}

export const CircleButton = {
  extend: 'SquareButton',
  props: { round: 'C' }
}

export const KangorooButton = {
  extend: 'Button',
  childExtend: 'IconText'
}

export const FlexButton = {
  extend: 'Button',

  props: {
    boxSize: 'fit-content',
    padding: 'Z2 A2',
    round: 'Z1',
    gap: 'Z',
    position: 'relative',

    Icon: { fontSize: 'B1' }
  },

  Icon: {},
  Text: { text: 'Button' }
}

export const ButtonSet = {
  tag: 'nav',
  extend: 'Flex',
  childExtend: 'SquareButton'
}

export const CancelConfirmButtons = {
  extend: 'Flex',
  props: {
    gap: 'Z2',
    maxWidth: 'fit-content'
  },
  childExtend: {
    extend: 'FlexButton',
    props: {
      ':first-child': {
        theme: 'transparent',
        padding: '- Y1'
      }
    }
  },
  ...[
    { Text: 'No' },
    { Text: 'Yes' }
  ]
}

export const IcontextButton = {
  extend: 'FlexButton',
  props: {
    position: 'relative',
    theme: 'tertiary',
    padding: 'Z2 A',
    icon: 'smile'
  }
}

export const DropDownButton = {
  extend: 'FlexButton',
  props: {
    gap: 'X2',
    boxSize: 'fit-content fit-content',
    padding: 'Z1 A1 Z Z1',
    theme: 'dialog',
    icon: 'chevronDown',
    Icon: {
      fontSize: 'D'
    },
    Text: { text: 'All' }
  }
}

export const DropDownButtonWithAvatar = {
  extend: 'DropDownButton',
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
  extend: 'Flex',
  props: {
    alignItems: 'center',
    gap: 'A'
  },
  Minus: {
    extend: 'SquareButton',
    props: { icon: 'minus' }
  },
  Value: { props: { text: '1' } },
  Plus: {
    extend: 'SquareButton',
    props: { icon: 'plus' }
  }
}

export const IconButton = {
  extend: [
    'SquareButton',
    'ClickableItem'
  ],
  props: {
    round: 'Z'
  },
  __hash: '3a7v57sk5rd'
}
