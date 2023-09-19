'use strict'

export const RadioIndicator = {
  props: {
    padding: 'Z',
    theme: 'primary',
    boxSize: 'fit-content',
    round: '100%',
    ':after': {
      content: '""',
      boxSize: 'Z1',
      background: 'white',
      display: 'block',
      round: '100%'
    }
  }
}
