'use strict'

const PRIORITIES = {
  primary: {
    '@dark': {
      color: 'white',
      background: 'blue',
      '.color-only': {
        color: 'blue'
      },
      '.inactive': {
        background: 'gray 1 +16'
      },
      '.gradient': {
        color: 'white',
        background: 'gradient-blue'
      }
    },
    '@light': {
      color: 'white',
      background: 'gradient-blue',
      '.color-only': {
        color: 'blue'
      },
      '.gradient': {
        color: 'white',
        background: 'gradient-colorful'
      }
    }
  },

  secondary: {
    '@dark': {
      color: 'white',
      background: 'white .1'
    },
    '@light': {
      color: 'white',
      background: 'blue'
    },

    '.child': '--primary'
  },

  tertiary: {
    '@dark': {
      color: 'white',
      background: 'gray .92 +8'
    },
    '@light': {
      background: 'gray .1'
    }
  },

  quaternary: {
    '@light': {
      color: 'white',
      background: 'gradient-light'
    },
    '@dark': {
      color: 'white',
      background: 'gradient-dark-active'
    }
  },

  quinary: {
    '@dark': {
      color: 'gray 1 90',
      background: 'gradient-light',

      ':hover': {
        color: 'gray 1 95',
        background: 'gradient-light-active'
      },

      ':focus': {
        color: 'gray 1 120',
        background: 'gradient-light-active'
      },

      ':active': {
        color: 'gray 1 120',
        background: 'gradient-light-active'
      },

      '.active': {
        color: 'gray 1 120',
        background: 'gradient-light-active'
      }
    },

    '@light': {
      color: 'gray3',
      background: 'gradient-dark',

      ':hover': {
        color: 'gray1',
        background: 'gradient-dark-active'
      },

      ':active': {
        color: 'gray1',
        background: 'gradient-dark-active'
      },

      '.active': {
        color: 'gray1',
        background: 'gradient-dark-active'
      }
    }
  },

  alert: {
    '@dark': {
      color: 'white',
      background: 'red'
    }
  },

  warning: {
    '@dark': {
      color: 'black',
      background: 'yellow'
    }
  },

  success: {
    background: 'transparent',
    color: 'green2',
    border: '2.8px solid #04F214'
  }
}

const UI = {
  field: '--tertiary',

  dialog: {
    '@dark': {
      background: 'gray .92',
      '.helper': {
        color: 'white',
        background: 'black'
      }
    },
    '@light': {
      background: 'gray .1'
    }
  }
}

export const THEME = {
  document: {
    '@light': {
      color: 'black',
      background: 'white'
    },
    '@dark': {
      color: 'white',
      background: 'black'
    }
  },

  ...PRIORITIES,

  ...UI,

  none: {
    color: 'none',
    background: 'none'
  },

  transparent: {
    color: 'currentColor',
    background: 'transparent'
  }
}
