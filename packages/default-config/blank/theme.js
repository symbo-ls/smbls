'use strict'

const PRIORITIES = {
  primary: {
    '@dark': {
      color: 'white',
      background: 'blue'
    },
    '@light': {
      color: 'white',
      background: 'gradient-blue'
    }
  },

  secondary: {
    '@dark': {
      color: 'white',
      background: 'gray'
    },
    '@light': {
      color: 'white',
      background: 'gray'
    }
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
      background: 'gradient-light'
    },

    '@light': {
      color: 'gray3',
      background: 'gradient-dark'
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
    }
  },

  dialog: {
    '@dark': {
      color: 'white',
      background: 'gray .92'
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
