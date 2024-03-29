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
      background: 'green',
      '.color-only': {
        color: 'green'
      }
    },
    '@light': {
      color: 'white',
      background: 'green',
      '.color-only': {
        color: 'green'
      }
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
  }
}

const STATES = {
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
    '@dark': {
      color: 'black',
      background: 'green'
    }
  }
}

const UI = {
  field: {
    '@light': {
      color: 'black',
      background: 'gray .975 +144',
      borderColor: 'gray .975 +144',
      '::placeholder': { color: 'gray 1 -68' }
    },
    '@dark': {
      color: 'white',
      background: 'gray .975 -52',
      borderColor: 'gray .975 -52',
      '::placeholder': { color: 'gray 1 +68' }
    }
  },

  label: {
    '@dark': {
      color: 'white',
      background: 'gray .92 +8'
    },

    '@light': {
      background: 'gray .1'
    },

    '.light': {
      color: 'white',
      background: 'gray3'
    },

    '.dark': {
      color: 'white',
      background: 'black .35'
    }
  },

  card: {
    '@light': {
      background: 'gray .975 +150'
    },

    '@dark': {
      color: 'white',
      background: 'gray .975 -56'
    },

    '.child': {
      color: 'white',
      background: 'gray3'
    },

    '.secondary': {
      color: 'white',
      background: 'gradient-blue-dark',

      '.child': {
        color: 'white',
        background: 'black .35'
      }
    }
  },

  dialog: {
    '@dark': {
      color: 'white',
      background: 'gray .92',
      '.helper': {
        color: 'white',
        background: 'black'
      }
    },
    '@light': {
      color: 'currentColor',
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
  ...STATES,
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
