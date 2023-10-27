'use strict'

import { Checkbox, CheckboxTitleParagraph } from './Checkbox'

/**
 * A Toggle component
 * The `Toggle` component represents a customizable checkbox input with a switch-like appearance.
 * It extends the Checkbox component and allows for various style and property configurations.
 *
 * @typedef {Object} Toggle
 * @property {Object} Input - Style configurations for the input element.
 * @property {Object} Flex - Style and property configurations for the surrounding container.
 * @property {Object} Flex.props - Additional properties for the Flex container.
 * @property {string} Flex.props.boxSize - The size of the container (e.g., 'A+X B+Z').
 * @property {string} Flex.props.padding - The padding of the container (e.g., '- W').
 * @property {string} Flex.props.round - The roundness of the container (e.g., 'D').
 * @property {string} Flex.props.align - The alignment of the container (e.g., 'center flex-start').
 * @property {string} Flex.props.background - The background color of the container (e.g., 'gray .8 +68').
 * @property {string} Flex.props.border - The border style of the container (e.g., 'none').
 * @property {string} Flex.props.transition - The transition effect of the container (e.g., 'opacity .15s ease').
 * @property {Object} Flex.props.:after - Additional styles for the pseudo-element ":after".
 * @property {string} Flex.props.:after.content - Content to be displayed in the pseudo-element.
 * @property {string} Flex.props.:after.boxSize - The size of the pseudo-element (e.g., 'A A').
 * @property {string} Flex.props.:after.round - The roundness of the pseudo-element (e.g., '100%').
 * @property {string} Flex.props.:after.background - The background color of the pseudo-element (e.g., 'white').
 * @property {string} Flex.props.:after.boxShadow - The box shadow of the pseudo-element (e.g., '1px, 1px, Z, gray .2').
 * @property {null|object} Flex.Icon - An optional icon for the Toggle component.
 *
 * @example
 * // Example usage of the Toggle component:
 * const myToggle = {
 *   extend: Toggle,
 * };
 */

export const Toggle = {
  extend: Checkbox,

  Input: {
    ':checked + div': {
      background: 'green2 +8',
      justifyContent: 'flex-end'
    }
  },

  Flex: {
    props: {
      boxSize: 'A+X B+Z',
      padding: '- W',
      round: 'D',
      align: 'center flex-start',
      background: 'gray',
      border: 'none',
      transition: 'opacity .15s ease',
      ':after': {
        content: '""',
        boxSize: 'A A',
        round: '100%',
        background: 'white',
        boxShadow: '1px, 1px, Z, gray .2'
      }
    },
    Icon: null
  }
}

export const ToggleTitleParagraph = {
  extend: CheckboxTitleParagraph,
  Checkbox: null,
  Toggle: {}
}
