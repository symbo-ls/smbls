export default {
  document: {
    '@light': {
      color: 'slate900',
      background: 'slate50'
    },
    '@dark': {
      color: 'white',
      background: 'slate900'
    }
  },
  none: {
    color: 'none',
    background: 'none'
  },
  transparent: {
    color: 'currentColor',
    background: 'transparent'
  },
  primary: {
    color: 'white',
    background: 'indigo600',
    ':hover': {
      background: 'indigo700'
    }
  },
  success: {
    color: 'white',
    background: 'emerald600',
    ':hover': {
      background: 'emerald700'
    }
  },
  field: {
    color: 'slate700',
    background: 'white',
    borderWidth: '2px',
    borderStyle: 'solid',
    borderColor: 'slate200'
  },
  dialog: {
    color: 'slate600',
    background: 'slate100',
    ':hover': {
      background: 'slate200'
    }
  }
}
