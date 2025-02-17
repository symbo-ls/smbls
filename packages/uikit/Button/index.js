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
 *   extends: Button
 * }
 */

export const Button = {
  extends: ['IconText', 'FocusableComponent'],
  tag: 'button',

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
  round: 'C2',

  attr: {
    type: ({ props }) => props.type
  }
}

export const SquareButton = {
  extends: 'Button',
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

export const CircleButton = {
  extends: 'SquareButton',
  round: 'C'
}

export const KangorooButton = {
  extends: 'Button',
  childExtends: 'IconText'
}

export const ButtonSet = {
  tag: 'nav',
  extends: 'Flex',
  childExtends: 'SquareButton'
}

export const IconButton = {
  extends: [
    'SquareButton',
    'ClickableItem'
  ],
  round: 'Z'
}
