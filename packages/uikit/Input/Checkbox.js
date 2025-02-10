'use strict'

export const Checkbox = {
  extends: 'Focusable',

  tag: 'label',

  props: {
    boxSize: 'fit-content fit-content',
    cursor: 'pointer',
    round: 'Y'
  },

  Input: {
    type: 'checkbox',
    display: 'none',
    ':checked + div': { theme: 'primary' },
    ':checked + div > svg': {
      transform: 'none',
      opacity: '1'
    },
    attr: {
      checked: (el) => el.call('exec', el.parent.props.checked)
    }
  },

  Flex: {
    align: 'center center',
    fontSize: 'B1',
    padding: 'V',
    theme: 'field',
    round: 'X2',
    transition: 'background A defaultBezier',
    Icon: {
      icon: 'check',
      opacity: '0',
      transform: 'scale(0.9) rotate(-15deg)',
      transition: 'opacity B defaultBezier'
    }
  }
}

export const CheckboxHgroup = {
  extends: 'Flex',
  tag: 'label',

  props: {
    boxSize: 'fit-content',
    align: 'flex-start flex-start',
    gap: 'A'
  },

  Checkbox: { tag: 'div' },
  HgroupRows: {
    gap: 'Z1',
    margin: 'Y - - -'
  }
}
