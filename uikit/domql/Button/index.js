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
    theme: 'primary',
    boxSize: 'fit-content',
    padding: 'Z1 A',
    round: 'Z',
    gap: 'Y',
    position: 'relative'
  },
  Icon: {
    props: { fontSize: 'B2' }
  },
  caption: {
    props: {
      text: 'Button',
      line_height: '1em',
      fontSize: 'Z2'
    }
  }
}

export const IconCommonButton = {
  extend: CommonButton,
  props: {
    Icon: { name: 'smile' },
    boxSize: 'fit-content fit-content',
    padding: 'Z2',
    background: 'gray3'
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
    gap: 'Z',
    maxWidth: 'fit-content'
    // border: '1px solid red'
  },
  childExtend: {
    extend: CommonButton,
    props: {
      padding: 'Z2 B'
    }
  },
  ...[
    {
      props: {
        theme: 'dialog',
        color: 'white'
      },
      caption: { text: 'No' }
    },
    {
      caption: { text: 'Yes' }
    }
  ]
}

export const IcontextButton = {
  extend: CommonButton,
  props: {
    position: 'relative',
    background: 'gray3',
    Icon: { name: 'smile' }
  }
}

export const DropDownButton = {
  extend: CommonButton,
  props: {
    gap: 'X2',
    boxSize: 'fit-content fit-content',
    padding: 'Z2 B Z2 A',
    round: 'Z',
    background: '#141416',
    color: 'white',
    Icon: {
      name: 'chevronDown',
      fontSize: 'D'
    },
    caption: { text: 'All' }
  }
}

export const DropDownButtonWithAvatar = {
  extend: DropDownButton,
  props: {
    gap: 'Z',
    padding: 'Y1 Z',
    round: 'Y2',
    theme: 'label'
  },

  Avatar: {
    boxSize: 'A1 A1'
  },
  caption: {
    text: 'ETH',
    props: {
      fontSize: 'Z1'
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
    props: { Icon: { name: 'minus' } }
  },
  Value: { props: { text: '1' } },
  Plus: {
    extend: IconCommonButton,
    props: { Icon: { name: 'plus' } }
  }
}
