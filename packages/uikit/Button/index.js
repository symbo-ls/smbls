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
    type: ({ props }) => props.type,
    disabled: (el) => el.call('exec', el.props.disabled)
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

export const ButtonSet = {
  tag: 'nav',
  extend: 'Flex',
  childExtend: 'SquareButton'
}

export const IconButton = {
  extend: ['SquareButton', 'ClickableItem'],
  props: {
    round: 'Z'
  },
  __hash: '3a7v57sk5rd'
}
