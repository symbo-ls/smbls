'use strict'

const PRIORITIES = {
  primary: {
    '@dark': {
      color: 'white',
      background: 'blue',
      '.color-only': {
        color: 'blue'
      }
    },
    '@light': {
      color: 'white',
      background: 'gradient-colorful'
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
      background: 'gray .95 +8'
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
      color: 'gray9',
      background: 'gradient-light',

      ':hover, &:active': {
        color: 'gray12',
        background: 'gradient-light-active'
      },

      '.active': {
        color: 'gray12',
        background: 'gradient-light-active'
      }
    },

    '@light': {
      color: 'gray3',
      background: 'gradient-dark',

      ':hover, &:active': {
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

  ...PRIORITIES
}
