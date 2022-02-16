'use strict'

const PRIORITIES = {
  primary: {
    color: 'white',
    background: 'blue'
  },

  secondary: {
    variants: {
      light: {
        color: 'white',
        background: 'gradient-light'
      },
      dark: {
        color: 'white',
        background: 'gradient-dark-active'
      }
    }
  }
}

export const THEME = {
  document: {
    variants: {
      light: {
        color: 'black',
        background: 'white'
      },
      dark: {
        color: 'white',
        background: 'black'
      }
    }
  },

  ...PRIORITIES
}
