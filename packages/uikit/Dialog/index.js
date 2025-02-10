'use strict'

export const Dialog = {
  extends: 'Flex',
  tag: 'dialog',

  props: {
    flow: 'column',
    border: '0',
    theme: 'dialog',
    round: 'Z2'
  }
}

export const DialogHeader = {
  extends: 'Hgroup',

  props: {
    minWidth: '100%',
    gap: 'A'
  },

  Title: {
    align: 'center space-between',

    Text: { text: 'Title' },

    SquareButton: {
      icon: 'x',
      theme: 'transparent'
    }
  },

  Paragraph: {
    color: 'caption'
  }
}

export const DialogFooter = {
  extends: 'Flex',

  props: {
    align: 'center flex-end',
    gap: 'X2',
    margin: 'auto - -',
    padding: 'Y2 X2'
  },

  childExtends: {
    extends: 'Button',
    props: {
      textTransform: 'uppercase',
      background: 'transparent',
      '@dark': {
        theme: 'primary @dark .color-only'
      },
      '@light': {
        theme: 'primary @light .color-only'
      },
      '&': {
        padding: 'Z A'
      },
      ':hover': {
        theme: 'tertiary'
      },
      ':active': {
        background: 'white .1'
      }
    }
  },

  cancel: {
    text: 'cancel'
  },
  ok: {
    text: 'ok'
  }
}
